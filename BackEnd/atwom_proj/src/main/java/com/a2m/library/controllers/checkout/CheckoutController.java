package com.a2m.library.controllers.checkout;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.CheckoutDTO;
import com.a2m.library.service.checkout.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    @Autowired
    private CheckoutService checkoutService;

    @GetMapping("/list")
    public ResponseEntity<List<CheckoutDTO>> getAllCheckouts() {
        return ResponseEntity.ok(checkoutService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CheckoutDTO> getCheckoutById(@PathVariable Integer id) {
        Optional<CheckoutDTO> checkoutDTO = checkoutService.findById(id);
        return checkoutDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<CheckoutDTO> createCheckout(@RequestBody CheckoutDTO checkoutDTO) {
        checkoutDTO.setStatus(CheckoutStatus.REQUESTED);
        return ResponseEntity.ok(checkoutService.save(checkoutDTO));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<CheckoutDTO> updateCheckoutStatus(@PathVariable Integer id, @RequestParam CheckoutStatus status) {
        CheckoutDTO updatedCheckout = checkoutService.updateStatus(id, status);

        if (status == CheckoutStatus.BORROWED) {
            updatedCheckout.setStartTime(LocalDateTime.now());
            updatedCheckout.setEndTime(LocalDateTime.now().plusDays(30));
            checkoutService.scheduleEndTimeNotifications(updatedCheckout);
        }

        return ResponseEntity.ok(updatedCheckout);
    }

    @Scheduled(cron = "0 0 0 * * ?") // Run every day at midnight to check for expired checkouts
    public void checkExpiredCheckouts() {
        checkoutService.checkExpiredCheckouts();
    }
}
