package com.a2m.library.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class AboutDTO {
	private Long about_id;
	
	private String question;
	
	private String answer;
	
	private LocalDateTime cre_dt;
	
	private LocalDateTime upd_dt;
}
