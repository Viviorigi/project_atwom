package com.a2m.library.controllers.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.library.dto.CategoryDTO;
import com.a2m.library.dto.response.MessageResponse;
import com.a2m.library.model.Book;
import com.a2m.library.model.Category;
import com.a2m.library.service.category.CategoryService;

@RestController
//@RequestMapping(value = "api/admin")
public class CategoryController {
	@Autowired
	CategoryService categoryService;

	@GetMapping("api/categories")
	public ResponseEntity<?> categoryGet() {
		List<CategoryDTO>categoryDTO = categoryService.findAll();
		return ResponseEntity.ok().body(categoryDTO);
	}
	
	@GetMapping("/category/list")
	public ResponseEntity<?> studentGetList(@RequestParam("page") Integer page,
											@RequestParam("keySearch") String keySearch){
		Page<Category>categories = categoryService.findAll(keySearch, page-1 , 5);
		return ResponseEntity.ok().body(categories);
	}
	
//	@PostMapping("/category/add")
//	public ResponseEntity<?> categoryAddPost(@RequestBody CategoryDTO categoryDTO){
//		try {
//			categoryService.save(categoryDTO);
//		} catch (Exception e) {
//			// TODO: handle exception
//			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
//		}
//		return ResponseEntity.ok().body(new MessageResponse("Add ok"));
//	}
	
	@PostMapping("/category/add")
	public ResponseEntity<?> categoryAddList(@RequestBody Category category){
		try {
			categoryService.save(category);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		return ResponseEntity.ok().body("success");
	}
	
	@PostMapping("/category/edit")
	public ResponseEntity<?> bookEditPost(@RequestBody CategoryDTO categoryDTO){
		try {
			categoryService.save(categoryDTO);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Add ok"));
	}
	
	@PostMapping("/category/hidden")
	public ResponseEntity<?> categoryHiddenPost(@RequestParam Integer id){
		try {
			CategoryDTO categoryDTO = categoryService.findById(id);
			categoryDTO.setDeleted(true);
			categoryService.save(categoryDTO);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(new MessageResponse("Hidden failed"));
		}
		return ResponseEntity.ok().body(new MessageResponse("Hidden ok"));
	}
	
	@PostMapping("/category/active")
	public ResponseEntity<?> categoryActivePost(@RequestParam Integer id){
		try {
			CategoryDTO categoryDTO = categoryService.findById(id);
			categoryDTO.setDeleted(false);
			categoryService.save(categoryDTO);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(new MessageResponse("Active failed"));
		}
		return ResponseEntity.ok().body(new MessageResponse("Active ok"));
	}
	
	@DeleteMapping("/category/delete")
	public ResponseEntity<?> bookDelete(@RequestParam Integer id){
		try {
			categoryService.delete(id);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("sucess"));
	}
}
