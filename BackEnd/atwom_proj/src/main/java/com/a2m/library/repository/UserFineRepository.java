package com.a2m.library.repository;

import com.a2m.library.dto.UserFineDTO;
import com.a2m.library.model.Checkout;
import com.a2m.library.model.UserFine;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFineRepository extends JpaRepository<UserFine, Integer> {
    Optional<UserFine> findByCheckout(Checkout checkout);
}
