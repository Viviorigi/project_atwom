package com.a2m.library.controllers.checkout;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.CheckoutDTO;
import com.a2m.library.dto.NotificationDTO;
import com.a2m.library.dto.response.CheckoutListResponse;
import com.a2m.library.dto.response.NotificationListResponse;
import com.a2m.library.dto.response.ResourceNotFoundException;
import com.a2m.library.model.Checkout;
import com.a2m.library.service.checkout.CheckoutService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

    @GetMapping("/{id}")
    public ResponseEntity<Optional<CheckoutDTO>> findCheckoutById(@PathVariable Integer id) {
        Optional<CheckoutDTO> checkout = checkoutService.findById(id);
        return ResponseEntity.ok(checkout);
    }
    
    

    @PostMapping("/add")
    public ResponseEntity<Checkout> addCheckout(@RequestBody CheckoutDTO checkoutDTO) {
        Checkout createdCheckout = checkoutService.add(checkoutDTO);
        return new ResponseEntity<>(createdCheckout, HttpStatus.CREATED);
    }
    
    @PostMapping("/add-client")
    public ResponseEntity<Checkout> addCheckoutClient(@RequestBody CheckoutDTO checkoutDTO) {
        Checkout createdCheckout = checkoutService.addClient(checkoutDTO);
        return new ResponseEntity<>(createdCheckout, HttpStatus.CREATED);
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
    
    @PutMapping("/return/{id}")
    public ResponseEntity<CheckoutDTO> returnCheckout(@PathVariable Integer id) {
        CheckoutDTO updatedCheckout = checkoutService.returnedCheckout(id);
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
    
    @GetMapping(value = "/checkout/getReturn")
	public ResponseEntity<CheckoutListResponse> getReturn(@RequestParam(defaultValue = "") String keySearch,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int limit) {
		PageRequest pageRequest = PageRequest.of(page - 1, limit);
		Page<CheckoutDTO> notiPage = checkoutService.findCheckoutNeedReturn(keySearch, pageRequest);
		CheckoutListResponse response = CheckoutListResponse.builder().notis(notiPage.getContent())
				.totalPages(notiPage.getTotalPages()).totalCheckouts(notiPage.getTotalElements()).build();
		
		return ResponseEntity.ok(response);
	}
}
