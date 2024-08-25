package com.a2m.library.service.cart;

import com.a2m.library.dto.response.UserResponse;
import com.a2m.library.model.Cart;
import com.a2m.library.model.User;

import java.util.List;

public interface CartService {
    Cart addBookToCart(UserResponse userResponse, Integer bookId, int quantity);
    
    List<Cart> getCartByUserUid(Long userUid);
    
    void removeBookFromCart(UserResponse userResponse, Integer bookId);
    
    Cart updateBookQuantity(UserResponse userResponse, Integer bookId, int quantity);
    
    void clearCart(UserResponse userResponse);
}
