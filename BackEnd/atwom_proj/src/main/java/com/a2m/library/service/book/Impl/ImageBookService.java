package com.a2m.library.service.book.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.library.model.ImagesBook;
import com.a2m.library.repository.ImagesBookRepository;

@Service
public class ImageBookService {
	@Autowired
	ImagesBookRepository imagesBookRepository;
	
	public void save(ImagesBook imagesBook) {
		imagesBookRepository.save(imagesBook);
	}
}
