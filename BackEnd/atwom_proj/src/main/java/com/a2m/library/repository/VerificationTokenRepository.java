package com.a2m.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.a2m.library.model.VerificationToken;
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
	 VerificationToken findByToken(String token);
}
