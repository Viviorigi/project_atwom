package com.a2m.library.service.checkout;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.CheckoutDTO;

import java.util.Optional;
import java.util.List;

public interface CheckoutService {
    List<CheckoutDTO> findAll();
    Optional<CheckoutDTO> findById(Integer id);
    CheckoutDTO save(CheckoutDTO checkoutDTO);
    CheckoutDTO updateStatus(Integer id, CheckoutStatus status);
    void checkExpiredCheckouts();
}
