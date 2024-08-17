package com.a2m.library.service.admin.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.a2m.library.dto.response.UserResponse;
import com.a2m.library.model.Banner;
import com.a2m.library.model.User;
import com.a2m.library.repository.BannerRepository;
import com.a2m.library.service.admin.BannerService;

@Service
public class BannerServiceImpl implements BannerService {
	
	@Autowired
	private BannerRepository bannerRepository;

	@Override
	public void deleteBanner(Long bannerId) throws Exception {
		// TODO Auto-generated method stub
		bannerRepository.deleteById(bannerId);
	}

	@Override
	public void save(Banner banner) {
		// TODO Auto-generated method stub
		bannerRepository.save(banner);
	}

	@Override
	public Banner findById(Long id) {
		// TODO Auto-generated method stub
		Banner banner = bannerRepository.findById(id).get();
		return banner;
	}

	@Override
	public List<Banner> getAll() {
		// TODO Auto-generated method stub
		List<Banner> banners = bannerRepository.findAll();
		return banners.stream().collect(Collectors.toList());
	}

	@Override
	public Page<Banner> findByBannerContaining(String keySearch, PageRequest pageRequest) {
		// TODO Auto-generated method stub
		Page<Banner> banners = bannerRepository.searchBanners(keySearch, pageRequest);

        // Convert Page<User> to Page<UserDTO>
        List<Banner> banner = banners.stream()
                                      .collect(Collectors.toList());

        return new PageImpl<>(banner, pageRequest, banners.getTotalElements());
	}
	
}
