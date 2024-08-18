package com.a2m.library.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

import com.a2m.library.constant.CheckoutStatus;

@Data
public class CheckoutDTO{
    private Integer id;
    private Long userUid;
    private UserDTO user;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private CheckoutStatus status;
    private List<CheckoutDetailDTO> checkoutDetails;
}
