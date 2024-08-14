package com.a2m.library.controllers.checkout;

import com.a2m.library.dto.CheckoutDetailDTO;
import com.a2m.library.service.checkout.CheckoutDetailService;
import com.a2m.library.dto.response.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/checkoutdt")
public class CheckoutDetailController {

    @Autowired
    private CheckoutDetailService checkoutDetailService;

    @GetMapping("/list")
    public ResponseEntity<Set<CheckoutDetailDTO>> findAll() {
        Set<CheckoutDetailDTO> checkoutDetails = checkoutDetailService.findAll();
        return ResponseEntity.ok(checkoutDetails);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CheckoutDetailDTO> findById(@PathVariable Integer id) {
        Optional<CheckoutDetailDTO> checkoutDetailDTO = checkoutDetailService.findById(id);
        return checkoutDetailDTO.map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(null));
    }

    @PostMapping("/add")
    public ResponseEntity<CheckoutDetailDTO> addCheckoutDetail(@RequestBody CheckoutDetailDTO checkoutDetailDTO) {
        CheckoutDetailDTO savedDetail = checkoutDetailService.add(checkoutDetailDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDetail);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CheckoutDetailDTO> updateCheckoutDetail(@PathVariable Integer id, @RequestBody CheckoutDetailDTO checkoutDetailDTO) {
        checkoutDetailDTO.setId(id);
        CheckoutDetailDTO updatedDetail = checkoutDetailService.update(checkoutDetailDTO);
        return ResponseEntity.ok(updatedDetail);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer id) {
        try {
            checkoutDetailService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
