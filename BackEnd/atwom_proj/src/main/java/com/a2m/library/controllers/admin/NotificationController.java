package com.a2m.library.controllers.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.library.dto.NotificationDTO;
import com.a2m.library.dto.response.MessageResponse;
import com.a2m.library.dto.response.NotificationListResponse;
import com.a2m.library.service.notification.NotificationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "api/admin")
public class NotificationController {
	@Autowired
	private NotificationService notificationService;
	
	@PostMapping("/notification/update")
    public ResponseEntity<?> updateContact(
    		@Valid @RequestBody NotificationDTO noti) throws JsonMappingException, JsonProcessingException {

        if (noti == null) {
            return ResponseEntity.notFound().build();
        }

        // Lưu thông tin banner đã cập nhật
        try {
        	notificationService.update(noti);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }

        return ResponseEntity.ok().body(new MessageResponse("Update successful"));
    }
	
	@GetMapping(value = "/notification/getAll")
	public ResponseEntity<NotificationListResponse> getAll(@RequestParam(defaultValue = "") String keySearch,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "1") int limit) {
		PageRequest pageRequest = PageRequest.of(page - 1, limit);
		Page<NotificationDTO> notiPage = notificationService.findByNotificationContaining(keySearch, pageRequest);
		NotificationListResponse response = NotificationListResponse.builder().notis(notiPage.getContent())
				.totalPages(notiPage.getTotalPages()).totalBanners(notiPage.getTotalElements()).build();
		notificationService.markAsRead(notiPage.getContent());
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping("/notification/delete")
	public ResponseEntity<?> deleteContact(@RequestParam Long id) {
		try {
			notificationService.deleteNoti(id);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Delete successful"));
	}
	
	@GetMapping(value = "/notification/getNew")
	public ResponseEntity<NotificationListResponse> getNew(@RequestParam(defaultValue = "") String keySearch,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int limit) {
		PageRequest pageRequest = PageRequest.of(page - 1, limit);
		Page<NotificationDTO> notiPage = notificationService.findNotificationNewest(keySearch, pageRequest);
		NotificationListResponse response = NotificationListResponse.builder().notis(notiPage.getContent())
				.totalPages(notiPage.getTotalPages()).totalBanners(notiPage.getTotalElements()).build();
		notificationService.markAsRead(notiPage.getContent());
		return ResponseEntity.ok(response);
	}
}
