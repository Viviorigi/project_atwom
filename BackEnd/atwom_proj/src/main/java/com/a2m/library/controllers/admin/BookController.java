package com.a2m.library.controllers.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.library.dto.BookDTO;
import com.a2m.library.dto.response.MessageResponse;
import com.a2m.library.model.Book;
import com.a2m.library.service.book.BookService;

@RestController
public class BookController {
	@Autowired
	BookService bookService;
	
	@GetMapping("/book/list")
	public ResponseEntity<?> bookGet() {
		List<BookDTO>books = bookService.findAllActive();
		return ResponseEntity.ok().body(books);
	}
	
	@PostMapping("book/add")
	public ResponseEntity<?> bookAddPost(@RequestBody BookDTO bookDTO){
		try {
			bookService.save(bookDTO);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Add ok"));
	}
	
	@PostMapping("book/edit")
	public ResponseEntity<?> bookEditPost(@RequestBody BookDTO bookDTO){
		try {
			bookService.save(bookDTO);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Add ok"));
	}
	
	@DeleteMapping("book/delete")
	public ResponseEntity<?> bookDelete(@RequestParam Integer id){
		try {
			bookService.delete(id);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Delete ok"));
	}
}
