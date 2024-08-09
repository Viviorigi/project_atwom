package com.a2m.library.service.status;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.ReturnBookDTO;

import java.util.List;
import java.util.Optional;

public interface ReturnBookService {
    List<ReturnBookDTO> findAll();
    Optional<ReturnBookDTO> findById(Integer id);
    ReturnBookDTO save(ReturnBookDTO returnBookDTO);
    ReturnBookDTO updateStatus(Integer id, CheckoutStatus status);
}
