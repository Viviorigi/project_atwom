package com.a2m.library.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Year;
import java.time.LocalDateTime;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
  private String image;

  @Column(name = "active")
	private Boolean active = false;
  
  @Column(name = "description")
  private String description;

  @Column(name = "publisher")
  private String publisher;

  @Column(name = "quantity")
  private Integer quantity;

  @OneToMany(mappedBy = "book")
  private Set<CheckoutDetail> checkoutDetails;

//  @Column(name = "status_id")
//  private Integer status = 0;

  @ManyToOne
  @JoinColumn(name = "cate_id")
  @JsonBackReference
  private Category category;

  @Column(name = "cre_dt")
  private LocalDateTime createdDate;

  @Column(name = "upd_dt")
  private LocalDateTime updatedDate;

  @ManyToMany
    @JoinTable(
        name = "book_author",
        joinColumns = @JoinColumn(name = "book_id"),
        inverseJoinColumns = @JoinColumn(name = "author_id")
    )
    private Set<Author> authors;
}
