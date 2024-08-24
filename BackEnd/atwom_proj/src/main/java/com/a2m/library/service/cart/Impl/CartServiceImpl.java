package com.a2m.library.service.cart.Impl;

import com.a2m.library.model.Cart;
import com.a2m.library.model.CartItem;
import com.a2m.library.model.Book;
import com.a2m.library.model.User;
import com.a2m.library.repository.CartItemRepository;
import com.a2m.library.repository.CartRepository;
import com.a2m.library.repository.BookRepository;
import com.a2m.library.service.cart.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Cart addBookToCart(User user, Integer bookId, int quantity) {
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> createCartForUser(user));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        CartItem cartItem = cartItemRepository.findByCartAndBook(cart, book);
        if (cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            cartItem = new CartItem();
            cartItem.setBook(book);
            cartItem.setQuantity(quantity);
            cartItem.setCart(cart);
            cart.getItems().add(cartItem);
        }

        cartRepository.save(cart);
        return cart;
    }

    @Override
    public List<CartItem> getCartItems(User user) {
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        return cartItemRepository.findByCart(cart);
    }

    @Override
    public void removeBookFromCart(User user, Integer bookId) {
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        CartItem cartItem = cartItemRepository.findByCartAndBook(cart, book);
        if (cartItem != null) {
            cart.getItems().remove(cartItem);
            cartItemRepository.delete(cartItem);
        }
    }

    @Override
    public Cart updateBookQuantity(User user, Integer bookId, int quantity) {
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        CartItem cartItem = cartItemRepository.findByCartAndBook(cart, book);
        if (cartItem != null) {
            cartItem.setQuantity(quantity);
            cartRepository.save(cart);
        }

        return cart;
    }

    @Override
    public void clearCart(User user) {
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getItems().clear();
        cartItemRepository.deleteByCart(cart);
    }

    @Override
    public Cart getCartByUser(User user) {
        return cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
    }

    private Cart createCartForUser(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }
}
