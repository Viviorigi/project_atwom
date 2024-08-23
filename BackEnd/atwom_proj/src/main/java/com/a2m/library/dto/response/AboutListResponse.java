package com.a2m.library.dto.response;

import java.util.List;

import com.a2m.library.dto.AboutDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AboutListResponse {
	private List<AboutDTO> abouts;
	private int totalPages;
	private long totalBanners;
}
