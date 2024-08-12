package com.a2m.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.a2m.library.model.Checkout;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CheckoutRepository extends JpaRepository<Checkout, Integer> {
//    List<Checkout> findExpiredCheckouts(LocalDateTime now);
}
