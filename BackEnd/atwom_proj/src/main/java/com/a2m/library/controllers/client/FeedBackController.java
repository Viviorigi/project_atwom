package com.a2m.library.controllers.client;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.library.dto.FeedBackDTO;
import com.a2m.library.dto.response.UserResponse;
import com.a2m.library.dto.response.WishListResponse;
import com.a2m.library.model.WishList;
import com.a2m.library.service.admin.UserService;
import com.a2m.library.service.feedback.FeedBackService;
import com.a2m.library.util.JwtUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class FeedBackController {
	@Autowired
	FeedBackService feedBackService;
	
	@Autowired
	JwtUtil jwtUtil;
	
	@Autowired
	UserService userService;

	@PostMapping("/feedback/add")
	public ResponseEntity<?> feedBackAdd(@RequestBody FeedBackDTO feedBackDTO) {
		try {
			feedBackService.save(feedBackDTO);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		return ResponseEntity.ok().body("success");
	}

	@PostMapping("/get-info")
	public ResponseEntity<?> addToWishList(@RequestHeader("Authorization") String jwt) {
		try {
			if (jwt.startsWith("Bearer ")) {
				jwt = jwt.substring(7);
			}

			if (jwtUtil.validateJwtToken(jwt)) {
				String username = jwtUtil.getUserNameFromJwtToken(jwt);
				Optional<UserResponse> userOptional = userService.findUserByName(username);

				if (userOptional.isPresent()) {
					return ResponseEntity.ok(userOptional);
				} else {
					return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
				}
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
}
