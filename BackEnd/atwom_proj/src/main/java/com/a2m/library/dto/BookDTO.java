package com.a2m.library.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.time.Year;
import java.util.Set;

@Data
public class BookDTO{
    private Integer id;
    private String title;
    private Year publicationYear;
    private String publisher;
    private Integer quantity;
    private String image;
    private boolean status;
    private CategoryDTO category;
    private LocalDateTime creDt;
    private LocalDateTime updDt;
    private Set<AuthorDTO> authors;
}
