package com.a2m.library.service.status.Impl;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.ReturnBookDTO;
import com.a2m.library.dto.response.ResourceNotFoundException;

import com.a2m.library.model.ReturnBook;
import com.a2m.library.repository.ReturnBookRepository;
import com.a2m.library.service.status.ReturnBookMapper;
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

    @Autowired
    private ReturnBookMapper returnBookMapper;

    @Override
    public List<ReturnBookDTO> findAll() {
        return returnBookRepository.findAll().stream()
                                   .map(returnBookMapper::toDTO)
                                   .collect(Collectors.toList());
    }

    @Override
    public Optional<ReturnBookDTO> findById(Integer id) {
        return returnBookRepository.findById(id).map(returnBookMapper::toDTO);
    }

    @Override
    @Transactional
    public ReturnBookDTO save(ReturnBookDTO returnBookDTO) {
        ReturnBook returnBook = returnBookMapper.toEntity(returnBookDTO);
        returnBook.setStatus(CheckoutStatus.RETURNED); // Default when saving
        returnBook = returnBookRepository.save(returnBook);
        return returnBookMapper.toDTO(returnBook);
    }

    @Override
    @Transactional
    public ReturnBookDTO updateStatus(Integer id, CheckoutStatus status) {
        ReturnBook returnBook = returnBookRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("ReturnBook not found with id " + id));
        returnBook.setStatus(status);
        returnBook = returnBookRepository.save(returnBook);
        return returnBookMapper.toDTO(returnBook);
    }
}
