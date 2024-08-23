package com.a2m.library.controllers.admin;


import java.time.LocalDateTime;

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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.a2m.library.dto.ContactDTO;
import com.a2m.library.dto.UserDTO;
import com.a2m.library.dto.response.BannerListResponse;
import com.a2m.library.dto.response.ContactListResponse;
import com.a2m.library.dto.response.MessageResponse;
import com.a2m.library.model.Banner;
import com.a2m.library.model.Contact;
import com.a2m.library.model.User;
import com.a2m.library.model.VerificationToken;
import com.a2m.library.service.admin.ContactService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "api/admin")
public class ContactController {
	@Autowired
	private ContactService contactService;
	@Autowired
	private ObjectMapper objectMapper;
	
	@PostMapping("/contact/update")
    public ResponseEntity<?> updateContact(
    		@Valid @RequestBody ContactDTO contact) throws JsonMappingException, JsonProcessingException {

        if (contact == null) {
            return ResponseEntity.notFound().build();
        }

        // Lưu thông tin banner đã cập nhật
        try {
            contactService.update(contact);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }

        return ResponseEntity.ok().body(new MessageResponse("Update successful"));
    }
	
	@PostMapping("/contact/create")
	public ResponseEntity<?> create(@Valid @RequestBody ContactDTO contactJson) throws JsonMappingException, JsonProcessingException {
		try {
			contactService.save(contactJson);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Create successful"));
	}
	
	@GetMapping(value = "/contact/getAll")
	public ResponseEntity<ContactListResponse> getAll(@RequestParam(defaultValue = "") String keySearch,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "1") int limit) {
		PageRequest pageRequest = PageRequest.of(page - 1, limit);
		Page<ContactDTO> bannerPage = contactService.findByContactContaining(keySearch, pageRequest);
		ContactListResponse response = ContactListResponse.builder().contacts(bannerPage.getContent())
				.totalPages(bannerPage.getTotalPages()).totalBanners(bannerPage.getTotalElements()).build();
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping("/contact/delete")
	public ResponseEntity<?> deleteContact(@RequestParam Long id) {
		try {
			contactService.deleteContact(id);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
		return ResponseEntity.ok().body(new MessageResponse("Delete successful"));
	}
}
