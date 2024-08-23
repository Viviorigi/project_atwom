package com.a2m.library.service.admin;

import java.util.List; 

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.a2m.library.dto.ContactDTO;
import com.a2m.library.model.Contact;


public interface ContactService {
	public void deleteContact(Long contactId) throws Exception;
	
	public void save(ContactDTO contact);
	public void update(ContactDTO contact) throws Exception;
	
	Contact findById(Long id);
	
	public List<ContactDTO> getAll();
	
	Page<ContactDTO> findByContactContaining(String keySearch, PageRequest pageRequest);
}
