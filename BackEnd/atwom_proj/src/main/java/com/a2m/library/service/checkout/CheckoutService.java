package com.a2m.library.service.checkout;

import java.util.List;
import java.util.Optional;

import com.a2m.library.dto.CheckoutDTO;

public interface CheckoutService {
    List<CheckoutDTO> findAll();
    Optional<CheckoutDTO> findById(Integer id);
    CheckoutDTO save(CheckoutDTO checkoutDTO);
    CheckoutDTO update(Integer id, CheckoutDTO checkoutDTO);
    void delete(Integer id);
}

