package com.a2m.library.controllers.cart;

import com.a2m.library.model.Cart;
import com.a2m.library.model.CartItem;
import com.a2m.library.model.User;
import com.a2m.library.service.cart.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<Cart> addBookToCart(@AuthenticationPrincipal UserDetails userDetails,
                                              @RequestParam Integer bookId,
                                              @RequestParam int quantity) {
        User user = getCurrentUser(userDetails);
        Cart cart = cartService.addBookToCart(user, bookId, quantity);
        return ResponseEntity.ok(cart);
    }

    @GetMapping("/items")
    public ResponseEntity<List<CartItem>> getCartItems(@AuthenticationPrincipal UserDetails userDetails) {
        User user = getCurrentUser(userDetails);
        List<CartItem> items = cartService.getCartItems(user);
        return ResponseEntity.ok(items);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeBookFromCart(@AuthenticationPrincipal UserDetails userDetails,
                                                   @RequestParam Integer bookId) {
        User user = getCurrentUser(userDetails);
        cartService.removeBookFromCart(user, bookId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update")
    public ResponseEntity<Cart> updateBookQuantity(@AuthenticationPrincipal UserDetails userDetails,
                                                   @RequestParam Integer bookId,
                                                   @RequestParam int quantity) {
        User user = getCurrentUser(userDetails);
        Cart cart = cartService.updateBookQuantity(user, bookId, quantity);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@AuthenticationPrincipal UserDetails userDetails) {
        User user = getCurrentUser(userDetails);
        cartService.clearCart(user);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Cart> getCartByUser(@AuthenticationPrincipal UserDetails userDetails) {
        User user = getCurrentUser(userDetails);
        Cart cart = cartService.getCartByUser(user);
        return ResponseEntity.ok(cart);
    }

    private User getCurrentUser(UserDetails userDetails) {
        //Lấy user từ token
        return null; // Thay đổi
    }
}

