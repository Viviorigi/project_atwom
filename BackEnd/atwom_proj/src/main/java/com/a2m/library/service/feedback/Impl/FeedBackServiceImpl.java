package com.a2m.library.service.feedback.Impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.library.dto.FeedBackDTO;
import com.a2m.library.model.Book;
import com.a2m.library.model.FeedBack;
import com.a2m.library.model.User;
import com.a2m.library.repository.FeedBackRepository;
import com.a2m.library.service.admin.UserService;
import com.a2m.library.service.book.BookService;
import com.a2m.library.service.feedback.FeedBackService;

import jakarta.persistence.criteria.CriteriaBuilder.In;

@Service
public class FeedBackServiceImpl implements FeedBackService {
	@Autowired
	FeedBackRepository feedBackRepository;
	@Autowired
	BookService bookService;
	@Autowired
	UserService userService;

	@Override
	public List<FeedBackDTO> findAll() {
		// TODO Auto-generated method stub
		List<FeedBack> feedBacks = feedBackRepository.findAll();
		return feedBacks.stream().map(feedBack -> convertToFbDTO(feedBack)).collect(Collectors.toList());
	}

	@Override
	public List<FeedBackDTO> searchFeedBack() {
		// TODO Auto-generated method stub
		return null;
	}

	// ---------------------------------------------------------------------------------------------
	@Override
	public List<FeedBackDTO> findByBookId(Integer id) {
		// TODO Auto-generated method stub
//		List<FeedBack> feedbacks = feedBackRepository.findByBookId(id);
		List<FeedBack> feedbacks = feedBackRepository.findByBookIdOrderByUpdDtDesc(id);
		
		return feedbacks.stream().map(this::convertToFbDTO).collect(Collectors.toList());
	}

	// --------------------------------------------------------------------------------------------
	@Override
	public void save(FeedBackDTO feedBackDTO) {
		// TODO Auto-generated method stub
		feedBackRepository.save(convertToFeedBack(feedBackDTO));
	}

	@Override
	public void deleteById(Integer id) {
		// TODO Auto-generated method stub
		feedBackRepository.deleteById(id);
	}

	@Override
	public FeedBackDTO convertToFbDTO(FeedBack feedBack) {
		// TODO Auto-generated method stub
		FeedBackDTO fbDTO = new FeedBackDTO();
		fbDTO.setId(feedBack.getId());
		fbDTO.setRating(feedBack.getRating());
		fbDTO.setComment(feedBack.getComment());
		fbDTO.setBook_id(feedBack.getBook().getId());
		if (feedBack.getUser().getUserUid() != null)
			fbDTO.setUser_id(feedBack.getUser().getUserUid());
		fbDTO.setUser_name(feedBack.getUser().getFullName());
		fbDTO.setUser_avatar(feedBack.getUser().getAvatar());
		fbDTO.setUpd_dt(feedBack.getUpdDt());
		return fbDTO;
	}

	@Override
	public FeedBack convertToFeedBack(FeedBackDTO feedBackDTO) {
		// TODO Auto-generated method stub
		Book book = bookService.convertToBook(bookService.findById(feedBackDTO.getBook_id()));
		User user = userService.convertToUser(userService.get_user_by_id(feedBackDTO.getUser_id()));

		FeedBack feedBack = new FeedBack();
		feedBack.setId(feedBackDTO.getId());
		feedBack.setRating(feedBackDTO.getRating());
		feedBack.setComment(feedBackDTO.getComment());
		feedBack.setUpdDt(feedBackDTO.getUpd_dt());
		feedBack.setBook(book);
		feedBack.setUser(user);

		return feedBack;
	}

	@Override
	public List<Double> getRatingCounts(Integer bookId) {
	    List<FeedBackDTO> feedbacks = findByBookId(bookId);
	    int[] cnt = new int[6]; // Mảng đếm số lượng đánh giá từ 1 đến 5
	    long totalRatings = 0; // Tổng số lượng đánh giá hợp lệ

	    // Đếm số lượng đánh giá cho từng mức sao
	    for (FeedBackDTO feedback : feedbacks) {
	        Integer rating = feedback.getRating();
	        if (rating != null && rating >= 1 && rating <= 5) {
	            cnt[rating]++;
	            totalRatings++;
	        }
	    }

	    // Tính tỷ lệ phần trăm cho mỗi mức sao
	    List<Double> res = new ArrayList<>();
	    for (int i = 1; i <= 5; i++) {
	        double percentage = totalRatings == 0 ? 0.0 : ((double) cnt[i] / totalRatings) * 100;
	        res.add(percentage);
	    }

	    return res;
	}


}
