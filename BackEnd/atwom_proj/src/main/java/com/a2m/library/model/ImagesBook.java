package com.a2m.library.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "images_book")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ImagesBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "filename")
    private String filename;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "book_id")
    private Book book;

}
