package com.a2m.library.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ReturnBookDTO {
    private Integer id;
    private Integer checkoutId;
    private Integer userId;
    private LocalDate returnDate;
    private Boolean status;
}
