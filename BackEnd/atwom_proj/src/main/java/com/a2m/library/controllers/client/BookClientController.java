package com.a2m.library.controllers.client;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.library.model.Book;
import com.a2m.library.service.book.BookService;

@RestController
public class BookClientController {
	@Autowired
	BookService bookService;
	
	@GetMapping("/book/new")
	public ResponseEntity<?> bookGet() {
		List<Book>books = bookService.findAllActiveNew();
		
		if(books.size() < 5)
			return ResponseEntity.ok().body(books);
		else {
			List<Book> res = new ArrayList<Book>();
			for(int i = 0; i < 5; i++)
				res.add(books.get(i));
			return ResponseEntity.ok().body(res);
		}
	}
}
