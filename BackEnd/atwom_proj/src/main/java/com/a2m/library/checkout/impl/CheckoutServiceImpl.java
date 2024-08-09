package com.a2m.library.checkout.impl;

import java.util.List; 
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.a2m.library.dto.CheckoutDTO;
import com.a2m.library.service.checkout.CheckoutService;


@Service
public class CheckoutServiceImpl implements CheckoutService  {

	@Override
	public List<CheckoutDTO> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Optional<CheckoutDTO> findById(Integer id) {
		// TODO Auto-generated method stub
		return Optional.empty();
	}

	@Override
	public CheckoutDTO save(CheckoutDTO checkoutDTO) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CheckoutDTO update(Integer id, CheckoutDTO checkoutDTO) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		
	}

}
