package com.a2m.library.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "return_book")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReturnBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "checkout_id")
    private Checkout checkout;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDate returnDate;
    private Boolean status;
}
