package com.a2m.library.service.notification.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.a2m.library.dto.NotificationDTO;
import com.a2m.library.model.Notification;
import com.a2m.library.repository.NotificationRepository;
import com.a2m.library.service.notification.NotificationService;

@Service
public class NotificationServiceImpl implements NotificationService {
	@Autowired
	private NotificationRepository notificationRepository;

	@Override
	public void deleteNoti(Long noti_id) throws Exception {
		// TODO Auto-generated method stub
		notificationRepository.deleteById(noti_id);
	}


	@Override
	public void update(NotificationDTO notiDTO) throws Exception {
		// TODO Auto-generated method stub
		Notification noti = notificationRepository.findById(notiDTO.getNot_id())
				.orElseThrow(() -> new BadRequestException("Notification not found"));
		noti.setActive(true);
		notificationRepository.save(noti);
	
	}

	@Override
	public Notification findById(Long id) {
		// TODO Auto-generated method stub
		Notification noti = notificationRepository.findById(id).get();
		return noti;
	}

	@Override
	public List<NotificationDTO> getAll() {
		// TODO Auto-generated method stub
		return notificationRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
	}

	@Override
	public Page<NotificationDTO> findByNotificationContaining(String keySearch, PageRequest pageRequest) {
		// TODO Auto-generated method stub
		Page<Notification> notis = notificationRepository.searchNotification(keySearch, pageRequest);

        // Convert Page<User> to Page<UserDTO>
        List<NotificationDTO> noti = notis.stream().map(this::toDTO)
                                      .collect(Collectors.toList());

        return new PageImpl<>(noti, pageRequest, notis.getTotalElements());
	}
	
	@Override
	public Page<NotificationDTO> findNotificationNewest(String keySearch, PageRequest pageRequest) {
		// TODO Auto-generated method stub
		Page<Notification> notis = notificationRepository.findNotificationNewest(pageRequest);

        // Convert Page<User> to Page<UserDTO>
        List<NotificationDTO> noti = notis.stream().map(this::toDTO)
                                      .collect(Collectors.toList());

        return new PageImpl<>(noti, pageRequest, notis.getTotalElements());
	}
	
	private NotificationDTO toDTO(Notification noti) {
		NotificationDTO dto = new NotificationDTO();
        dto.setNot_id(noti.getId());
        dto.setMessage(noti.getMessage());
        dto.setReceiver(noti.getReceiver());
        dto.setCre_dt(noti.getCre_dt());
        return dto;
    }
	
	private Notification toEntity(NotificationDTO dto) {
		Notification noti = new Notification();
		noti.setMessage(dto.getMessage());
		noti.setReceiver(dto.getReceiver());
		noti.setCre_dt(dto.getCre_dt());
        return noti;
    }


	@Override
	public void markAsRead(List<NotificationDTO> notifications) {
		// TODO Auto-generated method stub
		List<Long> notificationIds = notifications.stream()
                .map(NotificationDTO::getNot_id)
                .collect(Collectors.toList());

        // Cập nhật trạng thái isRead
        notificationRepository.markAsRead(notificationIds);
	}



	
}
