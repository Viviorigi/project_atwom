package com.a2m.library.controllers.checkout;

import com.a2m.library.dto.UserFineDTO;
import com.a2m.library.dto.response.ResourceNotFoundException;
import com.a2m.library.service.status.UserFineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/userfine")
public class UserFineController {

    @Autowired
    private UserFineService userFineService;

    // Get all user fines
    @GetMapping
    public ResponseEntity<Set<UserFineDTO>> getAllUserFines() {
        Set<UserFineDTO> userFines = userFineService.findAll();
        return ResponseEntity.ok(userFines);
    }

    // Get user fine by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserFineDTO> getUserFineById(@PathVariable Integer id) {
        Optional<UserFineDTO> userFine = userFineService.findById(id);
        if (userFine.isPresent()) {
            return ResponseEntity.ok(userFine.get());
        } else {
            throw new ResourceNotFoundException("UserFine not found with id " + id);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UserFineDTO> updateAmount(@PathVariable Integer id, @RequestParam Double amount) {
        UserFineDTO updatedUserFine = userFineService.updateAmount(id, amount);
        return ResponseEntity.ok(updatedUserFine);
    }

    // Create a new user fine
    @PostMapping
    public ResponseEntity<UserFineDTO> createUserFine(@RequestBody UserFineDTO userFineDTO) {
        UserFineDTO createdUserFine = userFineService.save(userFineDTO);
        return new ResponseEntity<>(createdUserFine, HttpStatus.CREATED);
    }

    // Get user fine by checkout ID
    @GetMapping("/checkout/{checkoutId}")
    public ResponseEntity<UserFineDTO> getUserFineByCheckoutId(@PathVariable Integer checkoutId) {
        UserFineDTO userFine = userFineService.getUserFineByCheckoutId(checkoutId);
        return ResponseEntity.ok(userFine);
    }
}

