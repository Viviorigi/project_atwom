package com.a2m.library.repository;

import com.a2m.library.model.CartItem;
import com.a2m.library.model.Cart;
import com.a2m.library.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByCart(Cart cart);
    CartItem findByCartAndBook(Cart cart, Book book);
    void deleteByCart(Cart cart);
}
