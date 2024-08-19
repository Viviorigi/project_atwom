package com.a2m.library.controllers.student;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.a2m.library.dto.UserDTO;
import com.a2m.library.dto.request.ChangePasswordRequest;
import com.a2m.library.dto.request.ForgotPasswordRequest;
import com.a2m.library.dto.request.LoginRequest;
import com.a2m.library.dto.request.ResetPasswordRequest;
import com.a2m.library.dto.response.JwtResponse;
import com.a2m.library.dto.response.MessageResponse;
import com.a2m.library.dto.response.UserResponse;
import com.a2m.library.model.User;
import com.a2m.library.model.VerificationToken;
import com.a2m.library.repository.UserRepository;
import com.a2m.library.repository.VerificationTokenRepository;
import com.a2m.library.security.CustomUserDetails;
import com.a2m.library.service.admin.UserService;
import com.a2m.library.service.student.PasswordResetService;
import com.a2m.library.service.student.StudentService;
import com.a2m.library.util.JwtUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "api/student")
public class StudentController {
	@Autowired
	private MessageSource messageSource;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private StudentService studentService;
	@Autowired
	private UserService userService;
	private final ObjectMapper objectMapper;

	@Autowired
	private VerificationTokenRepository tokenRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordResetService passwordResetService;
	
	

	public StudentController(UserService userService, ObjectMapper objectMapper) {
		this.userService = userService;
		this.objectMapper = objectMapper;
	}

	@Value("${file.upload-dir}")
	private String uploadDir;

	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody UserDTO userDTO) {
		try {
			studentService.register(userDTO);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Sign up successful"));
	}

	@PostMapping("/update")
	public ResponseEntity<?> updateUser(@Valid @RequestPart("userDTO") String userDTOJson,
			@RequestParam(required = false) MultipartFile file) throws JsonMappingException, JsonProcessingException {
		UserDTO userDTO;
		userDTO = objectMapper.readValue(userDTOJson, UserDTO.class);
		if (!file.isEmpty()) {
			try {
				final Path directory = Paths.get(uploadDir);
				final Path filePath = Paths.get(uploadDir + file.getOriginalFilename());
				if (!Files.exists(directory)) {
					Files.createDirectories(directory);
				}
				Files.write(filePath, file.getBytes());
				userDTO.setAvatar(file.getOriginalFilename());
			} catch (Exception e) {
				e.printStackTrace();
				return ResponseEntity.badRequest().body(new MessageResponse("File upload failed"));
			}
		}
		try {
			userService.update(userDTO);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Update successful"));
	}

	@GetMapping("/myinfo")
	public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
		if (token.startsWith("Bearer ")) {
			token = token.substring(7);
		}
		if (jwtUtil.validateJwtToken(token)) {
			String username = jwtUtil.getUserNameFromJwtToken(token);
			UserResponse userRes = userService.findByUsername(username);
			return ResponseEntity.ok(userRes);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
		}
	}

	@PostMapping("/change-pass")
	public ResponseEntity<?> changePass(@RequestHeader("Authorization") String token,
			@Valid @RequestBody ChangePasswordRequest changePass) {
		if (token.startsWith("Bearer ")) {
			token = token.substring(7);
		}
		String username = jwtUtil.getUserNameFromJwtToken(token);
		User user;
		if (!changePass.getNewPassword().equals(changePass.getConfirmPassword())) {
			throw new BadCredentialsException("New Password do not match");
		} else {
			try {
				user = userRepository.findByUsername(username)
						.orElseThrow(() -> new UsernameNotFoundException("User Not Found with -> username" + username));
				boolean matches = passwordEncoder.matches(changePass.getCurrentPassword(), user.getPassword());
				if (!matches) {
					throw new BadCredentialsException("Current Password do not match");
				}
				if (!changePass.getNewPassword().equals(changePass.getCurrentPassword())) {
					if (matches) {
						user.setPassword(passwordEncoder.encode(changePass.getNewPassword()));
						userRepository.save(user);
					} else {
						return new ResponseEntity<>(new MessageResponse("no"), HttpStatus.OK);
					}
				}else {
					throw new BadCredentialsException("The new password cannot be the same as the old password.");
				}
				return new ResponseEntity<>(new MessageResponse("Change password successfully!"), HttpStatus.OK);
			} catch (UsernameNotFoundException exception) {
				return new ResponseEntity<>(new MessageResponse(exception.getMessage()), HttpStatus.NOT_FOUND);
			}
		}
	}
	
	@GetMapping("/verify")
	public ModelAndView verifyAccount(@RequestParam("token") String token,ModelAndView modelAndView) {
	
	    VerificationToken verificationToken = tokenRepository.findByToken(token);

	    if (verificationToken == null || verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
	        modelAndView.addObject("message", "Invalid or expired token");
	        modelAndView.setViewName("verification-error");
	        return modelAndView;
	    }

	    User user = verificationToken.getUser();
	    user.setActive(true);
	    userRepository.save(user);
	    tokenRepository.deleteById(user.getUserUid());

	    modelAndView.addObject("message", "Account verified successfully");
	    modelAndView.setViewName("account-verification-success");
	    return modelAndView;
	}

	
}
