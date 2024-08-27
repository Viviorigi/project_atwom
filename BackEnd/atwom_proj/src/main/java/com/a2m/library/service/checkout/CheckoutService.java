package com.a2m.library.service.checkout;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.CheckoutDTO;
import com.a2m.library.dto.NotificationDTO;
import com.a2m.library.model.Checkout;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.List;

public interface CheckoutService {
    List<CheckoutDTO> findAll(String keySearch, int limit, int page);
    Optional<CheckoutDTO> findById(Integer id);

    @Transactional
    Checkout add(CheckoutDTO checkoutDTO);
    
    @Transactional
    Checkout addClient(CheckoutDTO checkoutDTO);

    CheckoutDTO updateStatus(Integer id, CheckoutStatus status);

    void deleteById(Integer id);

    void checkExpiredCheckouts();
    void scheduleEndTimeNotifications(CheckoutDTO checkoutDTO);

    CheckoutDTO approveCheckout(Integer id);

    CheckoutDTO rejectCheckout(Integer id);

    CheckoutDTO borrowCheckout(Integer id);

    CheckoutDTO expiredCheckout(Integer id);

    CheckoutDTO returnedCheckout(Integer id);

    CheckoutDTO penaltyCheckout(Integer id);
    
    Page<CheckoutDTO> findCheckoutNeedReturn(String keySearch, PageRequest pageRequest);
}
