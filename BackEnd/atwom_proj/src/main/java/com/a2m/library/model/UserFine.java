package com.a2m.library.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_fine")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserFine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "returnbook_id")
    private ReturnBook returnBook;

    @Column(name = "amount")
    private Integer amount;
}
