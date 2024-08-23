package com.a2m.library.service.admin.Impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.a2m.library.dto.AboutDTO;
import com.a2m.library.model.About;
import com.a2m.library.repository.AboutRepository;
import com.a2m.library.service.admin.AboutService;

@Service
public class AboutServiceImpl implements AboutService {
	@Autowired
	private AboutRepository aboutRepository;

	@Override
	public void deleteAbout(Long aboutId) throws Exception {
		// TODO Auto-generated method stub
		aboutRepository.deleteById(aboutId);
	}

	@Override
	public void save(AboutDTO about) {
		// TODO Auto-generated method stub
		About a = new About();
		a = toEntity(about);
		a.setCre_dt(LocalDateTime.now());
		a.setUpd_dt(LocalDateTime.now());
		aboutRepository.save(a);
	}

	@Override
	public void update(AboutDTO aboutDTO) throws Exception {
		// TODO Auto-generated method stub
		About about = aboutRepository.findById(aboutDTO.getAbout_id())
				.orElseThrow(() -> new BadRequestException("About not found"));
		about.setQuestion(aboutDTO.getQuestion());
		about.setAnswer(aboutDTO.getAnswer());
		about.setUpd_dt(LocalDateTime.now());
		aboutRepository.save(about);
	}

	@Override
	public About findById(Long id) {
		// TODO Auto-generated method stub
		About about = aboutRepository.findById(id).get();
		return about;
	}

	@Override
	public List<AboutDTO> getAll() {
		// TODO Auto-generated method stub
		return aboutRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
	}

	@Override
	public Page<AboutDTO> findByAboutContaining(String keySearch, PageRequest pageRequest) {
		// TODO Auto-generated method stub
				Page<About> abouts = aboutRepository.searchBanners(keySearch, pageRequest);

		        // Convert Page<User> to Page<UserDTO>
		        List<AboutDTO> about = abouts.stream().map(this::toDTO)
		                                      .collect(Collectors.toList());

		        return new PageImpl<>(about, pageRequest, abouts.getTotalElements());
	}
	private AboutDTO toDTO(About about) {
		AboutDTO dto = new AboutDTO();
        dto.setAbout_id(about.getId());
        dto.setQuestion(about.getQuestion());
        dto.setAnswer(about.getAnswer());
        dto.setCre_dt(about.getCre_dt());
        dto.setUpd_dt(about.getUpd_dt());
        return dto;
    }
	
	private About toEntity(AboutDTO dto) {
		About about = new About();
		about.setQuestion(dto.getQuestion());
		about.setAnswer(dto.getAnswer());
		about.setCre_dt(dto.getCre_dt());
		about.setUpd_dt(dto.getUpd_dt());
        return about;
    }
	
}
