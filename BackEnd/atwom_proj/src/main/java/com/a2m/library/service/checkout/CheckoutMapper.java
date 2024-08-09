package com.a2m.library.service.checkout;

import org.mapstruct.Mapper;

import com.a2m.library.dto.CheckoutDTO;
import com.a2m.library.model.Checkout;

@Mapper(componentModel = "spring")
public interface CheckoutMapper {
    CheckoutDTO toDTO(Checkout checkout);
    Checkout toEntity(CheckoutDTO checkoutDTO);
}

