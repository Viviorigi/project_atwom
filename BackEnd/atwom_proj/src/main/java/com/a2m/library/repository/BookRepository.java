package com.a2m.library.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.a2m.library.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
	@Query("SELECT u FROM Book u WHERE u.active = false")
	List<Book> findAllActiveBooks();
	
	@Query("SELECT u FROM Book u WHERE u.title like %:keySearch% OR u.publisher LIKE %:keySearch%")
	Page<Book> findAllBook(@Param("keySearch") String keySearch, Pageable pageable);
}
