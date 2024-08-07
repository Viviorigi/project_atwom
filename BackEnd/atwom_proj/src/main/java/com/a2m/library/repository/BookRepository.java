package com.a2m.library.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.a2m.library.model.Book;
import com.a2m.library.model.User;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
	@Query("SELECT u FROM Book u WHERE u.deleted = false")
	List<Book> findAllActiveBooks();
}
