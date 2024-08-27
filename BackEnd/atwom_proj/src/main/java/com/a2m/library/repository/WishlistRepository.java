package com.a2m.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.a2m.library.model.Book;
import com.a2m.library.model.WishList;
import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<WishList, Long> {
	List<WishList> findByUserUserUid(Long userId);

	Optional<WishList> findByUser_UserUidAndBook_Id(Long userUid, Integer bookId);

	void deleteByUserUserUidAndBookId(Long userId, Integer bookId);

	boolean existsByUserUserUidAndBookId(Long userId, Integer bookId);
	
	@Query("SELECT w.book FROM WishList w GROUP BY w.book ORDER BY COUNT(w.book) DESC")
    List<Book> findTop5MostLikedBooks();
}
