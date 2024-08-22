package com.a2m.library.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.time.Year;
import java.util.Set;

import jakarta.persistence.Column;

@Data
public class BookDTO{
    private Integer id;
    private String title;
    private int publicationYear;
    private String publisher;
    private Integer quantity;
//    private Integer quantityPlaced;
//    private Integer status;
    private Double price;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String image;
    private Boolean active;

    private LocalDateTime cre_dt;
    private LocalDateTime upd_dt;
    private int cateId;
    private String cateName;
}
