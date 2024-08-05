package com.a2m.library.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class CheckoutDetailDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer id;
    private Integer bookId;
    private Integer checkoutId;
    private Integer quantity;
}

