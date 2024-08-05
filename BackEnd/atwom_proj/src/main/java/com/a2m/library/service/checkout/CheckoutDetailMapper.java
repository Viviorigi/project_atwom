package com.a2m.library.service.checkout;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.a2m.library.dto.CheckoutDetailDTO;
import com.a2m.library.model.CheckoutDetail;

@Mapper(componentModel = "spring")
public interface CheckoutDetailMapper {

    @Mapping(target = "bookId", source = "book.id")
    @Mapping(target = "checkoutId", source = "checkout.id")
    CheckoutDetailDTO toDTO(CheckoutDetail checkoutDetail);

    @Mapping(target = "book.id", source = "bookId")
    @Mapping(target = "checkout.id", source = "checkoutId")
    CheckoutDetail toEntity(CheckoutDetailDTO checkoutDetailDTO);
}
