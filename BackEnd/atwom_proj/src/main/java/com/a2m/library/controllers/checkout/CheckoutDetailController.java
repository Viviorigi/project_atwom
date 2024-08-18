package com.a2m.library.controllers.checkout;

import com.a2m.library.dto.CheckoutDetailDTO;
import com.a2m.library.service.checkout.CheckoutDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/checkoutdt")
public class CheckoutDetailController {

    @Autowired
    private CheckoutDetailService checkoutDetailService;

    @GetMapping("/list")
    public ResponseEntity<List<CheckoutDetailDTO>> getAllDetails() {
        return ResponseEntity.ok(checkoutDetailService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<CheckoutDetailDTO>> getDetailsByCheckoutId(@PathVariable Integer id) {
        return ResponseEntity.ok(checkoutDetailService.findByCheckoutId(id));
    }

    @PostMapping("/add/{checkoutId}")
    public ResponseEntity<CheckoutDetailDTO> addDetailToCheckout(
            @PathVariable Integer checkoutId,
            @RequestBody CheckoutDetailDTO checkoutDetailDTO) {
        return ResponseEntity.ok(checkoutDetailService.addDetailToCheckout(checkoutId, checkoutDetailDTO));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CheckoutDetailDTO> updateDetail(@PathVariable Integer id, @RequestBody CheckoutDetailDTO checkoutDetailDTO) {
        return ResponseEntity.ok(checkoutDetailService.update(id, checkoutDetailDTO));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDetail(@PathVariable Integer id) {
        checkoutDetailService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

