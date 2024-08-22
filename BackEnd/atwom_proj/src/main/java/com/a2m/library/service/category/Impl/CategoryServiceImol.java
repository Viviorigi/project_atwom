package com.a2m.library.service.category.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.a2m.library.dto.CategoryDTO;
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
	public Page<CategoryDTO> findByKeySearch(String keySearch, PageRequest pageRequest) {
		// TODO Auto-generated method stub
		Page<Category>cate = categoryRepository.searchCategories(keySearch, pageRequest);
		List<CategoryDTO> categoryDTOs = cate.stream()
                .map(this::convertToCategoryDTO)
                .collect(Collectors.toList());
		return new PageImpl<>(categoryDTOs, pageRequest, cate.getTotalElements());
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
		CategoryDTO categoryDTO = new CategoryDTO();
		categoryDTO.setId(category.getId());
		categoryDTO.setName(category.getName());
		categoryDTO.setDescription(category.getDescription());
		categoryDTO.setActive(category.getActive());
		categoryDTO.setCre_dt(category.getCre_dt());
		categoryDTO.setUpd_dt(category.getUpd_dt());
		categoryDTO.setNumOfBook(category.getBooks().size());
		return categoryDTO;
	}

	@Override
	public Category convertToCategory(CategoryDTO categoryDTO) {
		// TODO Auto-generated method stub
		Category category = new Category();
		category.setId(categoryDTO.getId());
		category.setName(categoryDTO.getName());
		category.setDescription(categoryDTO.getDescription());
		category.setActive(categoryDTO.getActive());
		category.setCre_dt(categoryDTO.getCre_dt());
		category.setUpd_dt(categoryDTO.getUpd_dt());

		return category;
	}

	@Override
	public void save(Category category) {
		// TODO Auto-generated method stub
		categoryRepository.save(category);
		
	}

	@Override
	public List<Category> findAllList() {
		// TODO Auto-generated method stub
		return categoryRepository.findAll();
	}

}
