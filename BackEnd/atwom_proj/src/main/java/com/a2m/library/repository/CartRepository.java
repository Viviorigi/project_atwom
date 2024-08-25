package com.a2m.library.repository;

import com.a2m.library.model.Cart;
import com.a2m.library.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUserUserUid(Long userId);

    Optional<Cart> findByUserUserUidAndBookId(Long userUid, Integer bookId);

    void deleteByUserUserUidAndBookId(Long userId, Integer bookId);

    boolean existsByUserUserUidAndBookId(Long userId, Integer bookId);
}
