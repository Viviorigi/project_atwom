package com.a2m.library.controllers.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.library.service.book.BookService;

@RestController
@RequestMapping(value = "api/admin")
public class StaticControler {
	@Autowired
	BookService bookService;
	
	@GetMapping("/book/today")
	public Long bookToday() {
		return bookService.getCountBooksAddedToday();
	}
}
