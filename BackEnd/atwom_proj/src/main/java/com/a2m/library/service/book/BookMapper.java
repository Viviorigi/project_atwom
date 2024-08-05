package com.a2m.library.service.book;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.a2m.library.dto.BookDTO;
import com.a2m.library.model.Book;

@Mapper(componentModel = "spring")
public interface BookMapper {

    @Mapping(target = "category", source = "category")
    @Mapping(target = "status", source = "status")
    @Mapping(target = "authors", source = "authors")
    BookDTO toDTO(Book book);

    @Mapping(target = "category", source = "category")
    @Mapping(target = "status", source = "status")
    @Mapping(target = "authors", source = "authors")
    Book toEntity(BookDTO bookDTO);
}

