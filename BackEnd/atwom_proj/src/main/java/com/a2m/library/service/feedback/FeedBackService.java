package com.a2m.library.service.feedback;

import java.util.List;

import com.a2m.library.dto.FeedBackDTO;
import com.a2m.library.model.FeedBack;

public interface FeedBackService {
	public List<FeedBackDTO> findAll();
	public List<FeedBackDTO> searchFeedBack();
	
	public void save(FeedBackDTO feedBackDTO);
	public void deleteById(Integer id);
	
	public FeedBackDTO convertToFbDTO(FeedBack feedBack);
	public FeedBack convertToFeedBack(FeedBackDTO feedBackDTO);
}
