package com.a2m.library.dto.response;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.a2m.library.dto.UserDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
@Data
public class UserResponse {
	private static final long serialVersionUID = 1L;

	private Long userUid;
	private String username;
	@JsonIgnore
	private String password;
	private String email;
	private String fullName;
	private String className;
	private String phone;
	private LocalDate dob;
	private String address;
	private String avatar;
	@JsonProperty("isActive")
	private boolean isActive;
	private LocalDateTime cre_dt;
	private LocalDateTime upd_dt;
	private List<String> roles; 
}

