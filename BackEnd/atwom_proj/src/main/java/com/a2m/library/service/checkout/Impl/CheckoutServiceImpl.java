package com.a2m.library.service.checkout.Impl;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.CheckoutDTO;
import com.a2m.library.model.Checkout;
import com.a2m.library.repository.CheckoutRepository;

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


    @Override
    public List<CheckoutDTO> findAll() {
        return checkoutRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<CheckoutDTO> findById(Integer id) {
        return checkoutRepository.findById(id).map(this::toDTO);
    }

    @Override
    @Transactional
    public CheckoutDTO save(CheckoutDTO checkoutDTO) {
        Checkout checkout = toEntity(checkoutDTO);
        checkout.setStatus(CheckoutStatus.REQUESTED);
        checkout.setStartTime(LocalDateTime.now());
        checkout.setEndTime(checkout.getStartTime().plusDays(30));//thoi gian sach het han
        checkout = checkoutRepository.save(checkout);
        // 
        // messageService.sendToAdmin("A new book checkout has been requested.");
        return toDTO(checkout);
    }

    @Override
    @Transactional
    public CheckoutDTO updateStatus(Integer id, CheckoutStatus status) {
        Checkout checkout = checkoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Checkout not found with id " + id));
        checkout.setStatus(status);

        if (status == CheckoutStatus.BORROWED) {
            checkout.setStartTime(LocalDateTime.now());
            checkout.setEndTime(checkout.getStartTime().plusDays(30));
        } else if (status == CheckoutStatus.RETURNED) {
            checkout.setEndTime(LocalDateTime.now()); 
        }

        checkout = checkoutRepository.save(checkout);
        return toDTO(checkout);
    }

    @Override
    public void checkExpiredCheckouts() {
        List<Checkout> expiredCheckouts = checkoutRepository.findAll().stream()
                .filter(checkout -> checkout.getEndTime().isBefore(LocalDateTime.now()) && checkout.getStatus() == CheckoutStatus.BORROWED)
                .collect(Collectors.toList());

        for (Checkout checkout : expiredCheckouts) {
            checkout.setStatus(CheckoutStatus.EXPIRED);
            checkoutRepository.save(checkout);
            //
            // messageService.sendToUser(checkout.getUser().getId(), "Your book is overdue. Please return it as soon as possible.");
        }
    }

    private CheckoutDTO toDTO(Checkout checkout) {
        CheckoutDTO dto = new CheckoutDTO();
        dto.setId(checkout.getId());
        //dto.setUserId(checkout.getUser().getUserId()); // Assuming you want to include user ID
        dto.setStartTime(checkout.getStartTime());
        dto.setEndTime(checkout.getEndTime());
        dto.setStatus(checkout.getStatus());
        return dto;
    }

    private Checkout toEntity(CheckoutDTO dto) {
        Checkout checkout = new Checkout();
        checkout.setId(dto.getId());
        // checkout.setUser(userRepository.findById(dto.getUserId()).orElseThrow(() -> new ResourceNotFoundException("User not found")));
        checkout.setStartTime(dto.getStartTime());
        checkout.setEndTime(dto.getEndTime());
        checkout.setStatus(dto.getStatus());
        return checkout;
    }
}


