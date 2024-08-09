package com.a2m.library.service.student;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.a2m.library.model.User;
import com.a2m.library.repository.UserRepository;
import com.a2m.library.service.admin.EmailService;

@Service
public class PasswordResetService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private EmailService emailService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public void sendPasswordResetToken(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("No user found with that email");
        }

        String token = UUID.randomUUID().toString();
        user.setResetPasswordToken(token);
        user.setTokenExpirationDate(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);

        // Send email with reset link
        String resetLink = "http://localhost:8080/api/student/reset-password?token=" + token;
        emailService.sendEmail(email, "Password Reset Request", 
                "To reset your password, click the link below:\n" + resetLink);
    }
	
	//reset new password
	public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetPasswordToken(token);
        if (user == null || user.getTokenExpirationDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Invalid or expired password reset token");
        }
        
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetPasswordToken(null);
        user.setTokenExpirationDate(null);
        userRepository.save(user);
    }
}
