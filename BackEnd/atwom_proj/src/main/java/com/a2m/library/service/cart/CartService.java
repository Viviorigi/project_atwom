package com.a2m.library.service.cart;

import com.a2m.library.model.Cart;
import com.a2m.library.model.CartItem;
import com.a2m.library.model.User;

import java.util.List;

public interface CartService {
    Cart addBookToCart(User user, Integer bookId, int quantity);
    List<CartItem> getCartItems(User user);
    void removeBookFromCart(User user, Integer bookId);
    Cart updateBookQuantity(User user, Integer bookId, int quantity);
    void clearCart(User user);
    Cart getCartByUser(User user);
}
