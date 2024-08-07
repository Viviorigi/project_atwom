package com.a2m.library.service.category.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.library.dto.BookDTO;
import com.a2m.library.dto.CategoryDTO;
import com.a2m.library.model.Book;
import com.a2m.library.model.Category;
import com.a2m.library.repository.CategoryRepository;
import com.a2m.library.service.category.CategoryService;

@Service
public class CategoryServiceImol implements CategoryService{
	@Autowired
	CategoryRepository categoryRepository;

	@Override
	public List<CategoryDTO> findAll() {
		List<Category>categories = categoryRepository.findAll();
		return categories.stream().map(category -> convertToCategoryDTO(category)).collect(Collectors.toList());
	}

	@Override
	public List<CategoryDTO> findAllActive() {
		List<Category>categories = categoryRepository.findAllActiveCategories();
		return categories.stream().map(category -> convertToCategoryDTO(category)).collect(Collectors.toList());
	}

	@Override
	public CategoryDTO findById(Integer id) {
		// TODO Auto-generated method stub
		Category category = categoryRepository.findById(id).get();
		return convertToCategoryDTO(category);
	}

	@Override
	public void save(CategoryDTO categoryDTO) {
		// TODO Auto-generated method stub
		categoryRepository.save(convertToCategory(categoryDTO));
	}

	@Override
	public CategoryDTO update(Integer id, CategoryDTO categoryDTO) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		categoryRepository.deleteById(id);
		
	}

	@Override
	public CategoryDTO convertToCategoryDTO(Category category) {
		// TODO Auto-generated method stub
		ModelMapper modelMapper = new ModelMapper();

		return modelMapper.map(category, CategoryDTO.class);
	}

	@Override
	public Category convertToCategory(CategoryDTO categoryDTO) {
		// TODO Auto-generated method stub
		ModelMapper modelMapper = new ModelMapper();

		return modelMapper.map(categoryDTO, Category.class);
	}

}
