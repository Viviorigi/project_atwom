package com.a2m.library.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "checkout_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CheckoutDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "book_id")
    @NotNull
    private Integer bookId;

    @Column(name = "checkout_id")
    @NotNull
    private Integer checkoutId;

    @Column(name = "quantity")
    @Min(value = 1)
    private Integer quantity;
}
