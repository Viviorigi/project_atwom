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

  private String title;
  private Year publicationYear;
  private Integer quantityPlaced;
  private double price;

  @Column(name = "image")
  private String[] image;

  @Column(name = "deleted")
	private Boolean deleted = false;

  @Column(name = "publisher")
  private String publisher;

  @Column(name = "quantity")
  private Integer quantity;

  @OneToMany(mappedBy = "book")
  private Set<CheckoutDetail> checkoutDetails;

  @Column(name = "status_id")
  private boolean status;

  @Column(name = "cate_id")
  private Integer cateId;

  @Column(name = "cre_dt")
  private LocalDateTime createdDate;

  @Column(name = "upd_dt")
  private LocalDateTime updatedDate;

  @OneToMany(mappedBy = "book")
  private Set<Author> authorBooks;
}
