package com.a2m.library.service.admin.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.a2m.library.service.admin.EmailService;

@Service
public class EmailServiceImpl implements EmailService {
	
	@Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;
	
	@Override
	public void sendEmail(String to, String subject, String text) {
		SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
	}

}
