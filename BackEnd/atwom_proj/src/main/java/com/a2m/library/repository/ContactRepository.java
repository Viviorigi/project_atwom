package com.a2m.library.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.a2m.library.model.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
	@Query("SELECT c FROM Contact c WHERE " +
		       "(c.question LIKE %:keyword% OR " +
		       "c.email LIKE %:keyword%)")
	    Page<Contact> searchBanners(@Param("keyword") String keyword, Pageable pageable);
}
