package com.a2m.library.service.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a2m.library.model.Book;
import com.a2m.library.model.User;
import com.a2m.library.model.WishList;
import com.a2m.library.repository.BookRepository;
import com.a2m.library.repository.UserRepository;
import com.a2m.library.repository.WishlistRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;

@Service
public class WishlistService {
	@Autowired
	private WishlistRepository wishlistRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BookRepository bookRepository;

	public List<WishList> getUserWishList(Long userId) {
		return wishlistRepository.findByUserUserUid(userId);
	}

	public WishList addToWishList(Long userId, Integer bookId) {
		User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));

		if (wishlistRepository.existsByUserUserUidAndBookId(userId, bookId)) {
			throw new RuntimeException("Book is already in wishlist");
		}

		WishList wishList = new WishList();
		wishList.setUser(user);
		wishList.setBook(book);

		return wishlistRepository.save(wishList);
	}

	 @Transactional
	    public void removeFromWishList(Long userId, Integer bookId) {
	        // Assuming WishList is an entity with a userId and bookId
	        WishList wishList = wishlistRepository.findByUser_UserUidAndBook_Id(userId, bookId)
	                .orElseThrow(() -> new EntityNotFoundException("WishList item not found"));

	        wishlistRepository.delete(wishList);
	    }
}
