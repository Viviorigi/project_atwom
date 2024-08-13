package com.a2m.library.dto.response;

import java.util.List;

import com.a2m.library.dto.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserListResponse {
	private List<UserDTO> users;
	private int totalPages;
	private long totalUsers;
}
