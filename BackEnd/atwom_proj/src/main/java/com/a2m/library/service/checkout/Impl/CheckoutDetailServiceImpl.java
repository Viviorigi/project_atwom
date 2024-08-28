package com.a2m.library.service.checkout.Impl;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a2m.library.dto.BookDTO;
import com.a2m.library.dto.CategoryDTO;
import com.a2m.library.dto.CheckoutDetailDTO;
import com.a2m.library.dto.response.ResourceNotFoundException;
import com.a2m.library.model.Book;
import com.a2m.library.model.Checkout;
import com.a2m.library.model.CheckoutDetail;
import com.a2m.library.repository.BookRepository;
import com.a2m.library.repository.CheckoutDetailRepository;
import com.a2m.library.repository.CheckoutRepository;
import com.a2m.library.service.checkout.CheckoutDetailService;

import java.util.List;

@Service
public class CheckoutDetailServiceImpl implements CheckoutDetailService {

    @Autowired
    private CheckoutDetailRepository checkoutDetailRepository;

    @Autowired
    private BookRepository bookRepository;


    @Autowired
    private CheckoutRepository checkoutRepository;

    @Override
    public List<CheckoutDetailDTO> findAll() {
        return checkoutDetailRepository.findAll().stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    @Override
    public CheckoutDetailDTO findById(Integer id) {
        return checkoutDetailRepository.findById(id)
            .map(this::mapToDTO)
            .orElseThrow(() -> new ResourceNotFoundException("CheckoutDetail not found"));
    }

    @Override
    public List<CheckoutDetailDTO> findByCheckoutId(Integer checkoutId) {
        List<CheckoutDetail> details = checkoutDetailRepository.findByCheckoutId(checkoutId);
        if (details.isEmpty()) {
            throw new ResourceNotFoundException("No details found for checkout with id " + checkoutId);
        }
        return details.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CheckoutDetailDTO addDetailToCheckout(Integer checkoutId, CheckoutDetailDTO checkoutDetailDTO) {
        Book book = bookRepository.findById(checkoutDetailDTO.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));
        Checkout checkout = checkoutRepository.findById(checkoutId)
            .orElseThrow(() -> new ResourceNotFoundException("Checkout not found with id " + checkoutId));
        
        if (bookRepository.findById(checkoutDetailDTO.getBookId()).isEmpty()) {
            throw new ResourceNotFoundException("Book not found with id " + checkoutDetailDTO.getBookId());
        }

        CheckoutDetail checkoutDetail = new CheckoutDetail();
        checkoutDetail.setBook(bookRepository.findById(checkoutDetailDTO.getBookId()).get());
        checkoutDetail.setCheckout(checkout);
        checkoutDetail.setQuantity(checkoutDetailDTO.getQuantity());

        if(checkoutDetail.getQuantity() - book.getQuantity() < 0){
            return mapToDTO(checkoutDetailRepository.save(checkoutDetail));
        } else {
            throw new IllegalStateException("Order quantity must > Book quantity.");
        }
    }

    @Override
    public CheckoutDetailDTO save(CheckoutDetailDTO checkoutDetailDTO) {
        Book book = bookRepository.findById(checkoutDetailDTO.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));
        CheckoutDetail checkoutDetail = new CheckoutDetail();
        checkoutDetail.setBook(bookRepository.findById(checkoutDetailDTO.getBookId()).orElseThrow(() -> new ResourceNotFoundException("Book not found")));
        checkoutDetail.setCheckout(checkoutRepository.findById(checkoutDetailDTO.getCheckoutId()).orElseThrow(() -> new ResourceNotFoundException("Checkout not found")));
        checkoutDetail.setQuantity(checkoutDetailDTO.getQuantity());

        if(checkoutDetail.getQuantity() - book.getQuantity() < 0){
            return mapToDTO(checkoutDetailRepository.save(checkoutDetail));
        } else {
            throw new IllegalStateException("Order quantity must > Book quantity.");
        }
    }

    @Override
    public CheckoutDetailDTO update(Integer id, CheckoutDetailDTO checkoutDetailDTO) {
        Book book = bookRepository.findById(checkoutDetailDTO.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));
        CheckoutDetail checkoutDetail = checkoutDetailRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("CheckoutDetail not found"));
        checkoutDetail.setQuantity(checkoutDetailDTO.getQuantity());

        if(checkoutDetail.getQuantity() - book.getQuantity() < 0){
            return mapToDTO(checkoutDetailRepository.save(checkoutDetail));
        } else {
            throw new IllegalStateException("Order quantity must > Book quantity.");
        }
    }

    @Override
    public void deleteById(Integer id) {
        checkoutDetailRepository.deleteById(id);
    }

    private CheckoutDetailDTO mapToDTO(CheckoutDetail checkoutDetail) {
        CheckoutDetailDTO dto = new CheckoutDetailDTO();
        dto.setId(checkoutDetail.getId());
        dto.setCheckoutId(checkoutDetail.getCheckout().getId());
        dto.setBookId(checkoutDetail.getBook().getId());
        dto.setBookTitle(checkoutDetail.getBook().getTitle());
        dto.setCategoryId(checkoutDetail.getBook().getCategory().getId());
        dto.setCategoryName(checkoutDetail.getBook().getCategory().getName());
        dto.setQuantity(checkoutDetail.getQuantity());
        return dto;
    }
}


