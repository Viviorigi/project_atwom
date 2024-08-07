package com.a2m.library.controllers.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.a2m.library.dto.BookDTO;
import com.a2m.library.dto.CategoryDTO;
import com.a2m.library.dto.response.MessageResponse;
import com.a2m.library.service.category.CategoryService;

@Controller
public class CategoryController {
	@Autowired
	CategoryService categoryService;

	@GetMapping("/category/list")
	public ResponseEntity<?> categoryGet() {
		List<CategoryDTO>categoryDTOs = categoryService.findAllActive();
		return ResponseEntity.ok().body(categoryDTOs);
	}
	
	@PostMapping("category/add")
	public ResponseEntity<?> categoryAddPost(@RequestBody CategoryDTO categoryDTO){
		try {
			categoryService.save(categoryDTO);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Add ok"));
	}
	
	@PostMapping("category/edit")
	public ResponseEntity<?> bookEditPost(@RequestBody CategoryDTO categoryDTO){
		try {
			categoryService.save(categoryDTO);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Add ok"));
	}
	
	@DeleteMapping("category/delete")
	public ResponseEntity<?> bookDelete(@RequestParam Integer id){
		try {
			categoryService.delete(id);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Delete ok"));
	}
}
