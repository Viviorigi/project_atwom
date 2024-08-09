package com.a2m.library.service.book;

import java.util.List;
import java.util.Optional;

import com.a2m.library.dto.BookDTO;

public interface BookService {
    List<BookDTO> findAll();
    Optional<BookDTO> findById(Integer id);
    BookDTO save(BookDTO bookDTO);
    BookDTO update(BookDTO bookDTO);
    void delete(Integer id);
}


