package com.a2m.library.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.a2m.library.model.FeedBack;

@Repository
public interface FeedBackRepository extends JpaRepository<FeedBack, Integer> {
	List<FeedBack> findByBookId(Integer bookId);
	
	List<FeedBack> findByBookIdOrderByUpdDtDesc(Integer bookId);

	@Query("SELECT AVG(f.rating) FROM FeedBack f WHERE f.book.id = :bookId")
    Double findAverageRatingByBookId(@Param("bookId") Integer bookId);
	
	List<FeedBack> findByBookIdAndUser_UserUid(Integer bookId, Long userUid);
	List<FeedBack> findTop5ByOrderByUpdDtDesc();
	
	@Query("SELECT COUNT(b) FROM FeedBack   b WHERE FUNCTION('DATE', b.updDt) = CURRENT_DATE")
    long countFeedBackAddedToday();
}
