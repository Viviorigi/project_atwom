package com.a2m.library.service.admin.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.a2m.library.service.admin.EmailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

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

	@Override
	public void SendEmailVerificationUrl(String to, String subject, String verificationUrl) throws MessagingException {
		String htmlContent = "<!DOCTYPE html>" + "<html lang='en'>" + "<head>" + "<meta charset='UTF-8'>"
				+ "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
				+ "<title>Email Verification</title>" + "<style>"
				+ "body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0; }"
				+ ".container { width: 100%; max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }"
				+ ".header { background-color: #007bff; color: #fff; padding: 20px; text-align: center; }"
				+ ".header h1 { margin: 0; }" + ".content { padding: 20px; text-align: center; }"
				+ ".content p { font-size: 16px; line-height: 1.5; }"
				+ ".btn { display: inline-block; padding: 10px 20px; margin-top: 20px; font-size: 16px; color: #007bff; background-color: #fff; border: 2px solid #007bff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s, color 0.3s; }"
				+ ".btn:hover { background-color: #007bff; color: #fff; }"
				+ ".footer { background-color: #f1f1f1; color: #777; padding: 10px; text-align: center; font-size: 14px; }"
				+ "</style>" + "</head>" + "<body>" + "<div class='container'>" + "<div class='header'>"
				+ "<h1>Account Verification</h1>" + "</div>" + "<div class='content'>" + "<p>Hello,</p>"
				+ "<p>Thank you for registering. Please click the link below to verify your email address and complete your registration:</p>"
				+ "<a href='" + verificationUrl + "' class='btn'>Verify Your Email</a>"
				+ "<p>If you did not register for this account, please ignore this email.</p>" + "</div>"
				+ "<div class='footer'>" + "<p>&copy; 2024 Atwom Library. All rights reserved.</p>" + "</div>"
				+ "</div>" + "</body>" + "</html>";

		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		helper.setTo(to);
		helper.setSubject(subject);
		helper.setText(htmlContent, true); // Set to true to send HTML

		mailSender.send(message);
	}

	@Override
	public void sendPasswordResetRequestEmail(String to, String subject, String resetLink) {
		String htmlContent = "<!DOCTYPE html>" + "<html lang='en'>" + "<head>" + "<meta charset='UTF-8'>"
				+ "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
				+ "<title>Password Reset Request</title>" + "<style>"
				+ "body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0; }"
				+ ".container { width: 100%; max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }"
				+ ".header { background-color: #007bff; color: #fff; padding: 20px; text-align: center; }"
				+ ".header h1 { margin: 0; }" + ".content { padding: 20px; text-align: center; }"
				+ ".content p { font-size: 16px; line-height: 1.5; }"
				+ ".btn { display: inline-block; padding: 10px 20px; margin-top: 20px; font-size: 16px; color: #007bff; background-color: #fff; border: 2px solid #007bff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s, color 0.3s; }"
				+ ".btn:hover { background-color: #007bff; color: #fff; }"
				+ ".footer { background-color: #f1f1f1; color: #777; padding: 10px; text-align: center; font-size: 14px; }"
				+ "</style>" + "</head>" + "<body>" + "<div class='container'>" + "<div class='header'>"
				+ "<h1>Password Reset Request</h1>" + "</div>" + "<div class='content'>" + "<p>Hello,</p>"
				+ "<p>You requested a password reset. Click the link below to reset your password:</p>" + "<a href='"
				+ resetLink + "' class='btn'>Reset Password</a>"
				+ "<p>If you did not request a password reset, please ignore this email.</p>"
				+ "<p>This link will expire in 5 minutes.</p>" + "</div>" + "<div class='footer'>"
				+ "<p>&copy; 2024 Atwom Library. All rights reserved.</p>" + "</div>" + "</div>" + "</body>"
				+ "</html>";


		MimeMessage message = mailSender.createMimeMessage();

		try {
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
			helper.setTo(to);
			helper.setSubject(subject);
			helper.setText(htmlContent, true); // true indicates HTML

			mailSender.send(message);
		} catch (MessagingException e) {
			throw new RuntimeException("Failed to send email", e);
		}
	}
}
