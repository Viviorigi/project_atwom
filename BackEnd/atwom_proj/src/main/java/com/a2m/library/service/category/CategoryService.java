package com.a2m.library.service.category;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.a2m.library.dto.CategoryDTO;
import com.a2m.library.model.Category;

public interface CategoryService {
	List<CategoryDTO> findAll();
    List<CategoryDTO> findAllActive();
    CategoryDTO findById(Integer id);
    void save(CategoryDTO categoryDTO);
    CategoryDTO update(Integer id, CategoryDTO categoryDTO);
    void delete(Integer id);
    CategoryDTO getCategoryByBookId(Integer bookId);
    
    public CategoryDTO convertToCategoryDTO(Category category);
    public Category convertToCategory(CategoryDTO categoryDTO);
    
  //---------------------------------------------
    List<Category> findAllList();
  	public Page<CategoryDTO>findByKeySearch(String keySearch, PageRequest pageRequest);
  	void save(Category category);
}
