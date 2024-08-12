package com.a2m.library.service.status;

import com.a2m.library.dto.UserFineDTO;

import java.util.Set;
import java.util.Optional;

public interface UserFineService {
    Set<UserFineDTO> findAll();
    Optional<UserFineDTO> findById(Integer id);
    UserFineDTO save(UserFineDTO userFineDTO);
}
