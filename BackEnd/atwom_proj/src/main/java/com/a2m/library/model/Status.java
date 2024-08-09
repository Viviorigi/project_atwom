package com.a2m.library.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "status")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "st_id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "status")
    private Set<Book> books;

    @OneToMany(mappedBy = "status")
    private Set<Checkout> checkouts;
}
