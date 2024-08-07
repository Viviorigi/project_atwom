package com.a2m.library.service.student;

import java.time.LocalDateTime;
import java.util.UUID;

import org.apache.coyote.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a2m.library.constant.RoleEnum;
import com.a2m.library.dto.UserDTO;
import com.a2m.library.model.User;
import com.a2m.library.model.UserRole;
import com.a2m.library.model.VerificationToken;
import com.a2m.library.repository.UserRepository;
import com.a2m.library.repository.UserRoleRepository;
import com.a2m.library.repository.VerificationTokenRepository;
import com.a2m.library.service.admin.EmailService;
import com.a2m.library.service.admin.Impl.UserServiceImpl;

@Service
public class StudentService {
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserRoleRepository userRoleRepository;

	@Autowired
	private VerificationTokenRepository tokenRepository;

	@Autowired
	private EmailService emailService;
	
	@Transactional(rollbackFor = Exception.class)
	public void register(UserDTO userDTO) throws Exception {
		if (userRepository.existsByUsername(userDTO.getUsername())) {
			throw new BadRequestException("Username already exists");
		}

		if (userRepository.existsByEmail(userDTO.getEmail())) {
			throw new BadRequestException("Email already exists");
		}

		User user = new User();
//		user.setUserUid(this.getSeq("seq_user_uid"));
		user.setUsername(userDTO.getUsername());
		user.setEmail(userDTO.getEmail());
		user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		user.setFullName(userDTO.getFullName());
		user.setClassName(userDTO.getClassName());
		user.setAddress(userDTO.getAddress());
		user.setPhone(userDTO.getPhone());
		user.setAvatar(userDTO.getAvatar());
		user.setDob(userDTO.getDob());
		user.setCre_dt(LocalDateTime.now());
		user.setUpd_dt(LocalDateTime.now());
		user.setActive(false);
		userRepository.save(user);
		UserRole userRole = new UserRole();
		userRole.setRoleId(RoleEnum.STUDENT_USER.getValue());
		userRole.setUserUid(user.getUserUid());

		userRoleRepository.save(userRole);

		String token = UUID.randomUUID().toString();
		VerificationToken verificationToken = new VerificationToken();
		verificationToken.setToken(token);
		verificationToken.setUser(user);
		verificationToken.setExpiryDate(LocalDateTime.now().plusHours(24));

		tokenRepository.save(verificationToken);

		String verificationUrl = "http://localhost:8080/api/admin/verify?token=" + token;
		emailService.sendEmail(user.getEmail(), "Verify your email",
				"Click the link to verify your email: " + verificationUrl);
	}
}
