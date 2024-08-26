package com.a2m.library.controllers.cart;

import com.a2m.library.dto.response.CartResponse;
import com.a2m.library.dto.response.UserResponse;
import com.a2m.library.model.Cart;
import com.a2m.library.service.cart.CartService;
import com.a2m.library.service.admin.UserService;
import com.a2m.library.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/add")
    public ResponseEntity<?> addBookToCart(@RequestParam Integer bookId,
            @RequestParam int quantity,
            @RequestHeader("Authorization") String jwt) {
        try {
            String username = extractUsernameFromJwt(jwt);
            if (username == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
            }

            Optional<UserResponse> userOptional = userService.findUserByName(username);
            if (userOptional.isPresent()) {
                UserResponse user = userOptional.get();
                Cart cart = cartService.addBookToCart(user, bookId, quantity);
                return ResponseEntity.ok(cart);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> removeBookFromCart(@RequestParam Long cartId,
                                                @RequestHeader("Authorization") String jwt) {
        try {
            String username = extractUsernameFromJwt(jwt);
            if (username == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
            }

            Optional<UserResponse> userOptional = userService.findUserByName(username);
            if (userOptional.isPresent()) {
                UserResponse user = userOptional.get();
                cartService.removeBookFromCart(user, cartId);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @PutMapping("/update")
public ResponseEntity<?> updateBookQuantity(@RequestParam Long cartId,
                                            @RequestParam int quantity,
                                            @RequestHeader("Authorization") String jwt) {
    try {
        String username = extractUsernameFromJwt(jwt);
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
        }

        Optional<UserResponse> userOptional = userService.findUserByName(username);
        if (userOptional.isPresent()) {
            UserResponse user = userOptional.get();
            Cart cart = cartService.updateBookQuantity(user, cartId, quantity);
            return ResponseEntity.ok(cart);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
    }
}


    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(@RequestHeader("Authorization") String jwt) {
        try {
            String username = extractUsernameFromJwt(jwt);
            if (username == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
            }

            Optional<UserResponse> userOptional = userService.findUserByName(username);
            if (userOptional.isPresent()) {
                UserResponse user = userOptional.get();
                cartService.clearCart(user);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @GetMapping()
public ResponseEntity<?> getCartByUserUid(@RequestHeader("Authorization") String jwt) {
    try {
        if (jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);
        }

        if (jwtUtil.validateJwtToken(jwt)) {
            String username = jwtUtil.getUserNameFromJwtToken(jwt);
            Optional<UserResponse> userOptional = userService.findUserByName(username);

            if (userOptional.isPresent()) {
                Long userId = userOptional.get().getUserUid();
                List<Cart> carts = cartService.getCartByUserUid(userId);

                List<CartResponse> response = carts.stream()
                        .map(cart -> new CartResponse(
                                cart.getId(),
                                cart.getUser().getUserUid(),
                                cart.getBook().getId(),
                                cart.getQuantity(),
                                cart.getBook().getTitle(),
                                cart.getBook().getPrice(),
                                cart.getBook().getCategory().getName()
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

    private String extractUsernameFromJwt(String jwt) {
        if (jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);
        }

        if (jwtUtil.validateJwtToken(jwt)) {
            return jwtUtil.getUserNameFromJwtToken(jwt);
        }
        return null;
    }
}
