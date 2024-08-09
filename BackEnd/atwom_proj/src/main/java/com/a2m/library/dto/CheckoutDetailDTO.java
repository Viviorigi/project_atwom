package com.a2m.library.dto;

import lombok.Data;

@Data
public class CheckoutDetailDTO {
    private Integer id;
    private Integer bookId;
    private Integer checkoutId;
    private Integer quantity;
}

