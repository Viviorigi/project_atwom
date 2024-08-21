package com.a2m.library.service.admin;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.a2m.library.model.Banner;

public interface BannerService {

	public void deleteBanner(Long bannerId) throws Exception;
	
	public void save(Banner banner);
	public void update(Banner banner) throws Exception;
	
	Banner findById(Long id);
	
	public List<Banner> getAll();
	
	Page<Banner> findByBannerContaining(String keySearch, PageRequest pageRequest);
}
