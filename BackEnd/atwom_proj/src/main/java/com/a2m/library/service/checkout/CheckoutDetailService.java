package com.a2m.library.service.checkout;

import java.util.List;
import java.util.Optional;

import com.a2m.library.dto.CheckoutDetailDTO;

public interface CheckoutDetailService {
    List<CheckoutDetailDTO> findAll();
    Optional<CheckoutDetailDTO> findById(Integer id);
    CheckoutDetailDTO save(CheckoutDetailDTO checkoutDetailDTO);
    CheckoutDetailDTO update(Integer id, CheckoutDetailDTO checkoutDetailDTO);
    void delete(Integer id);
}
