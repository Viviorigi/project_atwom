package com.a2m.library.service.status;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.a2m.library.dto.ReturnBookDTO;
import com.a2m.library.model.ReturnBook;

@Mapper(componentModel = "spring")
public interface ReturnBookMapper {
    ReturnBookDTO toDTO(ReturnBook returnBook);
    ReturnBook toEntity(ReturnBookDTO returnBookDTO);
}
