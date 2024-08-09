package com.a2m.library.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

import com.a2m.library.constant.CheckoutStatus;

@Entity
@Table(name = "checkout")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Checkout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotNull(message = "User must not be null")
    private User user;

    @Column(name = "start_time")
    @NotNull
    @PastOrPresent(message = "Start time cannot be in the future")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    @NotNull
    @PastOrPresent(message = "End time cannot be in the future")
    private LocalDateTime endTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private CheckoutStatus status;

    @OneToMany(mappedBy = "checkout")
    private Set<CheckoutDetail> checkoutDetails;
}
