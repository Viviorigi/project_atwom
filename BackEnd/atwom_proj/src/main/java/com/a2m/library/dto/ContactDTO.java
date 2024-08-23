package com.a2m.library.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ContactDTO {
	private Long contact_id;
	
	private String firstName;
	
	private String lastName;
	
	private String email;
	
	private String question;
	
	private String response;
	
	private LocalDateTime cre_dt;
	
	private LocalDateTime upd_dt;
}
