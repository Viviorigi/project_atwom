package com.a2m.library.controllers.admin;

import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.a2m.library.config.FileUploadConfig;
import com.a2m.library.dto.BookDTO;
import com.a2m.library.dto.CategoryDTO;
import com.a2m.library.dto.response.MessageResponse;
import com.a2m.library.model.Book;
import com.a2m.library.model.Category;
import com.a2m.library.model.ImagesBook;
import com.a2m.library.service.admin.UserService;
import com.a2m.library.service.book.BookService;
import com.a2m.library.service.book.Impl.ImageBookService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.io.IOException;
import jakarta.servlet.http.HttpServletResponse;

@RestController
//@RequestMapping(value = "api/book")
public class BookController {
	@Autowired
	BookService bookService;
	
	@Autowired
	ImageBookService imageBookService;
	
	private final ObjectMapper objectMapper;
	private final Path resourcePath;
	private final Path resourcePathThumb;


	@Value("${file.upload-dir}")
	private String uploadDir;

	public BookController(BookService bookService, ObjectMapper objectMapper, FileUploadConfig fileUploadConfig) {
		this.bookService = bookService;
		this.objectMapper = objectMapper;
		this.resourcePath = fileUploadConfig.getResourcePath();
		this.resourcePathThumb = fileUploadConfig.getResourcePathThumb();
	}

//	@GetMapping("/book/list")
//	public ResponseEntity<?> bookGet() {
//		List<BookDTO>books = bookService.findAllActive();
//		return ResponseEntity.ok().body(books);
//	}

//	@GetMapping("/book/list")
//	public ResponseEntity<?> studentGetList(@RequestParam("page") Integer page,
//			@RequestParam("keySearch") String keySearch, @RequestParam("cateId") Integer cateId) {
//		Page<Book> books = bookService.findAll(keySearch, cateId, page - 1, 5);
//		return ResponseEntity.ok().body(books);
//	}
	
	@GetMapping("/book/list")
	public ResponseEntity<?> bookGetList(@RequestParam("page") Integer page,
											@RequestParam("keySearch") String keySearch,@RequestParam("cateId") Integer cateId){
		PageRequest pageRequest = PageRequest.of(page - 1, 5, Sort.by("upd_dt").descending());
		Page<BookDTO> book = bookService.findByKeySearch(keySearch,cateId, pageRequest);
		return ResponseEntity.ok().body(book);
	}

//	@GetMapping("/book/getCate")
//	public Category getCate(@RequestParam("id") Integer id) {
//		Book book = bookService.findById(id);
//		return book.getCategory();
//	}

	@PostMapping("/book/add")
	public ResponseEntity<?> studentAddList(@RequestParam("book") String bookJson,
			@RequestParam(required = false) MultipartFile file,
			@RequestParam(value = "images[]", required = false) MultipartFile[] images)
			throws JsonMappingException, JsonProcessingException {
		BookDTO book;
		book = objectMapper.readValue(bookJson, BookDTO.class);
		if (file != null && !file.isEmpty()) {
			try {
				String originalFilename = file.getOriginalFilename();
				String timestamp = String.valueOf(System.currentTimeMillis());
				String newFilename = timestamp + "_" + originalFilename;


				Path filePath = resourcePath.resolve(newFilename);

				Files.write(filePath, file.getBytes());
				
				book.setImage(newFilename);
				System.out.println("đã lưu ảnh");
			} catch (Exception e) {
				System.out.println("Lỗi tải ảnh");
				e.printStackTrace();
				return ResponseEntity.badRequest().body(new MessageResponse("File upload failed"));
			}
		}
		
		List<String> imageName = new ArrayList<String>();
		if(images != null) {
			System.err.println("đã nhận");
		}else {
			System.err.println("chưa nhận");
		}
		//lưu ảnh phụ
		if (images != null && images.length > 0) {
	        for (MultipartFile image : images) {
	            if (!image.isEmpty()) {
	                try {
	                    String originalFilename = image.getOriginalFilename();
	                    String timestamp = String.valueOf(System.currentTimeMillis());
	                    String newFilename = timestamp + "_" + originalFilename;
	                    Path filePath = resourcePath.resolve(newFilename);                    
	                    Files.write(filePath, image.getBytes());
	                    imageName.add(newFilename);
	                    System.out.println("Đã lưu ảnh phụ: " + newFilename);

	                    // Nếu bạn cần lưu thông tin về ảnh phụ vào `book` hoặc một cấu trúc khác
	                    // bạn có thể thêm mã ở đây để lưu trữ thông tin về ảnh phụ

	                } catch (Exception e) {
	                    System.out.println("Lỗi tải ảnh phụ");
	                    e.printStackTrace();
	                    return ResponseEntity.badRequest().body(new MessageResponse("File upload failed"));
	                }
	            }
	        }
	    }
		
		try {
			 Book booksave =  bookService.save(book);
			for(String it: imageName) {
				ImagesBook imagesBook = new ImagesBook();
				imagesBook.setFilename(it);
				imagesBook.setBook(booksave);
				imageBookService.save(imagesBook);
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(e.getMessage());
		}

		return ResponseEntity.ok().body("success");
	}
	
	@GetMapping("/getImage")
	public void getImage(@RequestParam String atchFleSeqNm, 
	                     HttpServletResponse httpServletResponse) {
	    try {
	        Path targetLocation = resourcePath.resolve(atchFleSeqNm);

	        httpServletResponse.setContentType(Files.probeContentType(targetLocation));

	        try (InputStream inputStream = Files.newInputStream(targetLocation);
	             OutputStream outputStream = httpServletResponse.getOutputStream()) {
	            byte[] buffer = new byte[8192];
	            int bytesRead;
	            while ((bytesRead = inputStream.read(buffer)) != -1) {
	                outputStream.write(buffer, 0, bytesRead);
	            }
	        }
	    } catch (Exception e) {
	        e.printStackTrace(); // Consider replacing with proper logging
	        httpServletResponse.setStatus(HttpServletResponse.SC_NOT_FOUND);
	    }
	}

	@PostMapping("/book/edit")
	public ResponseEntity<?> bookEditPost(@RequestBody BookDTO bookDTO) {
		try {
			bookService.save(bookDTO);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Add ok"));
	}

	@DeleteMapping("/book/delete")
	public ResponseEntity<?> bookDelete(@RequestParam Integer id) {
		try {
			bookService.delete(id);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("success"));
	}
}
