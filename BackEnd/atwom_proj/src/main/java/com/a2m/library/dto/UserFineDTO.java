package com.a2m.library.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserFineDTO {

    private Integer id;
    private Integer returnBookId;
    private Integer amount;
}
