package com.a2m.library.service.category.Impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
	public List<Category> findAllList() {
		// TODO Auto-generated method stub
		return categoryRepository.findAll();
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
    public CategoryDTO getCategoryByBookId(Integer bookId) {
        Category category = categoryRepository.findCategoryByBookId(bookId);
        return category != null ? convertToCategoryDTO(category) : null;
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
		categoryDTO.setBooks(convertToListBookDTO(category.getBooks()));
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
	
	public BookDTO convertToBookDTO(Book book) {
		BookDTO bookDTO = new BookDTO();
		bookDTO.setId(book.getId());
		bookDTO.setTitle(book.getTitle());
		bookDTO.setPublisher(book.getPublisher());
		bookDTO.setPublicationYear(book.getPublicationYear());
		bookDTO.setQuantity(book.getQuantity());
		bookDTO.setPrice(book.getPrice());
		bookDTO.setDescription(book.getDescription());
		bookDTO.setImage(book.getImage());
		bookDTO.setActive(book.getActive());
		bookDTO.setUpd_dt(book.getUpd_dt());
		bookDTO.setCre_dt(book.getCre_dt());
		if (book.getCategory() != null) {
	        bookDTO.setCateId(book.getCategory().getId());
	        bookDTO.setCateName(book.getCategory().getName());
	    } else {
	        bookDTO.setCateId(0);
	        bookDTO.setCateName("Unknown");
	    }
		bookDTO.setImagebooks(book.getImagebooks());

		return bookDTO;
	}
	
	public List<BookDTO> convertToListBookDTO(List<Book>book){
		List<BookDTO> bookDTOs = new ArrayList<BookDTO>();
		for(Book it: book) {
			bookDTOs.add(convertToBookDTO(it));
		}
		return bookDTOs;
	}

}
