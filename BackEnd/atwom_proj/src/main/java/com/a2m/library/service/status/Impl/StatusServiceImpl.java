package com.a2m.library.service.status.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.library.model.Status;
import com.a2m.library.repository.StatusRepository;
import com.a2m.library.service.status.StatusService;

@Service
public class StatusServiceImpl implements StatusService {

    @Autowired
    private StatusRepository statusRepository;

    @Override
    public List<Status> findAll() {
        return statusRepository.findAll();
    }

    @Override
    public Optional<Status> findById(Integer id) {
        return statusRepository.findById(id);
    }

    @Override
    public Optional<Status> findByName(String name) {
        return statusRepository.findByName(name);
    }

    @Override
    public Status save(Status status) {
        if (isProtectedStatus(status)) {
            throw new UnsupportedOperationException("Cannot modify protected status");
        }
        return statusRepository.save(status);
    }

    private boolean isProtectedStatus(Status status) {
        return status.getName().equalsIgnoreCase("REQUESTED") ||
               status.getName().equalsIgnoreCase("APPROVED") ||
               status.getName().equalsIgnoreCase("BORROWED") ||
               status.getName().equalsIgnoreCase("RETURNED") ||
               status.getName().equalsIgnoreCase("REJECTED");
    }
}

