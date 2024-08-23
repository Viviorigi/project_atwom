package com.a2m.library.service.status.Impl;

import com.a2m.library.dto.UserFineDTO;
import com.a2m.library.dto.response.ResourceNotFoundException;
import com.a2m.library.model.UserFine;
import com.a2m.library.model.ReturnBook;
import com.a2m.library.repository.UserFineRepository;
import com.a2m.library.repository.ReturnBookRepository;
import com.a2m.library.service.status.UserFineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserFineServiceImpl implements UserFineService {

    @Autowired
    private UserFineRepository userFineRepository;

    @Autowired
    private ReturnBookRepository returnBookRepository;

    @Override
    public Set<UserFineDTO> findAll() {
        return userFineRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toSet());
    }

    @Override
    public Optional<UserFineDTO> findById(Integer id) {
        return userFineRepository.findById(id).map(this::toDTO);
    }

    @Override
    @Transactional
    public UserFineDTO save(UserFineDTO userFineDTO) {
        UserFine userFine = new UserFine();

        // ReturnBook returnBook = returnBookRepository.findById(userFineDTO.getReturnBookId())
        //         .orElseThrow(() -> new ResourceNotFoundException("ReturnBook not found with id " + userFineDTO.getReturnBookId()));

        //userFine.setReturnBook(returnBook);
        userFine.setAmount(userFineDTO.getAmount());

        userFine = userFineRepository.save(userFine);
        return toDTO(userFine);
    }

    // Manual mapping methods
    private UserFineDTO toDTO(UserFine userFine) {
        UserFineDTO dto = new UserFineDTO();
        dto.setId(userFine.getId());
        //dto.setReturnBookId(userFine.getReturnBook().getId());
        dto.setAmount(userFine.getAmount());
        return dto;
    }
}

