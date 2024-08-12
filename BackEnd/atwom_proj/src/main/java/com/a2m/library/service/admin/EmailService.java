package com.a2m.library.service.admin;

import jakarta.mail.MessagingException;

public interface EmailService {
	void sendEmail(String to, String subject, String text);
	void SendEmailVerificationUrl(String to, String subject, String verificationUrl) throws MessagingException;
	void sendPasswordResetRequestEmail(String to, String subject, String resetLink);
}
