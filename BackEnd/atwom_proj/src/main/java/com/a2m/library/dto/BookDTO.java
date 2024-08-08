package com.a2m.library.dto;

import lombok.Data;
import java.io.Serializable;
import java.time.Year;
import java.time.LocalDateTime;
import java.util.Set;

@Data
public class BookDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer id;
    private String title;
    private Year publicationYear;
    private String publisher;
    private Integer quantity;
    private Integer quantityPlaced;
    private Integer status;
    private String[] image;
//    private StatusDTO status;
    private CategoryDTO category; 
    private LocalDateTime creDt;
    private LocalDateTime updDt;
    private Boolean deleted;
    private Set<AuthorDTO> authors;
}

