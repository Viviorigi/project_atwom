package com.a2m.library.controllers.admin;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.library.dto.response.UserResponse;
import com.a2m.library.dto.response.WishListResponse;
import com.a2m.library.model.WishList;
import com.a2m.library.service.admin.UserService;
import com.a2m.library.service.student.WishlistService;
import com.a2m.library.util.JwtUtil;

@RestController
@RequestMapping("/api/wishlist")
public class WishListController {
	@Autowired
	private WishlistService wishListService;
	@Autowired
	private JwtUtil jwtUtil; // Utility to handle JWT operations

	@Autowired
	private UserService userService; //

	@GetMapping
	public ResponseEntity<?> getUserWishList(@RequestHeader("Authorization") String jwt) {
	    try {
	        // Remove "Bearer " prefix from the JWT token
	        if (jwt.startsWith("Bearer ")) {
	            jwt = jwt.substring(7);
	        }

	        // Validate the JWT token
	        if (jwtUtil.validateJwtToken(jwt)) {
	            String username = jwtUtil.getUserNameFromJwtToken(jwt);
	            Optional<UserResponse> userOptional = userService.findUserByName(username);

	            if (userOptional.isPresent()) {
	                Long userId = userOptional.get().getUserUid();
	                List<WishList> wishList = wishListService.getUserWishList(userId);

	                // Convert WishList entities to WishListResponse objects
	                List<WishListResponse> response = wishList.stream()
	                        .map(wl -> new WishListResponse(
	                                wl.getUser().getUserUid(),
	                                wl.getBook().getId(),
	                                wl.getBook().getTitle(),
	                                wl.getBook().getImage()
	                        ))
	                        .collect(Collectors.toList());

	                return ResponseEntity.ok(response);
	            } else {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
	            }
	        } else {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
	    }
	}


	@PostMapping("/add")
	public ResponseEntity<WishListResponse> addToWishList(@RequestParam Integer bookId,
			@RequestHeader("Authorization") String jwt) {
		try {
			if (jwt.startsWith("Bearer ")) {
				jwt = jwt.substring(7);
			}

			if (jwtUtil.validateJwtToken(jwt)) {
				String username = jwtUtil.getUserNameFromJwtToken(jwt);
				Optional<UserResponse> userOptional = userService.findUserByName(username);

				if (userOptional.isPresent()) {
					Long userId = userOptional.get().getUserUid();
					WishList wishList = wishListService.addToWishList(userId, bookId);
					// Create WishListResponse
					WishListResponse response = new WishListResponse();
					response.setUser_uid(userId);
					response.setBookId(bookId);
					// Optional: Set book details if needed
					response.setBookTitle(wishList.getBook().getTitle());
					response.setBookImage(wishList.getBook().getImage());
					return ResponseEntity.ok(response);
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

	@DeleteMapping("/remove")
    public ResponseEntity<WishListResponse> removeFromWishList(@RequestParam Integer bookId,
            @RequestHeader("Authorization") String jwt) {
        try {
            if (jwt.startsWith("Bearer ")) {
                jwt = jwt.substring(7);
            }

            if (jwtUtil.validateJwtToken(jwt)) {
                String username = jwtUtil.getUserNameFromJwtToken(jwt);
                Optional<UserResponse> userOptional = userService.findUserByName(username);

                if (userOptional.isPresent()) {
                    Long userId = userOptional.get().getUserUid();
                    wishListService.removeFromWishList(userId, bookId);

                    // Create WishListResponse
                    WishListResponse response = new WishListResponse();
                    response.setUser_uid(userId); 
                    response.setBookId(bookId);
                   
                    return ResponseEntity.ok(response);
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        } catch (Exception e) {
          
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
