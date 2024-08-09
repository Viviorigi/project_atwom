package com.a2m.library.service.book;

import org.mapstruct.Mapper;

import com.a2m.library.dto.BookDTO;
import com.a2m.library.model.Book;

@Mapper(componentModel = "spring")
public interface BookMapper {
    BookDTO toDTO(Book book);
    Book toEntity(BookDTO bookDTO);
}

