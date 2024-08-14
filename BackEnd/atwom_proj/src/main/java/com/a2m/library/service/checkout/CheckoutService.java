package com.a2m.library.service.checkout;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.CheckoutDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.List;

public interface CheckoutService {
    List<CheckoutDTO> findAll();
    Optional<CheckoutDTO> findById(Integer id);

    @Transactional
    CheckoutDTO add(CheckoutDTO checkoutDTO);

    CheckoutDTO updateStatus(Integer id, CheckoutStatus status);

    void deleteById(Integer id);

    void checkExpiredCheckouts();
    void scheduleEndTimeNotifications(CheckoutDTO checkoutDTO);

    CheckoutDTO approveCheckout(Integer id);

    CheckoutDTO rejectCheckout(Integer id);

    CheckoutDTO borrowCheckout(Integer id);
}
