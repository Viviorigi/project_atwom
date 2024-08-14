package com.a2m.library.repository;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.model.Checkout;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CheckoutRepository extends JpaRepository<Checkout, Integer> {

    List<Checkout> findByStatus(CheckoutStatus status);

    List<Checkout> findByEndTimeBeforeAndStatus(LocalDateTime endTime, CheckoutStatus status);

    List<Checkout> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);

    @Modifying
    @Transactional
    @Query("UPDATE Checkout c SET c.status = :status WHERE c.id = :id")
    void updateStatusToApproved(Integer id, CheckoutStatus status);

    @Modifying
    @Transactional
    @Query("UPDATE Checkout c SET c.status = :status WHERE c.id = :id")
    void updateStatusToRejected(Integer id, CheckoutStatus status);

    @Modifying
    @Transactional
    @Query("UPDATE Checkout c SET c.status = :status, c.startTime = :startTime, c.endTime = :endTime WHERE c.id = :id")
    void updateStatusToBorrowed(Integer id, CheckoutStatus status, LocalDateTime startTime, LocalDateTime endTime);
}
