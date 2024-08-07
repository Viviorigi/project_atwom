package com.a2m.library.service.admin;

public interface EmailService {
	void sendEmail(String to, String subject, String text);
}
