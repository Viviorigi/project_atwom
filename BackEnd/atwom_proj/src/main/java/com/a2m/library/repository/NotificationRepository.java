package com.a2m.library.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.a2m.library.model.Notification;

import jakarta.transaction.Transactional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
	
	@Query("SELECT n FROM Notification n WHERE " +
		       "(n.message LIKE %:keyword% OR " +
		       "n.receiver LIKE %:keyword%)"+
		       "ORDER BY n.cre_dt DESC")
	    Page<Notification> searchNotification(@Param("keyword") String keyword, Pageable pageable);
	
	@Modifying
	@Transactional
	@Query("UPDATE Notification n SET n.active = true WHERE n.id IN :ids")
    public void markAsRead(@Param("ids") List<Long> ids);
	
	@Query("SELECT n FROM Notification n WHERE n.active = false ORDER BY n.cre_dt DESC")
	Page<Notification> findNotificationNewest(Pageable pageable);
	
	long countByActiveFalse();
}

// WHERE n.active = false
