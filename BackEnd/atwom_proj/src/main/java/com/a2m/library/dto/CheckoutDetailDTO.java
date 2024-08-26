package com.a2m.library.dto;

import lombok.Data;

@Data
public class CheckoutDetailDTO {
    private Integer id;
    private Integer bookId;
    private Integer checkoutId;
    private Integer categoryId;
    private String bookTitle;
    private String categoryName;
    private Integer quantity;
    private BookDTO bookDTO;
}

