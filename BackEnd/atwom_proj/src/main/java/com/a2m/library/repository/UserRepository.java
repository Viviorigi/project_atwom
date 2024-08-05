package com.a2m.library.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.a2m.library.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByUsername(String username);

	boolean existsByUsername(String username);

	boolean existsByEmail(String email);

	Optional<User> findByUserUid(Long userUid);

	@Query("SELECT u FROM User u WHERE u.deleted = false")
	List<User> findAllActiveUsers();
}
