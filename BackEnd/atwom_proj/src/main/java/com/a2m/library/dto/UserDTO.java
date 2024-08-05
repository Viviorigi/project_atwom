package com.a2m.library.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class UserDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long userUid;
	private String username;
//	@JsonIgnore
	private String password;
	private String email;
	private String fullName;
	private String className;
	private String phone;
	private LocalDateTime dob;
	private String address;
	private String avatar;
	private LocalDateTime cre_dt;
	private LocalDateTime upd_dt;
}
