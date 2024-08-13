package com.a2m.library.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.a2m.library.dto.UserDTO;
import com.a2m.library.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByUsername(String username);

	boolean existsByUsername(String username);

	boolean existsByEmail(String email);

	Optional<User> findByUserUid(Long userUid);

	@Query("SELECT u FROM User u WHERE u.deleted = false")
	List<User> findAllActiveUsers();

	User findByEmail(String email);

	User findByResetPasswordToken(String resetPasswordToken);

	@Query("SELECT u FROM User u WHERE " +
		       "(u.username LIKE %:keyword% OR " +
		       "u.email LIKE %:keyword% OR " +
		       "u.fullName LIKE %:keyword%) AND " +
		       "u.deleted = false")
	    Page<User> searchUsers(@Param("keyword") String keyword, Pageable pageable);
}
