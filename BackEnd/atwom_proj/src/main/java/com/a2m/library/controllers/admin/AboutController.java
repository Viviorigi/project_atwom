package com.a2m.library.controllers.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.library.dto.AboutDTO;
import com.a2m.library.dto.ContactDTO;
import com.a2m.library.dto.response.AboutListResponse;
import com.a2m.library.dto.response.ContactListResponse;
import com.a2m.library.dto.response.MessageResponse;
import com.a2m.library.service.admin.AboutService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "api/admin")
public class AboutController {
	@Autowired
	private AboutService aboutService;
	
	@PostMapping("/about/update")
    public ResponseEntity<?> updateContact(
    		@Valid @RequestBody AboutDTO about) throws JsonMappingException, JsonProcessingException {

        if (about == null) {
            return ResponseEntity.notFound().build();
        }

        // Lưu thông tin banner đã cập nhật
        try {
        	aboutService.update(about);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }

        return ResponseEntity.ok().body(new MessageResponse("Update successful"));
    }
	
	@PostMapping("/about/create")
	public ResponseEntity<?> create(@Valid @RequestBody AboutDTO aboutDTO) throws JsonMappingException, JsonProcessingException {
		try {
			aboutService.save(aboutDTO);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Create successful"));
	}
	
	@GetMapping(value = "/about/getAll")
	public ResponseEntity<AboutListResponse> getAll(@RequestParam(defaultValue = "") String keySearch,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "1") int limit) {
		PageRequest pageRequest = PageRequest.of(page - 1, limit);
		Page<AboutDTO> aboutPage = aboutService.findByAboutContaining(keySearch, pageRequest);
		AboutListResponse response = AboutListResponse.builder().abouts(aboutPage.getContent())
				.totalPages(aboutPage.getTotalPages()).totalBanners(aboutPage.getTotalElements()).build();
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping("/about/delete")
	public ResponseEntity<?> deleteContact(@RequestParam Long id) {
		try {
			aboutService.deleteAbout(id);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Delete successful"));
	}
}
