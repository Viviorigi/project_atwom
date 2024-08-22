package com.a2m.library.service.admin;

import java.util.List; 

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.a2m.library.dto.AboutDTO;
import com.a2m.library.model.About;

public interface AboutService {
	public void deleteAbout(Long aboutId) throws Exception;
	
	public void save(AboutDTO about);
	public void update(AboutDTO about) throws Exception;
	
	About findById(Long id);
	
	public List<AboutDTO> getAll();
	
	Page<AboutDTO> findByAboutContaining(String keySearch, PageRequest pageRequest);
}
