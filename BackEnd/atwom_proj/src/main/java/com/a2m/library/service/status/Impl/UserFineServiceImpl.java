package com.a2m.library.service.status.Impl;

import com.a2m.library.dto.UserFineDTO;
import com.a2m.library.dto.response.ResourceNotFoundException;
import com.a2m.library.model.UserFine;
import com.a2m.library.model.Checkout;
import com.a2m.library.repository.UserFineRepository;
import com.a2m.library.repository.CheckoutRepository;
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
    private CheckoutRepository CheckoutRepository;

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

        Checkout Checkout = CheckoutRepository.findById(userFineDTO.getCheckoutId())
                .orElseThrow(() -> new ResourceNotFoundException("Checkout not found with id " + userFineDTO.getCheckoutId()));

        userFine.setCheckout(Checkout);
        userFine.setAmount(userFineDTO.getAmount());

        userFine = userFineRepository.save(userFine);
        return toDTO(userFine);
    }

    @Override
    public UserFineDTO getUserFineByCheckoutId(Integer checkoutId) {
        Checkout checkout = CheckoutRepository.findById(checkoutId)
                .orElseThrow(() -> new ResourceNotFoundException("Checkout not found with id " + checkoutId));

        UserFine userFine = userFineRepository.findByCheckout(checkout)
                .orElseThrow(() -> new ResourceNotFoundException("UserFine not found for checkout id " + checkoutId));

        return toDTO(userFine);
    }

    @Override
    @Transactional
    public UserFineDTO updateAmount(Integer id, Double amount) {
        UserFine userFine = userFineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("UserFine not found with id " + id));

        userFine.setAmount(amount);
        userFine = userFineRepository.save(userFine);

        return toDTO(userFine);
    }

    private UserFineDTO toDTO(UserFine userFine) {
        UserFineDTO dto = new UserFineDTO();
        dto.setId(userFine.getId());
        dto.setCheckoutId(userFine.getCheckout().getId());
        dto.setAmount(userFine.getAmount());
        return dto;
    }
}

