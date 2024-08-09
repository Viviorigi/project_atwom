package com.a2m.library.controllers.admin;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.a2m.library.dto.UserDTO;
import com.a2m.library.dto.request.LoginRequest;
import com.a2m.library.dto.response.JwtResponse;
import com.a2m.library.dto.response.MessageResponse;
import com.a2m.library.model.User;
import com.a2m.library.model.VerificationToken;
import com.a2m.library.repository.UserRepository;
import com.a2m.library.repository.VerificationTokenRepository;
import com.a2m.library.security.CustomUserDetails;
import com.a2m.library.service.admin.UserService;
import com.a2m.library.util.JwtUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "api/admin")
public class AuthController {
	@Autowired
	private MessageSource messageSource;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private UserService userService;
	private final ObjectMapper objectMapper;

	@Autowired
	private VerificationTokenRepository tokenRepository;

	@Autowired
	private UserRepository userRepository;

	public AuthController(UserService userService, ObjectMapper objectMapper) {
		this.userService = userService;
		this.objectMapper = objectMapper;
	}

	@Value("${file.upload-dir}")
	private String uploadDir;

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
		
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtil.generateJwtToken(authentication);

		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

		// Check if the user has the ADMIN role
		if (!userDetails.getAuthorities().stream().anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"))) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN)
					.body(new MessageResponse("You don't have access, login account admin"));
		}
		
		User user = userRepository.findByUsername(loginRequest.getUsername())
	            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

	    if (!user.isActive()) {
	        throw new BadCredentialsException("User account is not verified");
	    }
		

		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity
				.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getEmail(), "Bearer", roles));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody UserDTO userDTO) {
		try {
			userService.signUp(userDTO);
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

	@GetMapping(value = "/getUserInfo")
	public ResponseEntity<?> getUserInfo(@RequestParam Long userUid)
			throws JsonMappingException, JsonProcessingException {
		return ResponseEntity.ok(userService.getByUserUid(userUid));
	}

	@GetMapping(value = "/getAll")
	public ResponseEntity<?> getUserInfo() {
		return ResponseEntity.ok(userService.getAll());
	}

	@PostMapping(value = "/getByUserList")
	public ResponseEntity<?> getByUserList(@RequestBody List<String> userUidList)
			throws JsonMappingException, JsonProcessingException {
		return ResponseEntity.ok(userService.getByUserUidList(userUidList));
	}

	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteUser(@RequestParam Long userUid) {
		try {
			userService.deleteUser(userUid);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Delete successful"));
	}
	
	 @GetMapping("/verify")
	    public ResponseEntity<?> verifyAccount(@RequestParam("token") String token) {
	        VerificationToken verificationToken = tokenRepository.findByToken(token);

	        if (verificationToken == null || verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
	            return ResponseEntity.badRequest().body("Invalid or expired token");
	        }

	        User user = verificationToken.getUser();
	        user.setActive(true);
	        userRepository.save(user);

	        return ResponseEntity.ok("Account verified successfully");
	    }
	 
	 
}
