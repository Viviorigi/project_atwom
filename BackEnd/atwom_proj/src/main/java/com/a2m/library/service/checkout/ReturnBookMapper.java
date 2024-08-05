package com.a2m.library.service.checkout;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.a2m.library.dto.ReturnBookDTO;
import com.a2m.library.model.ReturnBook;

@Mapper(componentModel = "spring")
public interface ReturnBookMapper {
    @Mapping(target = "checkoutId", source = "checkout.id")
    @Mapping(target = "userId", source = "user.id")
    ReturnBookDTO toDTO(ReturnBook returnBook);

    @Mapping(target = "checkout.id", source = "checkoutId")
    @Mapping(target = "user.id", source = "userId")
    ReturnBook toEntity(ReturnBookDTO returnBookDTO);
}
