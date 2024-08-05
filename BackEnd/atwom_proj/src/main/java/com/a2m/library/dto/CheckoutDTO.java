package com.a2m.library.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CheckoutDTO {
    private Integer id;
    private Integer userId;
    private LocalDate startTime;
    private LocalDate endTime;
    private Boolean status;
}
