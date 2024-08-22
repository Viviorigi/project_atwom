package com.a2m.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WishListResponse {

	private Long user_uid;
	private Integer bookId;
	private String bookTitle; // Optional: if you want to include book title
	private String bookImage; // Optional: if you want to include book image
}
