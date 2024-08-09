package com.a2m.library.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Year;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "book")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Book {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Integer id;

  @Column(name = "title")
  private String title;

  @Column(name = "publication_year")
  private Integer publicationYear;

  @Column(name = "publisher")
  private String publisher;

  @Column(name = "quantity")
  private Integer quantity;

  @Column(name = "image")
  private String image;

  @Column(name = "status_id")
  private Integer statusId;

  @Column(name = "cate_id")
  private Integer cateId;

  @Column(name = "cre_dt")
  private LocalDateTime createdDate;

  @Column(name = "upd_dt")
  private LocalDateTime updatedDate;

  @OneToMany(mappedBy = "book")
  private Set<Author> authorBooks;
}
