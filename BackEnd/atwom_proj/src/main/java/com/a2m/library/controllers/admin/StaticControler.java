package com.a2m.library.controllers.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import com.a2m.library.dto.BookDTO;
import com.a2m.library.model.Book;
import com.a2m.library.repository.CheckoutRepository;
import com.a2m.library.repository.FeedBackRepository;
import com.a2m.library.repository.UserRepository;
import com.a2m.library.repository.WishlistRepository;
import com.a2m.library.service.book.BookService;
import com.a2m.library.service.checkout.CheckoutService;
import com.a2m.library.service.student.WishlistService;

@RestController
//@RequestMapping(value = "api/admin")
public class StaticControler {
	@Autowired
	BookService bookService;
	@Autowired
	FeedBackRepository feedBackRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	WishlistRepository wishlistRepository;
	@Autowired
	WishlistService wishlistService;
	
	@Autowired
	CheckoutService checkoutService;
	
	@GetMapping("/book/today")
	public Long bookToday() {
		return bookService.getCountBooksAddedToday();
	}
	
	@GetMapping("/feedback/today")
	public Long feedToday() {
		return feedBackRepository.countFeedBackAddedToday();
	}
	
	@GetMapping("/user/today")
	public Long userToday() {
		return userRepository.countUserAddedToday();
	}
	
	@GetMapping("/book/love")
	public List<BookDTO> bookLove() {
		return bookService.bookLove();
	}

	@GetMapping("/order/month")
    public List<Object[]> getMostBorrowedBooksInLast30Days() {
        return checkoutService.getMostBorrowedBooksInLast30Days();
    }
    
    @GetMapping("/order-details/month")
    public List<Object[]> getMostBorrowedDeatilsBooksInLast30Days() {
        return checkoutService.getMostBorrowedDeatilsBooksInLast30Days();
    }
}
