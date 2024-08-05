package com.a2m.library.config;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.a2m.library.constant.RoleEnum;
import com.a2m.library.model.User;
import com.a2m.library.model.UserRole;
import com.a2m.library.repository.UserRepository;
import com.a2m.library.repository.UserRoleRepository;

@Configuration
public class DataInitializer {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserRoleRepository userRoleRepository;
	
	@Bean
    CommandLineRunner init() {
        return args -> {
            if (!userRepository.existsByUsername("admin")) {
                User adminUser = new User();
                adminUser.setUsername("admin");
                adminUser.setEmail("admin@gmail.com");
                adminUser.setPassword(passwordEncoder.encode("admin"));
                adminUser.setFullName("Admin User");
                adminUser.setClassName(null);
                adminUser.setAddress(null);
                adminUser.setPhone("0000000000");
                adminUser.setDob(LocalDateTime.of(2000, 1, 1, 0, 0));
                adminUser.setCre_dt(LocalDateTime.now());
                adminUser.setUpd_dt(LocalDateTime.now());
                adminUser.setDeleted(false);

                userRepository.save(adminUser);

                UserRole adminRole = new UserRole();
                adminRole.setRoleId(RoleEnum.ADMIN_USER.getValue());
                adminRole.setUserUid(adminUser.getUserUid());

                userRoleRepository.save(adminRole);
            }
        };
    }
}