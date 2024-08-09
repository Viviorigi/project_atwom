package com.a2m.library.service.checkout.Impl;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.a2m.library.dto.response.ResourceNotFoundException;
import org.hibernate.mapping.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a2m.library.dto.CheckoutDTO;
import com.a2m.library.dto.CheckoutDetailDTO;
import com.a2m.library.model.Checkout;
import com.a2m.library.model.CheckoutDetail;
import com.a2m.library.repository.CheckoutRepository;
import com.a2m.library.repository.CheckoutDetailRepository;
import com.a2m.library.service.checkout.CheckoutMapper;
import com.a2m.library.service.checkout.CheckoutService;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    @Autowired
    private CheckoutRepository checkoutRepository;

    @Autowired
private CheckoutDetailRepository checkoutDetailRepository;

    @Autowired
    private CheckoutMapper checkoutMapper;

    @Override
    public Set<CheckoutDTO> findAll() {
        return checkoutRepository.findAll().stream()
                                 .map(checkoutMapper::toDTO)
                                 .collect(Collectors.toSet());
    }

    @Override
    public Optional<CheckoutDTO> findById(Integer id) {
        return checkoutRepository.findById(id).map(checkoutMapper::toDTO);
    }

    @Override
    @Transactional
    public CheckoutDTO save(CheckoutDTO checkoutDTO) {
        Checkout checkout = checkoutMapper.toEntity(checkoutDTO);
        checkout.setStatus(false);
        checkout = checkoutRepository.save(checkout);
        return checkoutMapper.toDTO(checkout);
    }

    @Override
    @Transactional
    public CheckoutDTO updateStatus(Integer id, boolean status) {
        Checkout checkout = checkoutRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Checkout not found with id " + id));
        checkout.setStatus(status);
        checkout = checkoutRepository.save(checkout);
        return checkoutMapper.toDTO(checkout);
    }

    @Override
    @Transactional
    public void completeCheckout(Integer id, Set<CheckoutDetailDTO> checkoutDetails) {
        Checkout checkout = checkoutRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Checkout not found with id " + id));
        
        checkout.setStatus(true);
        checkoutRepository.save(checkout);

        // Convert DTOs to entities and save details
        Set<CheckoutDetail> details = checkoutDetails.stream()
            .map(detailDTO -> {
                CheckoutDetail detail = new CheckoutDetail();
                detail.setBookId(detailDTO.getBookId());
                detail.setCheckoutId(id);
                detail.setQuantity(detailDTO.getQuantity());
                return detail;
            })
            .collect(Collectors.toSet());
        
        checkoutDetailRepository.saveAll(details);
    }
}

