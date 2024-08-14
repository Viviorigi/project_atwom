package com.a2m.library.controllers.returnbook;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.ReturnBookDTO;
import com.a2m.library.service.status.ReturnBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/returnbook")
public class ReturnBookController {

    @Autowired
    private ReturnBookService returnBookService;

    @GetMapping("/list")
    public List<ReturnBookDTO> findAll() {
        return returnBookService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReturnBookDTO> findById(@PathVariable Integer id) {
        Optional<ReturnBookDTO> returnBookDTO = returnBookService.findById(id);
        return returnBookDTO.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ReturnBookDTO save(@RequestBody ReturnBookDTO returnBookDTO) {
        return returnBookService.save(returnBookDTO);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ReturnBookDTO> updateStatus(@PathVariable Integer id, @RequestParam CheckoutStatus status) {
        if (status == CheckoutStatus.RETURNED || status == CheckoutStatus.PENALTY) {
            return ResponseEntity.ok(returnBookService.updateStatus(id, status));
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/applyPenalty/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> applyPenalty(@PathVariable Integer id) {
        returnBookService.applyPenalty(id);
        return ResponseEntity.ok().build();
    }
}
