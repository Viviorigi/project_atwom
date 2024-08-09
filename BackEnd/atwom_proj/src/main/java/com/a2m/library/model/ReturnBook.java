package com.a2m.library.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import com.a2m.library.constant.CheckoutStatus;

@Entity
@Table(name = "return_book")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReturnBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "checkout_id")
    @NotNull
    private Checkout checkout;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotNull
    private User user;

    @Column(name = "return_date")
    @NotNull
    @PastOrPresent(message = "Return date cannot be in the future")
    private LocalDateTime returnDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private CheckoutStatus status;
}
