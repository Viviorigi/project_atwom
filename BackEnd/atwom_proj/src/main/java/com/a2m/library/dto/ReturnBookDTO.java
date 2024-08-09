package com.a2m.library.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.a2m.library.constant.CheckoutStatus;

import lombok.Data;

@Data
public class ReturnBookDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private Integer id;
    private Integer checkoutId;
    private Integer userId;
    private LocalDateTime returnDate;
    private CheckoutStatus status;
}

