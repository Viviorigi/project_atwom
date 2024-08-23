package com.a2m.library.dto.response;

import java.util.List;

import com.a2m.library.dto.ContactDTO;
import com.a2m.library.model.Contact;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ContactListResponse {
	private List<ContactDTO> contacts;
	private int totalPages;
	private long totalBanners;
}
