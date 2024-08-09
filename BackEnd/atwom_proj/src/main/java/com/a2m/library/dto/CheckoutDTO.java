package com.a2m.library.dto;

import lombok.Data;
import java.time.LocalDateTime;

import com.a2m.library.constant.CheckoutStatus;

@Data
public class CheckoutDTO{
    private Integer id;
    private Integer userId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private CheckoutStatus status;
}
