package com.a2m.library.controllers.checkout;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.CheckoutDTO;
import com.a2m.library.service.checkout.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

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
        return ResponseEntity.ok(checkoutService.save(checkoutDTO));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<CheckoutDTO> updateCheckoutStatus(@PathVariable Integer id, @RequestParam CheckoutStatus status) {
        return ResponseEntity.ok(checkoutService.updateStatus(id, status));
    }

    @Scheduled(cron = "0 0 0 * * ?") //kiem tra het han moi 0h hang ngay
    public void checkExpiredCheckouts() {
        checkoutService.checkExpiredCheckouts();
    }
}


