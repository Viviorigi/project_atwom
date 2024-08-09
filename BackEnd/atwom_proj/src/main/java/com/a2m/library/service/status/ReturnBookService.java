package com.a2m.library.service.status;

import java.util.List;
import java.util.Optional;

import com.a2m.library.dto.ReturnBookDTO;

public interface ReturnBookService {
    List<ReturnBookDTO> findAll();
    Optional<ReturnBookDTO> findById(Integer id);
    ReturnBookDTO save(ReturnBookDTO returnBookDTO);
    ReturnBookDTO updateStatus(Integer id, boolean status);
}

