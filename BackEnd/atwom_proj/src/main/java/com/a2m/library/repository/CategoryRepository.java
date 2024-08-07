package com.a2m.library.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.a2m.library.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer>{
	@Query("SELECT u FROM Category u WHERE u.deleted = false")
	List<Category> findAllActiveCategories();
}
