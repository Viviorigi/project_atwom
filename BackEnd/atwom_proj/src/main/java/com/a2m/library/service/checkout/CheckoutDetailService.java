package com.a2m.library.service.checkout;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.a2m.library.dto.CheckoutDetailDTO;
import org.springframework.transaction.annotation.Transactional;

public interface CheckoutDetailService {

    Set<CheckoutDetailDTO> findAll();

    Optional<CheckoutDetailDTO> findById(Integer id);

    @Transactional
    CheckoutDetailDTO add(CheckoutDetailDTO checkoutDetailDTO);

    @Transactional
    CheckoutDetailDTO update(CheckoutDetailDTO checkoutDetailDTO);

    void deleteById(Integer id);
}

