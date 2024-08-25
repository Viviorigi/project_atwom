package com.a2m.library.controllers.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.library.dto.FeedBackDTO;
import com.a2m.library.service.feedback.FeedBackService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class FeedBackController {
	@Autowired
	FeedBackService feedBackService;

	@PostMapping("/feedback/add")
	public ResponseEntity<?> feedBackAdd(@RequestParam(name = "feedback") String feedBackJson)
			throws JsonMappingException, JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		FeedBackDTO feedBackDTO = objectMapper.readValue(feedBackJson, FeedBackDTO.class);

		try {
			feedBackService.save(feedBackDTO);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		return ResponseEntity.ok().body("success");
	}
}
