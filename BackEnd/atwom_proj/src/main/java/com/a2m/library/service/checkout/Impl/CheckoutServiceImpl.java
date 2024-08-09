package com.a2m.library.service.checkout.Impl;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.CheckoutDTO;
import com.a2m.library.model.Checkout;
import com.a2m.library.repository.CheckoutRepository;
import com.a2m.library.service.checkout.CheckoutMapper;
import com.a2m.library.service.checkout.CheckoutService;
import com.a2m.library.dto.response.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    @Autowired
    private CheckoutRepository checkoutRepository;

    @Autowired
    private CheckoutMapper checkoutMapper;

    @Override
    public List<CheckoutDTO> findAll() {
        return checkoutRepository.findAll().stream()
                .map(checkoutMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<CheckoutDTO> findById(Integer id) {
        return checkoutRepository.findById(id).map(checkoutMapper::toDTO);
    }

    @Override
    @Transactional
    public CheckoutDTO save(CheckoutDTO checkoutDTO) {
        Checkout checkout = checkoutMapper.toEntity(checkoutDTO);
        checkout.setStatus(CheckoutStatus.REQUESTED);
        checkout.setStartTime(LocalDateTime.now());
        checkout.setEndTime(checkout.getStartTime().plusDays(14));
        checkout = checkoutRepository.save(checkout);
        // 
        // messageService.sendToAdmin("A new book checkout has been requested.");
        return checkoutMapper.toDTO(checkout);
    }

    @Override
    @Transactional
    public CheckoutDTO updateStatus(Integer id, CheckoutStatus status) {
        Checkout checkout = checkoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Checkout not found with id " + id));
        checkout.setStatus(status);

        if (status == CheckoutStatus.BORROWED) {
            checkout.setStartTime(LocalDateTime.now());
            checkout.setEndTime(checkout.getStartTime().plusDays(14));
        }

        checkout = checkoutRepository.save(checkout);
        return checkoutMapper.toDTO(checkout);
    }

    @Override
    public void checkExpiredCheckouts() {
        List<Checkout> expiredCheckouts = checkoutRepository.findAll().stream()
                .filter(checkout -> checkout.getEndTime().isBefore(LocalDateTime.now()) && checkout.getStatus() == CheckoutStatus.BORROWED)
                .collect(Collectors.toList());

        for (Checkout checkout : expiredCheckouts) {
            checkout.setStatus(CheckoutStatus.EXPIRED);
            checkoutRepository.save(checkout);
            // tin nhan qua han
            // messageService.sendToUser(checkout.getUser().getId(), "Your book is overdue. Please return it as soon as possible.");
        }
    }
}


