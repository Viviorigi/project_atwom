package com.a2m.library.service.book.Impl;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.a2m.library.dto.BookDTO;
import com.a2m.library.dto.CategoryDTO;
import com.a2m.library.model.Book;
import com.a2m.library.model.Category;
import com.a2m.library.repository.BookRepository;
import com.a2m.library.repository.FeedBackRepository;
import com.a2m.library.repository.WishlistRepository;
import com.a2m.library.service.book.BookService;
import com.a2m.library.service.category.CategoryService;

@Service
public class BookServiceImpl implements BookService {
	@Autowired
	BookRepository bookRepository;

	@Autowired
	CategoryService categoryService;

	@Autowired
	FeedBackRepository feedBackRepository;
	
	@Autowired
	WishlistRepository wishlistRepository;

	@Override
	public List<BookDTO> findAll() {
		List<Book> books = bookRepository.findAll();
		return books.stream().map(book -> convertToBookDTO(book)).collect(Collectors.toList());
	}

	@Override
	public Page<Book> findAll(String keySearch, int cateId, int page, int size) {
		// TODO Auto-generated method stub
		Pageable pageable = PageRequest.of(page, size);
		if (keySearch != null)
			return bookRepository.findAllBook(keySearch, cateId, pageable);
		return bookRepository.findAll(pageable);
	}

	@Override
	public Page<BookDTO> findByKeySearch(String keySearch, int cateId, PageRequest pageRequest) {
		// TODO Auto-generated method stub
		Page<Book> book = bookRepository.searchBook(keySearch, cateId, pageRequest);
		List<BookDTO> bookDTOs = book.stream().map(this::convertToBookDTO).collect(Collectors.toList());
		return new PageImpl<>(bookDTOs, pageRequest, book.getTotalElements());
	}

	@Override
	public Page<BookDTO> findByClient(String keySearch, String cateName, int pubYear, String nxb,
			PageRequest pageRequest) {
		// TODO Auto-generated method stub
		Page<Book> book = bookRepository.searchBookClient(keySearch, cateName, pubYear, nxb, pageRequest);
		List<BookDTO> bookDTOs = book.stream().map(this::convertToBookDTO).collect(Collectors.toList());
		for (BookDTO it : bookDTOs) {
			it.setAve_rating(feedBackRepository.findAverageRatingByBookId(it.getId()));
		}
		return new PageImpl<>(bookDTOs, pageRequest, book.getTotalElements());
	}

	@Override
	public List<BookDTO> findAllActive(String keySearch) {
		List<Book> books = bookRepository.findAllActiveBooks(keySearch);
		return books.stream().map(book -> convertToBookDTO(book)).collect(Collectors.toList());
	}

//	@Override
//	public BookDTO findById(Integer id) {
//		// TODO Auto-generated method stub
//		Book book = bookRepository.findById(id).get();
//		return convertToBookDTO(book);
//	}

	@Override
	public BookDTO getBookById(Integer id) {
		Optional<Book> optionalBook = bookRepository.findById(id);
		if (optionalBook.isPresent()) {
			Book book = optionalBook.get();
			return convertToBookDTO(book);
		} else {
			throw new RuntimeException("Book not found with id: " + id);
		}
	}

	@Override
	public BookDTO findById(Integer id) {
		// TODO Auto-generated method stub
		BookDTO book = convertToBookDTO(bookRepository.findById(id).get());
		return book;
	}

	@Override
	public Book save(BookDTO bookDTO) {
		return bookRepository.save(convertToBook(bookDTO));
	}

//	@Override
//	public void save(Book book) {
//		// TODO Auto-generated method stub
//		bookRepository.save(book);
//	}

	@Override
	public BookDTO update(Integer id, BookDTO bookDTO) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		bookRepository.deleteById(id);
	}

	@Override
	public BookDTO convertToBookDTO(Book book) {
		BookDTO bookDTO = new BookDTO();
		bookDTO.setId(book.getId());
		bookDTO.setTitle(book.getTitle());
		bookDTO.setPublisher(book.getPublisher());
		bookDTO.setPublicationYear(book.getPublicationYear());
		bookDTO.setQuantity(book.getQuantity());
		bookDTO.setPrice(book.getPrice());
		bookDTO.setDescription(book.getDescription());
		bookDTO.setNxb(book.getNxb());
		bookDTO.setImage(book.getImage());
		bookDTO.setActive(book.getActive());
		bookDTO.setUpd_dt(book.getUpd_dt());
		bookDTO.setCre_dt(book.getCre_dt());
		if (book.getCategory() != null) {
			bookDTO.setCateId(book.getCategory().getId());
			bookDTO.setCateName(book.getCategory().getName());
		} else {
			// Nếu category là null, bạn có thể thiết lập giá trị mặc định hoặc để trống
			bookDTO.setCateId(0);
			bookDTO.setCateName("Unknown");
		}
		bookDTO.setImagebooks(book.getImagebooks());
		if (feedBackRepository.findAverageRatingByBookId(book.getId()) != null)
			bookDTO.setAve_rating(feedBackRepository.findAverageRatingByBookId(book.getId()));

		return bookDTO;
	}

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
	public Book convertToBook(BookDTO bookDTO) {
		CategoryDTO category = categoryService.findById(bookDTO.getCateId());
		Book book = new Book();
		book.setId(bookDTO.getId());
		book.setTitle(bookDTO.getTitle());
		book.setPublisher(bookDTO.getPublisher());
		book.setPublicationYear(bookDTO.getPublicationYear());
		book.setQuantity(bookDTO.getQuantity());
		book.setPrice(bookDTO.getPrice());
		book.setDescription(bookDTO.getDescription());
		book.setNxb(bookDTO.getNxb());
		book.setImage(bookDTO.getImage());
		book.setActive(bookDTO.getActive());
		book.setUpd_dt(bookDTO.getUpd_dt());
		book.setCre_dt(bookDTO.getCre_dt());
		book.setCategory(convertToCategory(category));
		return book;
	}

	@Override
	public List<Book> findAllActiveNew() {
		// TODO Auto-generated method stub
		return bookRepository.findAllActiveBooksSortedByCreatedDate();
	}

	@Override
	public Set<String> getPublisher(List<BookDTO> bookDTO) {
		// TODO Auto-generated method stub
		Set<String> res = new TreeSet<String>();
		for (BookDTO it : bookDTO)
			res.add(it.getPublisher());
		return res;
	}

	@Override
	public Set<Integer> getPublicationYears(List<BookDTO> bookDTO) {
		// TODO Auto-generated method stub
		Set<Integer> res = new TreeSet<Integer>();
		for (BookDTO it : bookDTO)
			res.add(it.getPublicationYear());
		return res;
	}

	@Override
	public Set<String> getTypeCate(List<BookDTO> bookDTO) {
		// TODO Auto-generated method stub
		Set<String> res = new TreeSet<String>();
		for (BookDTO it : bookDTO)
			res.add(it.getCateName());
		return res;
	}

	@Override
	public Set<String> getNxb(List<BookDTO> bookDTO) {
		// TODO Auto-generated method stub
		Set<String> res = new TreeSet<String>();
		for (BookDTO it : bookDTO)
			if (it.getNxb() != null)
				res.add(it.getNxb());
		return res;
	}

	@Override
	public long getCountBooksAddedToday() {
		// TODO Auto-generated method stub
		return bookRepository.countBooksAddedToday();
	}

	@Override
	public List<BookDTO> bookLove() {
		// TODO Auto-generated method stub
		List<Book> love = wishlistRepository.findTop5MostLikedBooks();
		return love.stream().map(book -> convertToBookDTO(book)).collect(Collectors.toList());
//		return null;
	}

}