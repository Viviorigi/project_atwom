package com.a2m.library.controllers.checkout;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.CheckoutDTO;
import com.a2m.library.dto.response.ResourceNotFoundException;
import com.a2m.library.service.checkout.CheckoutService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    // @GetMapping("/list")
    // public ResponseEntity<List<CheckoutDTO>> getAllCheckouts() {
    //     List<CheckoutDTO> checkouts = checkoutService.findAll();
    //     return ResponseEntity.ok(checkouts);
    // }

    @GetMapping("/list")
    public ResponseEntity<List<CheckoutDTO>> getAllCheckouts(
        @RequestParam(value = "keySearch", required = false) String keySearch,
        @RequestParam(value = "limit", defaultValue = "10") int limit,
        @RequestParam(value = "page", defaultValue = "0") int page) {

        List<CheckoutDTO> checkouts = checkoutService.findAll(keySearch, limit, page - 1);
        return ResponseEntity.ok(checkouts);
    }

    @PostMapping("/add")
    public ResponseEntity<CheckoutDTO> createCheckout(@RequestBody CheckoutDTO checkoutDTO) {
        checkoutDTO.setStatus(CheckoutStatus.REQUESTED);
        CheckoutDTO createdCheckout = checkoutService.add(checkoutDTO);
        return ResponseEntity.ok(createdCheckout);
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<CheckoutDTO> updateCheckout(@PathVariable Integer id, @RequestBody @Valid CheckoutDTO checkoutDTO) {
        CheckoutDTO updatedCheckout = checkoutService.update(id, checkoutDTO);
        return ResponseEntity.ok(updatedCheckout);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCheckout(@PathVariable Integer id) {
        checkoutService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<CheckoutDTO> approveCheckout(@PathVariable Integer id) {
        try {
            CheckoutDTO approvedCheckout = checkoutService.approveCheckout(id);
            return ResponseEntity.ok(approvedCheckout);
        } catch (IllegalStateException ex) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
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

    @PutMapping("/expired/{id}")
    public ResponseEntity<CheckoutDTO> expiredCheckout(@PathVariable Integer id) {
        try {
            CheckoutDTO updatedCheckout = checkoutService.expiredCheckout(id);
            return new ResponseEntity<>(updatedCheckout, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}/returned")
    public ResponseEntity<CheckoutDTO> returnedCheckout(@PathVariable Integer id) {
        CheckoutDTO checkoutDTO = checkoutService.returnedCheckout(id);
        return ResponseEntity.ok(checkoutDTO);
    }

    @PutMapping("/{id}/penalty")
    public ResponseEntity<CheckoutDTO> penaltyCheckout(@PathVariable Integer id) {
        CheckoutDTO checkoutDTO = checkoutService.penaltyCheckout(id);
        return ResponseEntity.ok(checkoutDTO);
    }

    @Scheduled(cron = "0 0 0 * * ?") // Run every day at midnight to check for expired checkouts
    public void checkExpiredCheckouts() {
        checkoutService.checkExpiredCheckouts();
    }
}
