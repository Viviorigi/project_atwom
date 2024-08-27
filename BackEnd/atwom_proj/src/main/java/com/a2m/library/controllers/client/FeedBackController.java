package com.a2m.library.controllers.client;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.library.dto.FeedBackDTO;
import com.a2m.library.dto.RatingOfFeedBackDTO;
import com.a2m.library.dto.response.UserResponse;
import com.a2m.library.dto.response.WishListResponse;
import com.a2m.library.model.WishList;
import com.a2m.library.repository.FeedBackRepository;
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
	
	@Autowired
	FeedBackRepository feedBackRepository;

	@GetMapping("/feedback/list")
	public ResponseEntity<?> feedBackList(@RequestParam(name = "id", defaultValue = "0") Integer id) {
		List<FeedBackDTO> feedBackDTOs = feedBackService.findByBookId(id);
		return ResponseEntity.ok().body(feedBackDTOs);
	}
	
	@GetMapping("/feedback/new")
	public ResponseEntity<?> feedBackNew() {
		List<FeedBackDTO> feedBackDTOs = feedBackService.findTop5ByOrderByCreatedAtDesc();
		return ResponseEntity.ok().body(feedBackDTOs);
	}

	@GetMapping("/feedback/rating-counts")
	public ResponseEntity<?> getRatingCounts(@RequestParam(name = "id", defaultValue = "0") Integer id) {
		List<Double> ratingCounts = feedBackService.getRatingCounts(id);
		return ResponseEntity.ok().body(ratingCounts);
	}
	
	@GetMapping("/feedback/book-rating")
	public ResponseEntity<?> getBookRating(@RequestParam(name = "id", defaultValue = "0") Integer id) {
		Double rating = feedBackRepository.findAverageRatingByBookId(id);
		return ResponseEntity.ok().body(rating);
	}

	@GetMapping("/feedback/myFeedBack")
	public ResponseEntity<?> getMyFeedBack(@RequestParam(name = "book_id", defaultValue = "0") Integer book_id,
			@RequestParam(name = "user_id", defaultValue = "0") Long user_id) {
		List<FeedBackDTO> fb = feedBackService.findFeedbacksByBookAndUser(book_id, user_id);
		FeedBackDTO res = new FeedBackDTO();
		if(fb.size() != 0)
			res = fb.get(0);
		return ResponseEntity.ok().body(res);
	}

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
