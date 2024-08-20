package com.a2m.library.service.status.Impl;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.CheckoutDTO;
import com.a2m.library.dto.CheckoutDetailDTO;
import com.a2m.library.dto.ReturnBookDTO;
import com.a2m.library.dto.UserDTO;
import com.a2m.library.exception.ResourceNotFoundException;
import com.a2m.library.model.Checkout;
import com.a2m.library.model.CheckoutDetail;
import com.a2m.library.model.ReturnBook;
import com.a2m.library.model.User;
import com.a2m.library.model.UserFine;
import com.a2m.library.repository.CheckoutRepository;
import com.a2m.library.repository.ReturnBookRepository;
import com.a2m.library.repository.UserFineRepository;
import com.a2m.library.service.status.ReturnBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReturnBookServiceImpl implements ReturnBookService {

    @Autowired
    private ReturnBookRepository returnBookRepository;

    @Autowired
    private CheckoutRepository checkoutRepository;

    @Autowired
    private UserFineRepository userFineRepository;

    @Override
    public ReturnBook createReturnBookFromCheckout(Checkout checkout) {
        ReturnBook returnBook = new ReturnBook();
        returnBook.setCheckout(checkout);
        returnBook.setUser(checkout.getUser());
        returnBook.setReturnDate(LocalDateTime.now());
        returnBook.setStatus(CheckoutStatus.EXPIRED);

        returnBook = returnBookRepository.save(returnBook);
        return returnBook;
    }

    @Override
    public void updateReturnBookStatus(Integer returnBookId, CheckoutStatus status) {
        ReturnBook returnBook = returnBookRepository.findById(returnBookId)
                .orElseThrow(() -> new ResourceNotFoundException("ReturnBook not found with id " + returnBookId));
        returnBook.setStatus(status);
        returnBookRepository.save(returnBook);

        if (status == CheckoutStatus.PENALTY) {
            UserFine userFine = new UserFine();
            userFine.setReturnBook(returnBook);
            userFine.setAmount(0.0);
            userFineRepository.save(userFine);
        }
    }

    @Override
    public List<ReturnBook> findAll() {
        return returnBookRepository.findAll();
    }

    @Override
    public ReturnBook findById(Integer id) {
        return returnBookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ReturnBook not found with id " + id));
    }

    @Override
    public void deleteById(Integer id) {
        returnBookRepository.deleteById(id);
    }

    @Override
    @Transactional
    public ReturnBookDTO updateStatusToReturned(Integer returnBookId) {
        ReturnBook returnBook = returnBookRepository.findById(returnBookId)
                .orElseThrow(() -> new ResourceNotFoundException("ReturnBook not found with id " + returnBookId));

        if (returnBook.getStatus() != CheckoutStatus.BORROWED) {
            throw new IllegalStateException("Only BORROWED checkouts can be returned");
        }

        returnBook.setStatus(CheckoutStatus.RETURNED);
        returnBookRepository.save(returnBook);

        return mapToDTO(returnBook);
    }

    @Override
    @Transactional
    public ReturnBookDTO updateStatusToPenalty(Integer returnBookId, Double fineAmount) {
        ReturnBook returnBook = returnBookRepository.findById(returnBookId)
                .orElseThrow(() -> new ResourceNotFoundException("ReturnBook not found with id " + returnBookId));

        if (returnBook.getStatus() != CheckoutStatus.RETURNED) {
            throw new IllegalStateException("Only RETURNED checkouts can incur penalties");
        }

        returnBook.setStatus(CheckoutStatus.PENALTY);
        returnBookRepository.save(returnBook);

        UserFine userFine = new UserFine();
        userFine.setReturnBook(returnBook);
        userFine.setAmount(fineAmount);
        userFineRepository.save(userFine);

        return mapToDTO(returnBook);
    }

    public ReturnBookDTO mapToDTO(ReturnBook returnBook) {
        ReturnBookDTO dto = new ReturnBookDTO();
        dto.setId(returnBook.getId());
        dto.setReturnDate(returnBook.getReturnDate());
        dto.setStatus(returnBook.getStatus());

        dto.setUser(createUserDTO(returnBook.getUser()));
        dto.setCheckout(createCheckoutDTO(returnBook.getCheckout()));

        return dto;
    }

    public CheckoutDTO mapToDTO(Checkout checkout) {
        CheckoutDTO dto = new CheckoutDTO();
        dto.setId(checkout.getId());
        dto.setStatus(checkout.getStatus());
        dto.setStartTime(checkout.getStartTime());
        dto.setEndTime(checkout.getEndTime());
        dto.setUser(createUserDTO(checkout.getUser()));
        return dto;
    }

    private UserDTO createUserDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setUserUid(user.getUserUid());
        dto.setFullName(user.getFullName());
        return dto;
    }

    private CheckoutDTO createCheckoutDTO(Checkout checkout) {
        CheckoutDTO dto = new CheckoutDTO();
        dto.setId(checkout.getId());
        dto.setStatus(checkout.getStatus());
        dto.setStartTime(checkout.getStartTime());
        dto.setEndTime(checkout.getEndTime());
        dto.setUser(createUserDTO(checkout.getUser()));
        return dto;
    }
}

