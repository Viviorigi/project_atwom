package com.a2m.library.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.a2m.library.model.CheckoutDetail;

@Repository
public interface CheckoutDetailRepository extends JpaRepository<CheckoutDetail, Integer> {
    List<CheckoutDetail> findByCheckoutId(Integer checkoutId);
}
