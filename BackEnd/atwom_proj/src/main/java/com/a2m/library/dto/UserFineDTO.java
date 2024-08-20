package com.a2m.library.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
public class UserFineDTO {

    private Integer id;
    private Integer returnBookId;
    private Double amount;
}
