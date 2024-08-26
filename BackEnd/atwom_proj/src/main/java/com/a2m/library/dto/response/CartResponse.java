package com.a2m.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {

    private Long id;
    private Long userId;
    private Integer bookId;
    private int quantity;
    private String bookTitle;
    private Double bookPrice;
    private String categoryName;
}
