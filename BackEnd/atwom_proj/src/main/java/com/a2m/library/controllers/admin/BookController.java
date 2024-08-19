package com.a2m.library.controllers.admin;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.a2m.library.dto.BookDTO;
import com.a2m.library.dto.response.MessageResponse;
import com.a2m.library.model.Book;
import com.a2m.library.service.admin.UserService;
import com.a2m.library.service.book.BookService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
//@RequestMapping(value = "api/book")
public class BookController {
	@Autowired
	BookService bookService;
	private final ObjectMapper objectMapper;
	
	@Value("${file.upload-dir}")
	private String uploadDir;
	
	public BookController(BookService bookService, ObjectMapper objectMapper) {
		this.bookService = bookService;
		this.objectMapper = objectMapper;
	}
	
//	@GetMapping("/book/list")
//	public ResponseEntity<?> bookGet() {
//		List<BookDTO>books = bookService.findAllActive();
//		return ResponseEntity.ok().body(books);
//	}
	
	@GetMapping("/book/list")
	public ResponseEntity<?> studentGetList(@RequestParam("page") Integer page,
											@RequestParam("keySearch") String keySearch){
		Page<Book>books = bookService.findAll(keySearch, page-1 , 5);
		return ResponseEntity.ok().body(books);
	}
	
	@PostMapping("/book/add")
	public ResponseEntity<?> studentAddList(@RequestParam("book") String bookJson,
			@RequestParam(required = false) MultipartFile file) throws JsonMappingException, JsonProcessingException{
		Book book;
		book = objectMapper.readValue(bookJson, Book.class);
		if (file != null && !file.isEmpty()) {
			try {
				String originalFilename = file.getOriginalFilename();
				String timestamp = String.valueOf(System.currentTimeMillis());
				String newFilename = timestamp + "_" + originalFilename;

				final Path directory = Paths.get(uploadDir);
				final Path filePath = Paths.get(uploadDir + newFilename);
				if (!Files.exists(directory)) {
					Files.createDirectories(directory);
				}
				Files.write(filePath, file.getBytes());
				book.setImage(newFilename);
				System.out.println("đã lưu ảnh");
			} catch (Exception e) {
				System.out.println("Lỗi tải ảnh");
				e.printStackTrace();
				return ResponseEntity.badRequest().body(new MessageResponse("File upload failed"));
			}
		}
		
		try {
			bookService.save(book);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		return ResponseEntity.ok().body("success");
	}
	
	@PostMapping("/book/edit")
	public ResponseEntity<?> bookEditPost(@RequestBody BookDTO bookDTO){
		try {
			bookService.save(bookDTO);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Add ok"));
	}
	
	@PostMapping("/book/hidden")
	public ResponseEntity<?> bookHiddenPost(@RequestParam Integer id){
		try {
			BookDTO bookDTO = bookService.findById(id);
			bookDTO.setDeleted(true);
			bookService.save(bookDTO);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Hidden ok"));
	}
	
	@PostMapping("/book/active")
	public ResponseEntity<?> bookActivePost(@RequestParam Integer id){
		try {
			BookDTO bookDTO = bookService.findById(id);
			bookDTO.setDeleted(false);
			bookService.save(bookDTO);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Active ok"));
	}
	
	@DeleteMapping("/book/delete")
	public ResponseEntity<?> bookDelete(@RequestParam Integer id){
		try {
			bookService.delete(id);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("success"));
	}
}
