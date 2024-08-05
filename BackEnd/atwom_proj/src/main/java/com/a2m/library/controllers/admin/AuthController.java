package com.a2m.library.controllers.admin;

import java.util.List;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.library.dto.UserDTO;
import com.a2m.library.dto.request.LoginRequest;
import com.a2m.library.dto.response.JwtResponse;
import com.a2m.library.dto.response.MessageResponse;
import com.a2m.library.security.CustomUserDetails;
import com.a2m.library.service.admin.UserService;
import com.a2m.library.util.JwtUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

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
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtil.generateJwtToken(authentication);

		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(),
				userDetails.getEmail(), "Bearer", roles));
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
	public ResponseEntity<?> updateUser(@Valid @RequestBody UserDTO userDTO) {
		try {
			userService.update(userDTO);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Update successful"));
	}
	
	@GetMapping(value = "/getUserInfo")
	public ResponseEntity<?> getUserInfo(@RequestParam Long userUid) throws JsonMappingException, JsonProcessingException {
		return ResponseEntity.ok(userService.getByUserUid(userUid));
	}
	
	@GetMapping(value = "/getAll")
	public ResponseEntity<?> getUserInfo() {
		return ResponseEntity.ok(userService.getAll());
	}
	
	@PostMapping(value = "/getByUserList")
	public ResponseEntity<?> getByUserList(@RequestBody List<String> userUidList) throws JsonMappingException, JsonProcessingException {
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
}
