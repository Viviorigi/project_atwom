package com.a2m.library.service.admin;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.a2m.library.dto.UserDTO;
import com.a2m.library.dto.response.UserResponse;
import com.a2m.library.model.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

public interface UserService {
	public String getSeq(String seqName) throws SQLException;

	public void signUp(UserDTO userDTO) throws Exception;

	public UserDTO getByUserUid(Long userUid) throws JsonMappingException, JsonProcessingException;
	
	public UserDTO get_user_by_id(Long userUid);
	public User convertToUser(UserDTO userDTO);

	public Map<String, Object> getByUserUidList(List<String> userUidList)
			throws JsonMappingException, JsonProcessingException;

	public List<UserDTO> getAll();

	public void update(UserDTO userDTO) throws Exception;

	public void deleteUser(Long userUid) throws Exception;

	public UserResponse findByUsername(String username);
	
	Optional<UserResponse> findUserByName(String username);
	
	Page<UserResponse> findByUsernameContaining(String keySearch, PageRequest pageRequest);
}
