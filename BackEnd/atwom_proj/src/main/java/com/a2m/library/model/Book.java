package com.a2m.library.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Year;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
  private int publicationYear;
  private double price;

  @Column(name = "image")
  private String image;

  @Column(name = "active")
	private Boolean active = false;
  
  @Column(name = "description", columnDefinition = "TEXT")
  private String description;

  @Column(name = "publisher")
  private String publisher;

  @Column(name = "quantity")
  private Integer quantity;
  
  @Column(name = "nxb")
  private String nxb;

  @OneToMany(mappedBy = "book")
  @JsonIgnore
  private Set<CheckoutDetail> checkoutDetails;

//  @Column(name = "status_id")
//  private Integer status = 0;

  @ManyToOne
  @JoinColumn(name = "cate_id")
  @JsonBackReference
  private Category category;

  @Column(name = "cre_dt")
  private LocalDateTime cre_dt;

  @Column(name = "upd_dt")
  private LocalDateTime upd_dt;

  @ManyToMany
    @JoinTable(
        name = "book_author",
        joinColumns = @JoinColumn(name = "book_id"),
        inverseJoinColumns = @JoinColumn(name = "author_id")
    )
    private Set<Author> authors;
  
  @OneToMany(mappedBy = "book")
  @JsonManagedReference
  private List<ImagesBook> imagebooks;
  
  @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<WishList> wishlist = new ArrayList<>();
  
}
