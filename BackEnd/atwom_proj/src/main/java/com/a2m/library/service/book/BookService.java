package com.a2m.library.service.book;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.a2m.library.dto.BookDTO;
import com.a2m.library.model.Book;


public interface BookService {
    List<BookDTO> findAll();
    
//    BookDTO findById(Integer id);
    Book save(BookDTO bookDTO);
    BookDTO update(Integer id, BookDTO bookDTO);
    void delete(Integer id);
    BookDTO getBookById(Integer id);
    
    public BookDTO convertToBookDTO(Book book);
    public Book convertToBook(BookDTO bookDTO);
    
    //---------------------------------------------
    BookDTO findById(Integer id);
	public Page<Book>findAll(String keySearch, int cateId, int page, int size);
//	void save(Book book);
	List<BookDTO> findAllActive(String keySearch);
	List<Book> findAllActiveNew();
	public Page<BookDTO>findByKeySearch(String keySearch,int cateId, PageRequest pageRequest);
	public Page<BookDTO>findByClient(String keySearch, String cateName, int pubYear, String nxb, PageRequest pageRequest);
	public Set<String>getPublisher(List<BookDTO> bookDTO);
	public Set<Integer>getPublicationYears(List<BookDTO> bookDTO);
	public Set<String>getNxb(List<BookDTO> bookDTO);
	public Set<String>getTypeCate(List<BookDTO> bookDTO);
	
	//---Thong ke
	public long getCountBooksAddedToday();
}


