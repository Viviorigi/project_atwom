package com.a2m.library.service.checkout.Impl;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a2m.library.dto.CheckoutDetailDTO;
import com.a2m.library.dto.response.ResourceNotFoundException;
import com.a2m.library.model.Book;
import com.a2m.library.model.Checkout;
import com.a2m.library.model.CheckoutDetail;
import com.a2m.library.repository.CheckoutDetailRepository;
import com.a2m.library.service.checkout.CheckoutDetailService;

@Service
public class CheckoutDetailServiceImpl implements CheckoutDetailService {

    @Autowired
    private CheckoutDetailRepository checkoutDetailRepository;

    @Override
    public Set<CheckoutDetailDTO> findAll() {
        return checkoutDetailRepository.findAll().stream()
                                       .map(this::toDTO)
                                       .collect(Collectors.toSet());
    }

    @Override
    public Optional<CheckoutDetailDTO> findById(Integer id) {
        return checkoutDetailRepository.findById(id).map(this::toDTO);
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        if (!checkoutDetailRepository.existsById(id)) {
            throw new ResourceNotFoundException("CheckoutDetail not found with id " + id);
        }
        checkoutDetailRepository.deleteById(id);
    }

    private CheckoutDetailDTO toDTO(CheckoutDetail checkoutDetail) {
        CheckoutDetailDTO dto = new CheckoutDetailDTO();
        dto.setId(checkoutDetail.getId());
        dto.setBookId(checkoutDetail.getBook().getId());
        dto.setCheckoutId(checkoutDetail.getCheckout().getId());
        dto.setQuantity(checkoutDetail.getQuantity());
        return dto;
}

    private CheckoutDetail toEntity(CheckoutDetailDTO dto) {
        CheckoutDetail checkoutDetail = new CheckoutDetail();
        checkoutDetail.setId(dto.getId());
        
        Book book = new Book();
        book.setId(dto.getBookId());
        checkoutDetail.setBook(book);
        
        Checkout checkout = new Checkout();
        checkout.setId(dto.getCheckoutId());
        checkoutDetail.setCheckout(checkout);
        
        checkoutDetail.setQuantity(dto.getQuantity());
        return checkoutDetail;
}
}
