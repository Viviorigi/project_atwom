package com.a2m.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.a2m.library.model.UserRole;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long>{

}
