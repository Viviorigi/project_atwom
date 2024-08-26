package com.a2m.library.service.notification;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.a2m.library.dto.NotificationDTO;
import com.a2m.library.model.Notification;


public interface NotificationService {
	public void deleteNoti(Long noti_id) throws Exception;
	
	public void update(NotificationDTO notiDTO) throws Exception;
	
	Notification findById(Long id);
	
	public List<NotificationDTO> getAll();
	
	Page<NotificationDTO> findByNotificationContaining(String keySearch, PageRequest pageRequest);
	
	void markAsRead(List<NotificationDTO> notifications);
	
	Page<NotificationDTO> findNotificationNewest(String keySearch, PageRequest pageRequest);
	
	public long getAllTotalActiveFalse();
}
