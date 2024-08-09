package com.a2m.library.controllers.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.a2m.library.dto.BookDTO;
import com.a2m.library.service.book.BookService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/list")
    public List<BookDTO> findAll() {
        return bookService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookDTO> findById(@PathVariable Integer id) {
        Optional<BookDTO> bookDTO = bookService.findById(id);
        return bookDTO.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public BookDTO save(@RequestBody BookDTO bookDTO) {
        return bookService.save(bookDTO);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BookDTO> update(@PathVariable Integer id, @RequestBody BookDTO bookDTO) {
        if (!bookService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        bookDTO.setId(id);
        return ResponseEntity.ok(bookService.update(bookDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (!bookService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        bookService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

