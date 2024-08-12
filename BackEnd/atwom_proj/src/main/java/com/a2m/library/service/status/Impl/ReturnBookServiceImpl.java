package com.a2m.library.service.status.Impl;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.ReturnBookDTO;
import com.a2m.library.exception.ResourceNotFoundException;
import com.a2m.library.model.Checkout;
import com.a2m.library.model.ReturnBook;
import com.a2m.library.repository.CheckoutRepository;
import com.a2m.library.repository.ReturnBookRepository;
import com.a2m.library.service.status.ReturnBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReturnBookServiceImpl implements ReturnBookService {

    @Autowired
    private ReturnBookRepository returnBookRepository;

    @Autowired
    private CheckoutRepository checkoutRepository;

    @Override
    public List<ReturnBookDTO> findAll() {
        return returnBookRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<ReturnBookDTO> findById(Integer id) {
        return returnBookRepository.findById(id).map(this::toDTO);
    }

    @Override
    @Transactional
    public ReturnBookDTO save(ReturnBookDTO returnBookDTO) {
        ReturnBook returnBook = toEntity(returnBookDTO);
        returnBook.setReturnDate(LocalDateTime.now());
        returnBook = returnBookRepository.save(returnBook);
        return toDTO(returnBook);
    }

    @Override
    @Transactional
    public ReturnBookDTO updateStatus(Integer id, CheckoutStatus status) {
        ReturnBook returnBook = returnBookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ReturnBook", "id", id.toString()));
        returnBook.setStatus(status);
        returnBook = returnBookRepository.save(returnBook);
        return toDTO(returnBook);
    }

    @Transactional
    public void applyPenalty(Integer id) {
        ReturnBook returnBook = returnBookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ReturnBook", "id", id.toString()));
        if (returnBook.getStatus() == CheckoutStatus.EXPIRED) {
            LocalDateTime penaltyDate = LocalDateTime.now();
            if (penaltyDate.isAfter(returnBook.getReturnDate().plusDays(14))) {
                returnBook.setStatus(CheckoutStatus.PENALTY);
                // Apply penalty logic
                returnBookRepository.save(returnBook);
            } else {
                returnBook.setStatus(CheckoutStatus.RETURNED);
                returnBookRepository.save(returnBook);
            }
        }
    }

    private ReturnBookDTO toDTO(ReturnBook returnBook) {
        ReturnBookDTO dto = new ReturnBookDTO();
        dto.setId(returnBook.getId());
        dto.setReturnDate(returnBook.getReturnDate());
        dto.setStatus(returnBook.getStatus());
        // Map other fields
        return dto;
    }

    private ReturnBook toEntity(ReturnBookDTO dto) {
        ReturnBook entity = new ReturnBook();
        entity.setId(dto.getId());
        entity.setReturnDate(dto.getReturnDate());
        entity.setStatus(dto.getStatus());
        // Map other fields
        return entity;
    }
}

