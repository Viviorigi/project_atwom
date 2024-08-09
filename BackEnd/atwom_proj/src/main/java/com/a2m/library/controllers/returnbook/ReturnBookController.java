package com.a2m.library.controllers.returnbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.a2m.library.dto.ReturnBookDTO;
import com.a2m.library.service.status.ReturnBookService;

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
    public ResponseEntity<ReturnBookDTO> updateStatus(@PathVariable Integer id, @RequestParam boolean status) {
        return ResponseEntity.ok(returnBookService.updateStatus(id, status));
    }
}

