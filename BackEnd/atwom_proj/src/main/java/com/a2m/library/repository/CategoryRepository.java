package com.a2m.library.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.a2m.library.dto.CategoryDTO;
import com.a2m.library.model.Category;
import com.a2m.library.model.User;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer>{
	@Query("SELECT u FROM Category u WHERE u.active = false")
	List<Category> findAllActiveCategories();
	
	@Query("SELECT u FROM Category u WHERE u.name like %:keySearch%")
	Page<Category> findAllCategory(@Param("keySearch") String keySearch, Pageable pageable);
	
	@Query("SELECT b.category FROM Book b WHERE b.id = :bookId")
	Category findCategoryByBookId(@Param("bookId") Integer bookId);

	@Query("SELECT u FROM Category u WHERE " +
		       "(u.name LIKE %:keyword% OR " +
		       "u.description LIKE %:keyword%) AND " +
		       "u.active = true")
	    Page<Category> searchCategories(@Param("keyword") String keyword, Pageable pageable);
}
