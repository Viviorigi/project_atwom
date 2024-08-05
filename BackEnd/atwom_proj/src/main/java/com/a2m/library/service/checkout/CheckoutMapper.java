package com.a2m.library.service.checkout;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.a2m.library.dto.CheckoutDTO;
import com.a2m.library.model.Checkout;

@Mapper(componentModel = "spring")
public interface CheckoutMapper {

    @Mapping(target = "userId", source = "user.id")
    CheckoutDTO toDTO(Checkout checkout);

    @Mapping(target = "user.id", source = "userId")
    Checkout toEntity(CheckoutDTO checkoutDTO);
}

