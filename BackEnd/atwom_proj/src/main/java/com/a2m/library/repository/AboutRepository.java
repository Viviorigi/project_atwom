package com.a2m.library.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.a2m.library.model.About;

@Repository
public interface AboutRepository extends JpaRepository<About, Long> {
	@Query("SELECT a FROM About a WHERE " +
		       "(a.question LIKE %:keyword% OR " +
		       "a.answer LIKE %:keyword%)")
	    Page<About> searchBanners(@Param("keyword") String keyword, Pageable pageable);
}
