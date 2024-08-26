package com.a2m.library.service.feedback.Impl;

import java.util.List;
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
	
	//--------------------------------------------------------------------------------------------
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
		fbDTO.setUser_id(feedBack.getUser().getUserUid());
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
		feedBack.setBook(book);
		feedBack.setUser(user);
		
		return feedBack;
	}

	

}
