package com.a2m.library.dto.response;

import java.util.List;

import com.a2m.library.dto.NotificationDTO;
import com.a2m.library.model.Notification;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class NotificationListResponse {
	private List<NotificationDTO> notis;
	private int totalPages;
	private long totalBanners;
}
