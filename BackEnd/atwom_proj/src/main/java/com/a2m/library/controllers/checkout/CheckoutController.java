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
        List<CheckoutDTO> checkouts = checkoutService.findAll();
        return ResponseEntity.ok(checkouts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CheckoutDTO> getCheckoutById(@PathVariable Integer id) {
        Optional<CheckoutDTO> checkoutDTO = checkoutService.findById(id);
        return checkoutDTO.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<CheckoutDTO> createCheckout(@RequestBody CheckoutDTO checkoutDTO) {
        checkoutDTO.setStatus(CheckoutStatus.REQUESTED);
        CheckoutDTO createdCheckout = checkoutService.add(checkoutDTO);
        return ResponseEntity.ok(createdCheckout);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCheckout(@PathVariable Integer id) {
        checkoutService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<CheckoutDTO> approveCheckout(@PathVariable Integer id) {
        CheckoutDTO updatedCheckout = checkoutService.approveCheckout(id);
        return ResponseEntity.ok(updatedCheckout);
    }

    @PutMapping("/reject/{id}")
    public ResponseEntity<CheckoutDTO> rejectCheckout(@PathVariable Integer id) {
        CheckoutDTO updatedCheckout = checkoutService.rejectCheckout(id);
        return ResponseEntity.ok(updatedCheckout);
    }

    @PutMapping("/borrow/{id}")
    public ResponseEntity<CheckoutDTO> borrowCheckout(@PathVariable Integer id) {
        CheckoutDTO updatedCheckout = checkoutService.borrowCheckout(id);
        return ResponseEntity.ok(updatedCheckout);
    }

    @Scheduled(cron = "0 0 0 * * ?") // Run every day at midnight to check for expired checkouts
    public void checkExpiredCheckouts() {
        checkoutService.checkExpiredCheckouts();
    }
}
