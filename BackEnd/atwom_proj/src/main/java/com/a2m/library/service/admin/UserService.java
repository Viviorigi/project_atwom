package com.a2m.library.service.admin;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.a2m.library.dto.UserDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

public interface UserService {
	public String getSeq(String seqName) throws SQLException;

	public void signUp(UserDTO userDTO) throws Exception;

	public UserDTO getByUserUid(Long userUid) throws JsonMappingException, JsonProcessingException;

	public Map<String, Object> getByUserUidList(List<String> userUidList)
			throws JsonMappingException, JsonProcessingException;

	public List<UserDTO> getAll();
	
	public void update(UserDTO userDTO) throws Exception;
	
	 public void deleteUser(Long userUid) throws Exception;
}
