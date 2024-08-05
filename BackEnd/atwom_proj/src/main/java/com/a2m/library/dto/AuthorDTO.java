package com.a2m.library.dto;

import java.util.Set;
import lombok.Data;

@Data
public class AuthorDTO {
    private Integer id;
    private String name;
    private Set<BookDTO> books;
}
