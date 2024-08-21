package com.a2m.library.service.book;

import java.util.List;

import org.springframework.data.domain.Page;

import com.a2m.library.dto.BookDTO;
import com.a2m.library.model.Book;


public interface BookService {
    List<BookDTO> findAll();
    
//    BookDTO findById(Integer id);
    void save(BookDTO bookDTO);
    BookDTO update(Integer id, BookDTO bookDTO);
    void delete(Integer id);
    
    public BookDTO convertToBookDTO(Book book);
    public Book convertToBook(BookDTO bookDTO);
    
    //---------------------------------------------
    Book findById(Integer id);
	public Page<Book>findAll(String keySearch, int cateId, int page, int size);
	void save(Book book);
	List<Book> findAllActive();
	List<Book> findAllActiveNew();
}


