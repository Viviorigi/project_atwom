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
    private Integer id;

    private String title;
    private Year publicationYear;
    private String publisher;
    private Integer quantity;
    private byte[] image;

    @ManyToOne
    @JoinColumn(name = "status_id")
    private Status status;

    @ManyToOne
    @JoinColumn(name = "cate_id")
    private Category category;

    private LocalDateTime creDt;
    private LocalDateTime updDt;

    @ManyToMany
    @JoinTable(
        name = "author_book",
        joinColumns = @JoinColumn(name = "book_id"),
        inverseJoinColumns = @JoinColumn(name = "author_id")
    )
    private Set<Author> authors;

    @OneToMany(mappedBy = "book")
    private Set<CheckoutDetail> checkoutDetails;

    @OneToMany(mappedBy = "book")
    private Set<ImagesBook> imagesBooks;
}
