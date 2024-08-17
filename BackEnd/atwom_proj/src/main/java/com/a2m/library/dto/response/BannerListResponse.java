package com.a2m.library.dto.response;

import java.util.List;

import com.a2m.library.model.Banner;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class BannerListResponse {
	private List<Banner> banners;
	private int totalPages;
	private long totalBanners;
}