package com.a2m.library.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long userUid;
	@NotEmpty(message = "Username must not be empty")
	@Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
	private String username;
//	@JsonIgnore
	@NotEmpty(message = "Password must not be empty")
	@Size(min = 6, message = "Password must be at least 6 characters")
	private String password;
	@NotEmpty(message = "Email must not be empty")
	private String email;
	private String fullName;
	private String className;
	private String phone;
	private LocalDateTime dob;
	private String address;
	private String avatar;
	@JsonProperty("isActive")
	private boolean isActive;
	private LocalDateTime cre_dt;
	private LocalDateTime upd_dt;
}
