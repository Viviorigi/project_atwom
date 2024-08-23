package com.a2m.library.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.a2m.library.model.Book;
import com.a2m.library.model.Category;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
	@Query("SELECT u FROM Book u WHERE u.active = true")
	List<Book> findAllActiveBooks();
	
	@Query("SELECT u FROM Book u WHERE (u.title LIKE %:keySearch% OR u.publisher LIKE %:keySearch%) AND (:cateId = 0 OR u.category.id = :cateId)")
	Page<Book> findAllBook(@Param("keySearch") String keySearch, @Param("cateId") int cateId, Pageable pageable);

	@Query("SELECT b FROM Book b WHERE b.active = true ORDER BY b.cre_dt DESC")
    List<Book> findAllActiveBooksSortedByCreatedDate();
	
	@Query("SELECT u FROM Book u WHERE " +
		       "(u.title LIKE %:keyword% OR " +
		       "u.description LIKE %:keyword%) AND " +
		       "u.active = true AND " +
		       "(:cateId = 0 OR u.category.id = :cateId)")
		Page<Book> searchBook(@Param("keyword") String keyword, @Param("cateId") int cateId, Pageable pageable);

}
