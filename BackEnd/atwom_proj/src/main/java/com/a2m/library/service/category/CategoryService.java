package com.a2m.library.service.category;

import java.util.List;

import com.a2m.library.dto.CategoryDTO;
import com.a2m.library.model.Category;

public interface CategoryService {
	List<CategoryDTO> findAll();
    List<CategoryDTO> findAllActive();
    CategoryDTO findById(Integer id);
    void save(CategoryDTO categoryDTO);
    CategoryDTO update(Integer id, CategoryDTO categoryDTO);
    void delete(Integer id);
    
    public CategoryDTO convertToCategoryDTO(Category category);
    public Category convertToCategory(CategoryDTO categoryDTO);
}
