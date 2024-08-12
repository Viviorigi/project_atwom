package com.a2m.library.service.status.Impl;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.ReturnBookDTO;
import com.a2m.library.dto.response.ResourceNotFoundException;
import com.a2m.library.model.ReturnBook;
import com.a2m.library.repository.ReturnBookRepository;
import com.a2m.library.service.status.ReturnBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReturnBookServiceImpl implements ReturnBookService {

    @Autowired
    private ReturnBookRepository returnBookRepository;

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
        returnBook.setStatus(CheckoutStatus.RETURNED); // Default status
        returnBook = returnBookRepository.save(returnBook);
        return toDTO(returnBook);
    }

    @Override
    @Transactional
    public ReturnBookDTO updateStatus(Integer id, CheckoutStatus status) {
        ReturnBook returnBook = returnBookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ReturnBook not found with id " + id));
        returnBook.setStatus(status);
        returnBook = returnBookRepository.save(returnBook);
        return toDTO(returnBook);
    }

    // Manual mapping methods

    private ReturnBookDTO toDTO(ReturnBook returnBook) {
        ReturnBookDTO dto = new ReturnBookDTO();
        dto.setId(returnBook.getId());
        dto.setCheckoutId(returnBook.getCheckout().getId());
        //dto.setUserId(returnBook.getUser().getId());
        dto.setReturnDate(returnBook.getReturnDate());
        dto.setStatus(returnBook.getStatus());
        return dto;
    }

    private ReturnBook toEntity(ReturnBookDTO dto) {
        ReturnBook returnBook = new ReturnBook();
        returnBook.setId(dto.getId());
        // returnBook.setCheckout(checkoutRepository.findById(dto.getCheckoutId()).orElseThrow(() -> new ResourceNotFoundException("Checkout not found")));
        // returnBook.setUser(userRepository.findById(dto.getUserId()).orElseThrow(() -> new ResourceNotFoundException("User not found")));
        returnBook.setReturnDate(dto.getReturnDate());
        returnBook.setStatus(dto.getStatus());
        return returnBook;
    }
}
