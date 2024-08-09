package com.a2m.library.service.checkout;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.a2m.library.dto.CheckoutDetailDTO;

public interface CheckoutDetailService {

    Set<CheckoutDetailDTO> findAll();

    Optional<CheckoutDetailDTO> findById(Integer id);

    void deleteById(Integer id);
}

