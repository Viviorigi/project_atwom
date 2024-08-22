package com.a2m.library.service.admin.Impl;

import java.time.LocalDateTime; 
import java.util.List;
import java.util.stream.Collectors;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.a2m.library.dto.CheckoutDTO;
import com.a2m.library.dto.ContactDTO;
import com.a2m.library.dto.UserDTO;
import com.a2m.library.model.Checkout;
import com.a2m.library.model.Contact;
import com.a2m.library.repository.ContactRepository;
import com.a2m.library.service.admin.ContactService;
import com.a2m.library.service.admin.EmailService;

@Service
public class ContactServiceImpl implements ContactService {
	@Autowired
	private ContactRepository contactRepository;
	
	@Autowired
	private EmailService emailService;

	@Override
	public void deleteContact(Long contactId) throws Exception {
		// TODO Auto-generated method stub
		contactRepository.deleteById(contactId);
	}

	@Override
	public void save(ContactDTO contactDTO) {
		// TODO Auto-generated method stub
		Contact c = new Contact();
		c = toEntity(contactDTO);
		c.setCreatedDate(LocalDateTime.now());
		c.setResponseDate(LocalDateTime.now());
		contactRepository.save(c);
	}

	@Override
	public void update(ContactDTO contactDTO) throws Exception {
		// TODO Auto-generated method stub
		Contact contact = contactRepository.findById(contactDTO.getContact_id())
				.orElseThrow(() -> new BadRequestException("User not found"));
		contact.setResponseDate(LocalDateTime.now());
		contact.setResponse(contactDTO.getResponse());
		emailService.sendEmailResponseContact(contact.getEmail(), "Response",contact.getFirstName()+ contact.getLastName(), "http://localhost:3333");
		contactRepository.save(contact);
	}

	@Override
	public Contact findById(Long id) {
		// TODO Auto-generated method stub
		Contact contact = contactRepository.findById(id).get();
		return contact;
	}
	
	

	@Override
	public List<ContactDTO> getAll() {
		// TODO Auto-generated method stub
		return contactRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
	}

	@Override
	public Page<ContactDTO> findByContactContaining(String keySearch, PageRequest pageRequest) {
		// TODO Auto-generated method stub
		Page<Contact> contacts = contactRepository.searchBanners(keySearch, pageRequest);

        // Convert Page<User> to Page<UserDTO>
        List<ContactDTO> contact = contacts.stream().map(this::toDTO)
                                      .collect(Collectors.toList());

        return new PageImpl<>(contact, pageRequest, contacts.getTotalElements());
	}
	
	private ContactDTO toDTO(Contact contact) {
		ContactDTO dto = new ContactDTO();
        dto.setContact_id(contact.getId());
        dto.setEmail(contact.getEmail());
        dto.setFirstName(contact.getFirstName());
        dto.setLastName(contact.getLastName());
        dto.setQuestion(contact.getQuestion());
        dto.setResponse(contact.getResponse());
        dto.setCre_dt(contact.getCreatedDate());
        dto.setUpd_dt(contact.getResponseDate());
        return dto;
    }
	
	private Contact toEntity(ContactDTO dto) {
		Contact contact = new Contact();
		contact.setEmail(dto.getEmail());
		contact.setFirstName(dto.getFirstName());
		contact.setLastName(dto.getLastName());
		contact.setQuestion(dto.getQuestion());
		contact.setResponse(dto.getResponse());
		contact.setCreatedDate(dto.getCre_dt());
        contact.setResponseDate(dto.getUpd_dt());
        return contact;
    }
	
}
