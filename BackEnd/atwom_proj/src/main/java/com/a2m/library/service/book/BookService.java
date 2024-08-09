package com.a2m.library.service.book;

import java.util.List;

import com.a2m.library.dto.BookDTO;
import com.a2m.library.model.Book;


public interface BookService {
    List<BookDTO> findAll();
    List<BookDTO> findAllActive();
    BookDTO findById(Integer id);
    void save(BookDTO bookDTO);
    BookDTO update(Integer id, BookDTO bookDTO);
    void delete(Integer id);
    
    public BookDTO convertToBookDTO(Book book);
    public Book convertToBook(BookDTO bookDTO);
}


