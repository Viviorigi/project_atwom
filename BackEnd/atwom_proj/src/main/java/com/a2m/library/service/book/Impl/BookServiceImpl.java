package com.a2m.library.service.book.Impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.library.dto.BookDTO;
import com.a2m.library.model.Book;
import com.a2m.library.repository.BookRepository;
import com.a2m.library.service.book.BookMapper;
import com.a2m.library.service.book.BookService;

import jakarta.transaction.Transactional;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookMapper bookMapper;

    @Override
    public List<BookDTO> findAll() {
        return bookRepository.findAll().stream()
                             .map(bookMapper::toDTO)
                             .collect(Collectors.toList());
    }

    @Override
    public Optional<BookDTO> findById(Integer id) {
        return bookRepository.findById(id).map(bookMapper::toDTO);
    }

    @Override
    @Transactional
    public BookDTO save(BookDTO bookDTO) {
        Book book = bookMapper.toEntity(bookDTO);
        book = bookRepository.save(book);
        return bookMapper.toDTO(book);
    }

    @Override
    @Transactional
    public BookDTO update(BookDTO bookDTO) {
        Book book = bookMapper.toEntity(bookDTO);
        book = bookRepository.save(book);
        return bookMapper.toDTO(book);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        bookRepository.deleteById(id);
    }
}

