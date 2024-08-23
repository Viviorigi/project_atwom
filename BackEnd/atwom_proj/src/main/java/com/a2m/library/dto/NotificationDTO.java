package com.a2m.library.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class NotificationDTO {
	private Long not_id;
	
	private String receiver;
	
	private String message;
	
	private boolean active; 
	
	private LocalDateTime cre_dt;
}
