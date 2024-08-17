package com.a2m.library.repository;
 

import org.springframework.data.domain.Page; 
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.a2m.library.model.Banner;

@Repository
public interface BannerRepository extends JpaRepository<Banner, Long> {
	@Query("SELECT b FROM Banner b WHERE " +
		       "(b.title LIKE %:keyword% OR " +
		       "b.description LIKE %:keyword%)")
	    Page<Banner> searchBanners(@Param("keyword") String keyword, Pageable pageable);
}
