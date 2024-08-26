package com.a2m.library.controllers.admin;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.a2m.library.config.FileUploadConfig;
import com.a2m.library.dto.UserDTO;
import com.a2m.library.dto.response.MessageResponse;
import com.a2m.library.dto.response.UserListResponse;
import com.a2m.library.dto.response.UserResponse;
import com.a2m.library.repository.UserRepository;
import com.a2m.library.repository.VerificationTokenRepository;
import com.a2m.library.service.admin.UserService;
import com.a2m.library.service.notification.SeeEmitterService;
import com.a2m.library.service.notification.SeeNotificationService;
import com.a2m.library.util.JwtUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "api/admin")
public class UserController {
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

	private final Path resourcePath;
	private final Path resourcePathThumb;

	@Value("${file.upload-dir}")
	private String uploadDir;

	public UserController(UserService userService, ObjectMapper objectMapper, FileUploadConfig fileUploadConfig) {
		this.userService = userService;
		this.objectMapper = objectMapper;
		this.resourcePath = fileUploadConfig.getResourcePath();
		this.resourcePathThumb = fileUploadConfig.getResourcePathThumb();
	}

	@PostMapping("/create")
	public ResponseEntity<?> createUser(@Valid @RequestPart("userDTO") String userDTOJson,
			@RequestParam(required = false) MultipartFile file) throws JsonMappingException, JsonProcessingException {
		UserDTO userDTO;
		userDTO = objectMapper.readValue(userDTOJson, UserDTO.class);

		if (file != null && !file.isEmpty()) {
			try {
				String originalFilename = file.getOriginalFilename();
				String timestamp = String.valueOf(System.currentTimeMillis());
				String newFilename = timestamp + "_" + originalFilename;


				Path filePath = resourcePath.resolve(newFilename);

				Files.write(filePath, file.getBytes());
				userDTO.setAvatar(newFilename);
			} catch (Exception e) {
				e.printStackTrace();
				return ResponseEntity.badRequest().body(new MessageResponse("File upload failed"));
			}
		}

		// Save user information
		try {
			userService.signUp(userDTO);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Create successful"));
	}

	@GetMapping(value = "/getUserInfo")
	public ResponseEntity<?> getUserInfo(@RequestParam Long userUid)
			throws JsonMappingException, JsonProcessingException {
		return ResponseEntity.ok(userService.getByUserUid(userUid));
	}

	@PostMapping("/update")
	public ResponseEntity<?> updateUser(@Valid @RequestPart("userDTO") String userDTOJson,
			@RequestParam(required = false) MultipartFile file) throws JsonMappingException, JsonProcessingException {
		UserDTO userDTO;
		userDTO = objectMapper.readValue(userDTOJson, UserDTO.class);
		if (file != null && !file.isEmpty()) {
			try {
				String originalFilename = file.getOriginalFilename();
				String timestamp = String.valueOf(System.currentTimeMillis());
				String newFilename = timestamp + "_" + originalFilename;

				Path filePath = resourcePath.resolve(newFilename);
				
				Files.write(filePath, file.getBytes());
				userDTO.setAvatar(newFilename);
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

	@GetMapping(value = "/getAll")
	public ResponseEntity<UserListResponse> getAll(@RequestParam(defaultValue = "") String keySearch,
			@RequestParam("page") int page, @RequestParam("limit") int limit) {
		PageRequest pageRequest = PageRequest.of(page - 1, limit, Sort.by("upd_dt").descending());
		Page<UserResponse> userPage = userService.findByUsernameContaining(keySearch, pageRequest);

		UserListResponse response = UserListResponse.builder().users(userPage.getContent())
				.totalPages(userPage.getTotalPages()).totalUsers(userPage.getTotalElements()).build();
		return ResponseEntity.ok(response);
	}
	
	@GetMapping(value = "/getAllActive")
	public ResponseEntity<UserListResponse> getAllActive(@RequestParam(defaultValue = "") String keySearch,
			@RequestParam("page") int page, @RequestParam("limit") int limit) {
		PageRequest pageRequest = PageRequest.of(page - 1, limit, Sort.by("upd_dt").descending());
		Page<UserResponse> userPage = userService.findByUsernameActive(keySearch, pageRequest);

		UserListResponse response = UserListResponse.builder().users(userPage.getContent())
				.totalPages(userPage.getTotalPages()).totalUsers(userPage.getTotalElements()).build();
		return ResponseEntity.ok(response);
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
