package com.a2m.library.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
	private String jwt;
//	private Long userUid;
	private String username;
	private String email;
	private String type;
	private List<String> roles;
}
