package com.a2m.library.controllers.client;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.library.dto.BookDTO;
import com.a2m.library.dto.CategoryDTO;
import com.a2m.library.model.Book;
import com.a2m.library.service.book.BookService;
import com.a2m.library.service.category.CategoryService;

@RestController
public class BookClientController {
	@Autowired
	BookService bookService;
	@Autowired
	CategoryService categoryService;
	
	@GetMapping("/book/new")
	public ResponseEntity<?> bookGet() {
		List<BookDTO>books = bookService.findAll();
		
		if(books.size() < 5)
			return ResponseEntity.ok().body(books);
		else {
			List<BookDTO> res = new ArrayList<BookDTO>();
			for(int i = 0; i < 5; i++)
				res.add(books.get(i));
			return ResponseEntity.ok().body(res);
		}
	}
	
	@GetMapping("/book/list/all/filter")
	public ResponseEntity<?> bookGetAllList(@RequestParam(value = "keySearch", defaultValue = "") String keySearch) {
		List<BookDTO>books = bookService.findAllActive(keySearch);
		return ResponseEntity.ok().body(books);
	}
	
//	@GetMapping("/book/list/all")
//	public ResponseEntity<?> bookGetAllPage(
//			@RequestParam(value = "page", defaultValue = "1") Integer page,
//            @RequestParam(value = "keySearch", defaultValue = "") String keySearch,
//            @RequestParam("cateId") Integer cateId) {
//		PageRequest pageRequest = PageRequest.of(page - 1, 9, Sort.by("upd_dt").descending());
//		Page<BookDTO> book = bookService.findByKeySearch(keySearch,cateId, pageRequest);
//		return ResponseEntity.ok().body(book);
//	}
	
	@GetMapping("/book/list/all")
	public ResponseEntity<?> bookGetAllPage(
			@RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "keySearch", defaultValue = "") String keySearch,
            @RequestParam(value = "cateName", defaultValue = "") String cateName,
            @RequestParam(value = "publicYear", defaultValue = "0") Integer pubYear,
            @RequestParam(value = "nxb", defaultValue = "") String nxb,
            @RequestParam(value =  "cateId", defaultValue = "0") Integer cateId) {
		PageRequest pageRequest = PageRequest.of(page - 1, 9, Sort.by("upd_dt").descending());
		Page<BookDTO> book = bookService.findByClient(keySearch, cateName, pubYear, nxb, pageRequest);
		return ResponseEntity.ok().body(book);
	}
	
	@GetMapping("/book/detail")
	public ResponseEntity<?> bookDetail(@RequestParam("id") Integer id) {
		BookDTO books = bookService.findById(id);
		return ResponseEntity.ok().body(books);
	}
	
	@GetMapping("/book/similar")
	public ResponseEntity<?> bookSimilar(@RequestParam("id") Integer id) {
		BookDTO books = bookService.findById(id);
		CategoryDTO categoryDTO = categoryService.findById(books.getCateId());
		List<BookDTO> bookSimilar = new ArrayList<BookDTO>();
		bookSimilar = categoryDTO.getBooks();
		if(categoryDTO.getNumOfBook() < 6)
			return ResponseEntity.ok().body(bookSimilar);
		else
			bookSimilar = bookSimilar.subList(0, 5);
		
		return ResponseEntity.ok().body(bookSimilar);
	}
	
	@PostMapping("/book/filter/publisher")
	public ResponseEntity<?> getFilterPublisher(@RequestBody List<BookDTO> bookDTO){
		Set<String>publisher = bookService.getPublisher(bookDTO);
		return ResponseEntity.ok().body(publisher);
	}
	
	@PostMapping("/book/filter/publishYear")
	public ResponseEntity<?> getFilterPublishYear(@RequestBody List<BookDTO> bookDTO){
		Set<Integer>publisher = bookService.getPublicationYears(bookDTO);
		return ResponseEntity.ok().body(publisher);
	}
	
	@PostMapping("/book/filter/cateName")
	public ResponseEntity<?> getFilterCateName(@RequestBody List<BookDTO> bookDTO){
		Set<String>publisher = bookService.getTypeCate(bookDTO);
		return ResponseEntity.ok().body(publisher);
	}
	
	@PostMapping("/book/filter/nxb")
	public ResponseEntity<?> getFilterNxb(@RequestBody List<BookDTO> bookDTO){
		Set<String>publisher = bookService.getNxb(bookDTO);
		return ResponseEntity.ok().body(publisher);
	}
}
