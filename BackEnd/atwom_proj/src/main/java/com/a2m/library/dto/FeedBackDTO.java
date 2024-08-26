package com.a2m.library.dto;

import lombok.Data;

@Data
public class FeedBackDTO {
	private int id;
	private Double rating;
	private String comment;
	private int book_id;
	private Long user_id;
}
