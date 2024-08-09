package com.a2m.library.service.checkout;

import com.a2m.library.dto.CheckoutDetailDTO;
import com.a2m.library.model.CheckoutDetail;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CheckoutDetailMapper {

    CheckoutDetailDTO toDTO(CheckoutDetail checkoutDetail);

    CheckoutDetail toEntity(CheckoutDetailDTO checkoutDetailDTO);
}

