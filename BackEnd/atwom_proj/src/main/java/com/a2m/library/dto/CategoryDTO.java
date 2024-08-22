package com.a2m.library.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class CategoryDTO {
    private Integer id;
    private String name;
    private String description;
    private Boolean active;
    private LocalDateTime cre_dt;
	private LocalDateTime upd_dt;
//	private List<BookDTO>books;
	private Integer numOfBook;
}

