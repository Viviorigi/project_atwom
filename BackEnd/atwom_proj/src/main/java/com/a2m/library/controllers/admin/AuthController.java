package com.a2m.library.controllers.admin;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
import com.a2m.library.dto.request.ForgotPasswordRequest;
import com.a2m.library.dto.request.LoginRequest;
import com.a2m.library.dto.response.JwtResponse;
import com.a2m.library.dto.response.MessageResponse;
import com.a2m.library.dto.response.UserListResponse;
import com.a2m.library.dto.response.UserResponse;
import com.a2m.library.model.User;
import com.a2m.library.model.VerificationToken;
import com.a2m.library.repository.UserRepository;
import com.a2m.library.repository.VerificationTokenRepository;
import com.a2m.library.security.CustomUserDetails;
import com.a2m.library.service.admin.UserService;
import com.a2m.library.service.student.PasswordResetService;
import com.a2m.library.util.JwtUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "api/auth")
public class AuthController {
	@Autowired
	private MessageSource messageSource;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private UserService userService;
	@Autowired
	private VerificationTokenRepository tokenRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordResetService passwordResetService;

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtil.generateJwtToken(authentication);

		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

		User user = userRepository.findByUsername(loginRequest.getUsername())
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));

		if (!user.isActive()) {
			throw new BadCredentialsException("User account is not verified");
		}

		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getEmail(),
				user.getFullName(), "Bearer", user.getAvatar(), roles));
	}



	@GetMapping("/getroles")
	public ResponseEntity<?> checkRole(@RequestParam("role") String role, @RequestHeader("Authorization") String jwt) {
		if (jwt.startsWith("Bearer ")) {
			jwt = jwt.substring(7);
		}
		if (jwtUtil.validateJwtToken(jwt)) {
			String username = jwtUtil.getUserNameFromJwtToken(jwt);
			Optional<UserResponse> user = userService.findUserByName(username);
			List<String> roles = Arrays.asList(role.split(","));
			boolean hasRole = user.get().getRoles().stream().anyMatch(roles::contains);
			if (hasRole) {
				return ResponseEntity.ok(true);
			} else {
				return ResponseEntity.ok(false);
			}
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
		}
	}

	@PostMapping("/forgot-password")
	public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
		try {
			passwordResetService.sendPasswordResetToken(request.getEmail());
			return ResponseEntity.ok(new MessageResponse("Password reset link has been sent to your email"));
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
	}

	@GetMapping("/reset-password")
	public ModelAndView showResetPasswordForm(@RequestParam("token") String token, ModelAndView modelAndView) {
		// Render the reset password page
		modelAndView.setViewName("reset-password");
		modelAndView.addObject("token", token);
		return modelAndView;
	}

	@PostMapping("/reset-password")
	public ModelAndView resetPassword(@RequestParam Map<String, String> allParams, @RequestParam("token") String token,
			@RequestParam("newPassword") String newPassword,
			@RequestParam("confirmPassword") String confirmationPassword) {
		ModelAndView modelAndView = new ModelAndView();

		System.out.println("Received parameters: " + allParams);

		if (!newPassword.equals(confirmationPassword)) {
			modelAndView.setViewName("reset-password"); // Redirect back to the reset password form
			modelAndView.addObject("message", "New Password does not match");
			modelAndView.addObject("token", token);
			return modelAndView;
		}

		try {
			passwordResetService.resetPassword(token, newPassword);
			modelAndView.setViewName("reset-password-success"); // Redirect to success page
			modelAndView.addObject("message", "Password reset successful");
			return modelAndView;
		} catch (Exception e) {
			modelAndView.setViewName("reset-password"); // Redirect back to the reset password form
			modelAndView.addObject("message", e.getMessage());
			modelAndView.addObject("token", token);
			return modelAndView;
		}
	}
}
