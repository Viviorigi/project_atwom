package com.a2m.library.controllers.returnbook;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.ReturnBookDTO;
import com.a2m.library.dto.response.ResourceNotFoundException;
import com.a2m.library.model.Checkout;
import com.a2m.library.model.ReturnBook;
import com.a2m.library.repository.CheckoutRepository;
import com.a2m.library.service.status.ReturnBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/return")
public class ReturnBookController {

    @Autowired
    private ReturnBookService returnBookService;

    @Autowired
    private CheckoutRepository checkoutRepository;

    @PostMapping("/from-checkout/{checkoutId}")
    public ResponseEntity<ReturnBook> createReturnBook(@PathVariable Integer checkoutId) {
        Checkout checkout = checkoutRepository.findById(checkoutId)
                .orElseThrow(() -> new ResourceNotFoundException("Checkout not found with id " + checkoutId));

        if (checkout.getStatus() != CheckoutStatus.EXPIRED) {
            return ResponseEntity.badRequest().build();
        }

        ReturnBook returnBook = returnBookService.createReturnBookFromCheckout(checkout);
        return ResponseEntity.ok(returnBook);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<ReturnBook> updateStatus(@PathVariable Integer id, @RequestBody CheckoutStatus status) {
        returnBookService.updateReturnBookStatus(id, status);
        return ResponseEntity.ok(returnBookService.findById(id));
    }

    @GetMapping
    public List<ReturnBook> findAll() {
        return returnBookService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReturnBook> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(returnBookService.findById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer id) {
        returnBookService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/returned/{id}")
    public ResponseEntity<ReturnBookDTO> markReturnBookAsReturned(@PathVariable Integer id) {
        try {
            ReturnBookDTO updatedReturnBook = returnBookService.updateStatusToReturned(id);
            return ResponseEntity.ok(updatedReturnBook);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/penalty/{id}")
    public ResponseEntity<ReturnBookDTO> markReturnBookAsPenalty(@PathVariable Integer id, @RequestParam Double fineAmount) {
        try {
            ReturnBookDTO updatedReturnBook = returnBookService.updateStatusToPenalty(id, fineAmount);
            return ResponseEntity.ok(updatedReturnBook);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

