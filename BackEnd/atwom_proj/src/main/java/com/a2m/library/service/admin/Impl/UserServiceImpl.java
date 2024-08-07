package com.a2m.library.service.admin.Impl;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

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
import com.a2m.library.service.admin.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@Service
public class UserServiceImpl implements UserService {
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

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void signUp(UserDTO userDTO) throws Exception {
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

//		String token = UUID.randomUUID().toString();
//		VerificationToken verificationToken = new VerificationToken();
//		verificationToken.setToken(token);
//		verificationToken.setUser(user);
//		verificationToken.setExpiryDate(LocalDateTime.now().plusHours(24));
//
//		tokenRepository.save(verificationToken);
//
//		String verificationUrl = "http://localhost:8080/api/admin/verify?token=" + token;
//		emailService.sendEmail(user.getEmail(), "Verify your email",
//				"Click the link to verify your email: " + verificationUrl);
	}

	@Override
	public String getSeq(String seqName) throws SQLException {
//		userRepository.setSeq(seqName);
//		return userRepository.getSeq();
		return null;
	}

	public UserDTO getByUserUid(Long userUid) throws JsonMappingException, JsonProcessingException {
		User user = userRepository.findByUserUid(userUid).get();
		UserDTO userDTO = convertToUserDTO(user);
		return userDTO;
	}

	public Map<String, Object> getByUserUidList(List<String> userUidList)
			throws JsonMappingException, JsonProcessingException {
		Map<String, Object> result = new HashMap<>();
//		for (String userUid : userUidList) {
//			result.put(userUid, getByUserUid(userUid));
//		}

		return result;
	}

	public List<UserDTO> getAll() {
		List<User> users = userRepository.findAllActiveUsers();
		return users.stream().map(user -> convertToUserDTO(user)).collect(Collectors.toList());
	}

	public UserDTO convertToUserDTO(User user) {
		UserDTO userDTO = new UserDTO();
		userDTO.setAddress(user.getAddress());
		userDTO.setPassword(user.getPassword());
		userDTO.setPhone(user.getPhone());
		userDTO.setCre_dt(user.getCre_dt());
		userDTO.setDob(user.getDob());
		userDTO.setEmail(user.getEmail());
		userDTO.setFullName(user.getFullName());
		userDTO.setClassName(user.getClassName());
		userDTO.setAvatar(user.getAvatar());
		userDTO.setUsername(user.getUsername());
		userDTO.setUserUid(user.getUserUid());
		userDTO.setUpd_dt(user.getUpd_dt());

		return userDTO;
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void update(UserDTO userDTO) throws Exception {
		User user = userRepository.findByUserUid(userDTO.getUserUid())
				.orElseThrow(() -> new BadRequestException("User not found"));

		if (userRepository.existsByUsername(userDTO.getUsername())
				&& !user.getUsername().equals(userDTO.getUsername())) {
			throw new BadRequestException("Username already exists");
		}

		if (userRepository.existsByEmail(userDTO.getEmail()) && !user.getEmail().equals(userDTO.getEmail())) {
			throw new BadRequestException("Email already exists");
		}

		user.setUsername(userDTO.getUsername());
		user.setEmail(userDTO.getEmail());
		if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
			user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		}
		user.setFullName(userDTO.getFullName());
		user.setClassName(userDTO.getClassName());
		user.setAddress(userDTO.getAddress());
		user.setPhone(userDTO.getPhone());
		if (userDTO.getAvatar() != null) {
			user.setAvatar(userDTO.getAvatar());
		}
//		System.out.println(userDTO.isActive());
		user.setActive(userDTO.isActive());
		user.setDob(userDTO.getDob());
		user.setUpd_dt(LocalDateTime.now());

		userRepository.save(user);

	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void deleteUser(Long userUid) throws Exception {
		User user = userRepository.findByUserUid(userUid).orElseThrow(() -> new BadRequestException("User not found"));

		user.setDeleted(true);
		user.setUpd_dt(LocalDateTime.now());

		userRepository.save(user);
	}
	
	@Override
	public UserDTO findByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return convertToUserDTO(user.get());
    }
}
