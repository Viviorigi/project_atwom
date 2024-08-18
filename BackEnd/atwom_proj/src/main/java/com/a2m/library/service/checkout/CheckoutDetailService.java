package com.a2m.library.service.checkout;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.a2m.library.dto.CheckoutDetailDTO;
import org.springframework.transaction.annotation.Transactional;

public interface CheckoutDetailService {
    List<CheckoutDetailDTO> findAll();
    CheckoutDetailDTO findById(Integer id);
    List<CheckoutDetailDTO> findByCheckoutId(Integer checkoutId);
    CheckoutDetailDTO addDetailToCheckout(Integer checkoutId, CheckoutDetailDTO checkoutDetailDTO);
    CheckoutDetailDTO save(CheckoutDetailDTO checkoutDetailDTO);
    CheckoutDetailDTO update(Integer id, CheckoutDetailDTO checkoutDetailDTO);
    void deleteById(Integer id);
}

