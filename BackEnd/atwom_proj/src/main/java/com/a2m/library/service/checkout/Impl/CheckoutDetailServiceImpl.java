package com.a2m.library.service.checkout.Impl;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a2m.library.dto.CheckoutDetailDTO;
import com.a2m.library.dto.response.ResourceNotFoundException;
import com.a2m.library.model.CheckoutDetail;
import com.a2m.library.repository.CheckoutDetailRepository;
import com.a2m.library.service.checkout.CheckoutDetailMapper;
import com.a2m.library.service.checkout.CheckoutDetailService;

@Service
public class CheckoutDetailServiceImpl implements CheckoutDetailService {

    @Autowired
    private CheckoutDetailRepository checkoutDetailRepository;

    @Autowired
    private CheckoutDetailMapper checkoutDetailMapper;

    @Override
    public Set<CheckoutDetailDTO> findAll() {
        return checkoutDetailRepository.findAll().stream()
                                       .map(checkoutDetailMapper::toDTO)
                                       .collect(Collectors.toSet());
    }

    @Override
    public Optional<CheckoutDetailDTO> findById(Integer id) {
        return checkoutDetailRepository.findById(id).map(checkoutDetailMapper::toDTO);
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        if (!checkoutDetailRepository.existsById(id)) {
            throw new ResourceNotFoundException("CheckoutDetail not found with id " + id);
        }
        checkoutDetailRepository.deleteById(id);
    }
}

