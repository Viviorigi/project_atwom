package com.a2m.library.service.cart.Impl;

import com.a2m.library.dto.response.UserResponse;
import com.a2m.library.model.Cart;
import com.a2m.library.model.Book;
import com.a2m.library.model.User;
import com.a2m.library.repository.UserRepository;
import com.a2m.library.repository.BookRepository;
import com.a2m.library.repository.CartRepository;
import com.a2m.library.service.cart.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Cart addBookToCart(UserResponse userResponse, Integer bookId, int quantity) {
        User user = userRepository.findById(userResponse.getUserUid())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        Cart cart = cartRepository.findByUserUserUidAndBookId(user.getUserUid(), bookId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    newCart.setBook(book);
                    newCart.setQuantity(quantity);
                    return newCart;
                });

        cart.setQuantity(1);

        return cartRepository.save(cart);
    }

    @Override
    public List<Cart> getCartByUserUid(Long userUid) {
        List<Cart> cartItems = cartRepository.findByUserUserUid(userUid);

        for (Cart cart : cartItems) {
            System.out.println("Cart ID: " + cart.getId());
            System.out.println("User ID: " + cart.getUser().getUserUid());
            System.out.println("Book ID: " + cart.getBook().getId());
            System.out.println("Quantity: " + cart.getQuantity());
        }

        return cartItems;
    }

    @Override
    public void removeBookFromCart(UserResponse userResponse, Long cartId) {
        User user = userRepository.findById(userResponse.getUserUid())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!cart.getUser().getUserUid().equals(user.getUserUid())) {
            throw new RuntimeException("Unauthorized to delete this cart item");
        }

        cartRepository.delete(cart);
    }

    @Override
    public Cart updateBookQuantity(UserResponse userResponse, Long cartId, int quantity) {
        User user = userRepository.findById(userResponse.getUserUid())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!cart.getUser().getUserUid().equals(user.getUserUid())) {
            throw new RuntimeException("Unauthorized to update this cart item");
        }

        cart.setQuantity(quantity);

        return cartRepository.save(cart);
    }

    @Override
    public void clearCart(UserResponse userResponse) {
        User user = userRepository.findById(userResponse.getUserUid())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Cart> cartList = cartRepository.findByUserUserUid(user.getUserUid());
        cartRepository.deleteAll(cartList);
    }
}
