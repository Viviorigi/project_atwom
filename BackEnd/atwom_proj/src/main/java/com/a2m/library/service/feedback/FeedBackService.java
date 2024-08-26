package com.a2m.library.service.feedback;

import java.util.List;
import java.util.Map;

import com.a2m.library.dto.FeedBackDTO;
import com.a2m.library.dto.RatingOfFeedBackDTO;
import com.a2m.library.model.FeedBack;

public interface FeedBackService {
	public List<FeedBackDTO> findAll();
	public List<FeedBackDTO> searchFeedBack();
	
	public List<FeedBackDTO> findByBookId(Integer id);
	public List<FeedBackDTO> findFeedbacksByBookAndUser(Integer bookId, Long userId);
	public List<FeedBackDTO> findTop5ByOrderByCreatedAtDesc();
	
	public void save(FeedBackDTO feedBackDTO);
	public void deleteById(Integer id);
	
	public List<Double> getRatingCounts(Integer bookId);
	
	public FeedBackDTO convertToFbDTO(FeedBack feedBack);
	public FeedBack convertToFeedBack(FeedBackDTO feedBackDTO);
}
