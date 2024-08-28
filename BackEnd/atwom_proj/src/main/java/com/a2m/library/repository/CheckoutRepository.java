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

	@Query("SELECT c FROM Checkout c WHERE c.status = :status")
	Page<Checkout> findByStatus(@Param("status") CheckoutStatus status, Pageable pageable);

	@Query("SELECT c FROM Checkout c WHERE "
			+ "(:keySearch IS NULL OR c.user.fullName LIKE CONCAT('%', :keySearch, '%')) AND " + "(c.status = :status)")
	Page<Checkout> findByKeySearchAndStatus(@Param("keySearch") String keySearch,
			@Param("status") CheckoutStatus status, Pageable pageable);

	List<Checkout> findByEndTimeBeforeAndStatus(LocalDateTime endTime, CheckoutStatus status);

	List<Checkout> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);

	@Query(value = "SELECT * FROM checkout WHERE user_uid = :uIds", nativeQuery = true)
	List<Checkout> findByUIdIn(@Param("uIds") Long uIds);

	@Modifying
	@Transactional
	@Query("UPDATE Checkout c SET c.status = :status, c.endTime = :endTime, c.expiredTime = :expiredTime WHERE c.id = :id")
	void updateStatusToBorrowed(Integer id, CheckoutStatus status, LocalDateTime endTime, LocalDateTime expiredTime);

	@Query("SELECT c FROM Checkout c WHERE (:keySearch IS NULL OR c.user.fullName LIKE CONCAT('%', :keySearch, '%'))")
	Page<Checkout> findByKeySearch(@Param("keySearch") String keySearch, Pageable pageable);

	@Query("SELECT c FROM Checkout c WHERE c.status IN ('BORROWED','EXPIRED','RETURNED','PENALTY') ")
	Page<Checkout> searchNotification(@Param("keyword") String keyword, Pageable pageable);

	@Query("SELECT cd.book.id, SUM(cd.quantity) as totalQuantity " + "FROM Checkout c " + "JOIN c.checkoutDetails cd "
			+ "WHERE c.status IN ('BORROWED', 'EXPIRED', 'RETURNED', 'PENALTY') " + "AND c.startTime >= :startDate "
			+ "GROUP BY cd.book.id " + "ORDER BY totalQuantity DESC")
	List<Object[]> findMostBorrowedBooksInLast30Days(@Param("startDate") LocalDateTime startDate);

	@Query("SELECT b.id, b.title, b.image, SUM(cd.quantity) as totalQuantity " + "FROM Checkout c "
			+ "JOIN c.checkoutDetails cd " + "JOIN cd.book b "
			+ "WHERE c.status IN ('BORROWED', 'EXPIRED', 'RETURNED', 'PENALTY') " + "AND c.startTime >= :startDate "
			+ "GROUP BY b.id, b.title, b.image " + "ORDER BY totalQuantity DESC")
	List<Object[]> findMostBorrowedDetailsBooksInLast30Days(@Param("startDate") LocalDateTime startDate);

}
