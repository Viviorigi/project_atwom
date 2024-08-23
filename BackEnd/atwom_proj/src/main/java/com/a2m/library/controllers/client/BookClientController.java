package com.a2m.library.controllers.client;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.library.dto.BookDTO;
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
	
//	@GetMapping("/book/list/all")
//	public ResponseEntity<?> bookGetAll() {
//		List<Book>books = bookService.findAllActiveNew();
//		return ResponseEntity.ok().body(books);
//	}
	
	@GetMapping("/book/list/all")
	public ResponseEntity<?> bookGetList(
			@RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "keySearch", defaultValue = "") String keySearch) {
		PageRequest pageRequest = PageRequest.of(page - 1, 9, Sort.by("upd_dt").descending());
		Page<BookDTO> book = bookService.findByKeySearch(keySearch, pageRequest);
		return ResponseEntity.ok().body(book);
	}
	
	@GetMapping("/book/detail")
	public ResponseEntity<?> bookDetail(@RequestParam("id") Integer id) {
		BookDTO books = bookService.findById(id);
		return ResponseEntity.ok().body(books);
	}
}
