package com.a2m.library.service.book.Impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.library.dto.BookDTO;
import com.a2m.library.dto.UserDTO;
import com.a2m.library.model.Book;
import com.a2m.library.model.User;
import com.a2m.library.repository.BookRepository;
import com.a2m.library.service.book.BookService;

@Service
public class BookServiceImpl implements BookService{
	@Autowired
	BookRepository bookRepository;

	@Override
	public List<BookDTO> findAll() {
		List<Book>books = bookRepository.findAll();
		return books.stream().map(book -> convertToBookDTO(book)).collect(Collectors.toList());
	}

	@Override
	public BookDTO findById(Integer id) {
		// TODO Auto-generated method stub
		Book book = bookRepository.findById(id).get();
		return convertToBookDTO(book);
	}

	@Override
	public void save(BookDTO bookDTO) {
		bookRepository.save(convertToBook(bookDTO));
	}

	@Override
	public BookDTO update(Integer id, BookDTO bookDTO) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		bookRepository.deleteById(id);
	}

	@Override
	public BookDTO convertToBookDTO(Book book) {
		ModelMapper modelMapper = new ModelMapper();

		return modelMapper.map(book, BookDTO.class);
	}

	@Override
	public Book convertToBook(BookDTO bookDTO) {
		// TODO Auto-generated method stub
		ModelMapper modelMapper = new ModelMapper();

		return modelMapper.map(bookDTO, Book.class);
	}

	@Override
	public List<BookDTO> findAllActive() {
		List<Book>books = bookRepository.findAllActiveBooks();
		return books.stream().map(book -> convertToBookDTO(book)).collect(Collectors.toList());
	}



}
