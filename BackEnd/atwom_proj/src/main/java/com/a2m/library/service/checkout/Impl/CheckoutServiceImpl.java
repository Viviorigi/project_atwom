package com.a2m.library.service.checkout.Impl;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.CheckoutDTO;
import com.a2m.library.dto.response.ResourceNotFoundException;
import com.a2m.library.model.Checkout;
import com.a2m.library.model.ReturnBook;
import com.a2m.library.model.UserFine;
import com.a2m.library.repository.CheckoutRepository;
import com.a2m.library.repository.ReturnBookRepository;
import com.a2m.library.repository.UserFineRepository;
import com.a2m.library.service.checkout.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    @Autowired
    private CheckoutRepository checkoutRepository;

    @Autowired
    private ReturnBookRepository returnBookRepository;

    @Autowired
    private UserFineRepository userFineRepository;

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
        checkout = checkoutRepository.save(checkout);
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
            checkout.setEndTime(LocalDateTime.now().plusDays(30));
            checkout = checkoutRepository.save(checkout);
            scheduleEndTimeNotifications(toDTO(checkout));
        } else if (status == CheckoutStatus.RETURNED) {
            applyPenalty(id);
        }

        checkout = checkoutRepository.save(checkout);
        return toDTO(checkout);
    }

    @Override
    @Scheduled(cron = "0 0 0 * * ?") // Run every day at midnight
    public void checkExpiredCheckouts() {
        List<Checkout> expiredCheckouts = checkoutRepository.findExpiredCheckouts(LocalDateTime.now());
        for (Checkout checkout : expiredCheckouts) {
            if (checkout.getStatus() != CheckoutStatus.RETURNED && checkout.getStatus() != CheckoutStatus.PENALTY) {
                checkout.setStatus(CheckoutStatus.EXPIRED);
                checkoutRepository.save(checkout);
                sendExpirationNotification(checkout);
            }
        }
    }

    @Transactional
    public void applyPenalty(Integer id) {
        Checkout checkout = checkoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Checkout not found with id " + id));
        if (checkout.getStatus() == CheckoutStatus.EXPIRED) {
            LocalDateTime penaltyDate = LocalDateTime.now();
            if (penaltyDate.isAfter(checkout.getEndTime().plusDays(14))) {
                checkout.setStatus(CheckoutStatus.PENALTY);

                UserFine userFine = new UserFine();

                // Get ReturnBook based on checkout id
                ReturnBook returnBook = returnBookRepository.findByCheckoutId(id)
                        .orElseThrow(() -> new ResourceNotFoundException("ReturnBook not found with checkout id " + id));

                userFine.setReturnBook(returnBook);
                userFine.setAmount(calculateFineAmount(checkout));
                userFineRepository.save(userFine);
            } else {
                checkout.setStatus(CheckoutStatus.RETURNED);
            }
            checkoutRepository.save(checkout);
        }
    }

    private Integer calculateFineAmount(Checkout checkout) {
        return 100; //Example
    }

    private void sendExpirationNotification(Checkout checkout) {
        //Send an email notification to the user
    }

    @Override
    public void scheduleEndTimeNotifications(CheckoutDTO checkoutDTO) {
        // Schedule email notification 7 days before end_time
        scheduleEmailNotification(checkoutDTO, checkoutDTO.getEndTime().minusDays(7), "Reminder: Your checkout is about to expire!");

        // Schedule email notification when end_time is reached
        scheduleEmailNotification(checkoutDTO, checkoutDTO.getEndTime(), "Your checkout has expired!");
    }

    private void scheduleEmailNotification(CheckoutDTO checkoutDTO, LocalDateTime sendTime, String message) {
        // Logic to schedule email notifications
    }

    // Conversion methods
    private CheckoutDTO toDTO(Checkout checkout) {
        CheckoutDTO dto = new CheckoutDTO();
        dto.setId(checkout.getId());
        dto.setStatus(checkout.getStatus());
        dto.setStartTime(checkout.getStartTime());
        dto.setEndTime(checkout.getEndTime());
        return dto;
    }

    private Checkout toEntity(CheckoutDTO dto) {
        Checkout entity = new Checkout();
        entity.setId(dto.getId());
        entity.setStatus(dto.getStatus());
        entity.setStartTime(dto.getStartTime());
        entity.setEndTime(dto.getEndTime());
        return entity;
    }
}
