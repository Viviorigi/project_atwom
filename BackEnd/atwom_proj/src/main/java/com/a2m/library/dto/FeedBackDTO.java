package com.a2m.library.dto;

import java.time.LocalDateTime;
import java.util.Map;

import lombok.Data;

@Data
public class FeedBackDTO {
	private int id;
	private Integer rating;
	private String comment;
	private int book_id;
	private Long user_id;
	private String user_avatar;
	private String user_name;
    private LocalDateTime upd_dt;
//    private Map<Double, Long> ratingCounts;
}
