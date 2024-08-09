package com.a2m.library.service.status;

import java.util.List;
import java.util.Optional;

import com.a2m.library.model.Status;

public interface StatusService {
    List<Status> findAll();
    Optional<Status> findById(Integer id);
    Optional<Status> findByName(String name);
    Status save(Status status);
}
