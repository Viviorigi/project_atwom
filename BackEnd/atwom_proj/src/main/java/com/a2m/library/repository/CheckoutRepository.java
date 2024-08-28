package com.a2m.library.repository;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.CheckoutDTO;
import com.a2m.library.model.Checkout;
import com.a2m.library.model.User;

import jakarta.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CheckoutRepository extends JpaRepository<Checkout, Integer> {

    List<Checkout> findByStatus(CheckoutStatus status);

    List<Checkout> findByEndTimeBeforeAndStatus(LocalDateTime endTime, CheckoutStatus status);

    List<Checkout> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);
    
    @Query(value = "SELECT * FROM checkout WHERE user_uid = :uIds", nativeQuery = true)
    List<Checkout> findByUIdIn(@Param("uIds") Long uIds);

    @Modifying
    @Transactional
    @Query("UPDATE Checkout c SET c.status = :status, c.endTime = :endTime, c.expiredTime = :expiredTime WHERE c.id = :id")
    void updateStatusToBorrowed(Integer id, CheckoutStatus status, LocalDateTime endTime, LocalDateTime expiredTime);

    @Query("SELECT c FROM Checkout c WHERE (:keySearch IS NULL OR c.user.fullName LIKE CONCAT('%', :keySearch, '%'))")
    Page<Checkout> findByKeySearch(
            @Param("keySearch") String keySearch,
            Pageable pageable);
    
    @Query("SELECT c FROM Checkout c WHERE c.status IN ('EXPIRED','RETURNED','PENALTY') ")
	    Page<Checkout> searchNotification(@Param("keyword") String keyword, Pageable pageable);
}
