package com.a2m.library.service.checkout.Impl;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.CheckoutDTO;
import com.a2m.library.dto.CheckoutDetailDTO;
import com.a2m.library.dto.NotificationDTO;
import com.a2m.library.dto.UserDTO;
import com.a2m.library.dto.response.ResourceNotFoundException;
import com.a2m.library.model.Book;
import com.a2m.library.model.Checkout;
import com.a2m.library.model.CheckoutDetail;
import com.a2m.library.model.Notification;
import com.a2m.library.model.User;
import com.a2m.library.model.UserFine;
import com.a2m.library.repository.BookRepository;
import com.a2m.library.repository.CheckoutRepository;
import com.a2m.library.repository.UserFineRepository;
import com.a2m.library.repository.UserRepository;
import com.a2m.library.service.checkout.CheckoutDetailService;
import com.a2m.library.service.checkout.CheckoutService;
import com.a2m.library.service.notification.SeeNotificationService;
import com.a2m.library.util.JwtUtil;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    @Autowired
    private CheckoutRepository checkoutRepository;

    @Autowired
    private CheckoutDetailService checkoutDetailService;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BookRepository bookRepository;
    
    @Autowired
    private SeeNotificationService seeNotificationService;

    

    @Autowired
    private UserFineRepository userFineRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public List<CheckoutDTO> findAll(String keySearch, int limit, int page) {
        Pageable pageable = PageRequest.of(page, limit);
        Page<Checkout> checkoutPage;

        if (keySearch == null || keySearch.isEmpty()) {
            checkoutPage = checkoutRepository.findAll(pageable);
        } else {
            checkoutPage = checkoutRepository.findByKeySearch(keySearch, pageable);
        }

        List<CheckoutDTO> checkouts = checkoutPage.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());

        return checkouts;
    }

    @Override
    public Optional<CheckoutDTO> findById(Integer id) {
        return checkoutRepository.findById(id)
                .map(this::toDTO);
    }

    @Override
    @Transactional
    public Checkout add(CheckoutDTO checkoutDTO) {
        User user = userRepository.findById(checkoutDTO.getUserUid())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + checkoutDTO.getUserUid()));
        
        Checkout checkout = new Checkout();
        checkout.setUser(user);
        checkout.setStatus(CheckoutStatus.REQUESTED);
        checkout.setStartTime(LocalDateTime.now());
        checkout.setEndTime(LocalDateTime.now());
        checkout.setExpiredTime(checkout.getEndTime().plusMonths(1));
        
        List<CheckoutDetail> issueDetails = checkoutDTO.getCheckoutDetails().stream().map((detailDTO) -> {
            Book book = bookRepository.findById(detailDTO.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));
            CheckoutDetail detail = new CheckoutDetail();
            detail.setCheckout(checkout);
            detail.setBook(book);
            detail.setQuantity(1);
            if(detail.getQuantity() - book.getQuantity() > 0){
                return detail;
            } else {
                throw new IllegalStateException("Order quantity must > Book quantity.");
            }
        }).collect(Collectors.toList());
        
        checkout.setCheckoutDetails(issueDetails);
        return checkoutRepository.save(checkout);
    }
    
    @Override
    @Transactional
    public Checkout addClient(CheckoutDTO checkoutDTO) {
        User user = userRepository.findById(checkoutDTO.getUserUid())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + checkoutDTO.getUserUid()));
        
        Checkout checkout = new Checkout();
        checkout.setUser(user);
        checkout.setStatus(CheckoutStatus.REQUESTED);
        checkout.setStartTime(LocalDateTime.now());
        checkout.setEndTime(LocalDateTime.now());
        checkout.setExpiredTime(checkoutDTO.getExpiredTime());
        
        List<CheckoutDetail> issueDetails = checkoutDTO.getCheckoutDetails().stream().map((detailDTO) -> {
            Book book = bookRepository.findById(detailDTO.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));
            CheckoutDetail detail = new CheckoutDetail();
            detail.setCheckout(checkout);
            detail.setBook(book);
            detail.setQuantity(1);
            if(detail.getQuantity() - book.getQuantity() > 0){
                return detail;
            } else {
                throw new IllegalStateException("Order quantity must > Book quantity.");
            }
        }).collect(Collectors.toList());
        
        checkout.setCheckoutDetails(issueDetails);
        
        seeNotificationService.sendSseNotification_Account("admin", "User with username: "+user.getUsername()+" and email: "
    				+user.getEmail()+" wanna to issue book");
        return checkoutRepository.save(checkout);
    }

    @Override
    @Transactional
    public CheckoutDTO updateStatus(Integer id, CheckoutStatus status) {
        Checkout checkout = checkoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Checkout not found with id " + id));

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));

        if (status == CheckoutStatus.APPROVED || status == CheckoutStatus.REJECTED
                || status == CheckoutStatus.BORROWED) {
            if (!isAdmin) {
                throw new SecurityException("Only admins can update to APPROVED, REJECTED, or BORROWED status");
            }
        }

        checkout.setStatus(status);
        checkout.setEndTime(LocalDateTime.now());
        checkout = checkoutRepository.save(checkout);
        return toDTO(checkout);
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        Checkout checkout = checkoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Checkout not found with id " + id));
        checkoutRepository.delete(checkout);
    }

    @Override
    @Transactional
    public void checkExpiredCheckouts() {
        List<Checkout> expiredCheckouts = checkoutRepository.findByEndTimeBeforeAndStatus(LocalDateTime.now(),
                CheckoutStatus.BORROWED);
        expiredCheckouts.forEach(checkout -> {
            checkout.setStatus(CheckoutStatus.EXPIRED);
            checkout.setEndTime(LocalDateTime.now());
            checkoutRepository.save(checkout);
        });
    }

    @Override
    public void scheduleEndTimeNotifications(CheckoutDTO checkoutDTO) {
        // Logic for notifications
    }

    @Override
    @Transactional
    public CheckoutDTO approveCheckout(Integer id) {
        Checkout checkout = checkoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Checkout not found with id " + id));

        if (checkout.getStatus() == CheckoutStatus.REQUESTED || checkout.getStatus() == CheckoutStatus.REJECTED) {
            checkout.setStatus(CheckoutStatus.APPROVED);
            checkout.setEndTime(LocalDateTime.now());
            checkoutRepository.save(checkout);
            return toDTO(checkout);
        } else {
            throw new IllegalStateException("Checkout must be in REQUESTED status to be approved.");
        }
    }

    @Override
    @Transactional
    public CheckoutDTO rejectCheckout(Integer id) {
        Checkout checkout = checkoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Checkout not found with id " + id));

        if (checkout.getStatus() == CheckoutStatus.REQUESTED || checkout.getStatus() == CheckoutStatus.APPROVED) {
            checkout.setStatus(CheckoutStatus.REJECTED);
            checkout.setEndTime(LocalDateTime.now());
            checkoutRepository.save(checkout);
            return toDTO(checkout);
        } else {
            throw new IllegalStateException("Checkout must be in REQUESTED status to be rejected.");
        }
    }

    @Override
    public CheckoutDTO borrowCheckout(Integer id) {
        Checkout checkout = checkoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Checkout not found with id " + id));
        if (checkout.getStatus() == CheckoutStatus.REJECTED || checkout.getStatus() == CheckoutStatus.APPROVED) {
            checkout.setStatus(CheckoutStatus.BORROWED);
            checkout.setEndTime(LocalDateTime.now());
            checkout.setExpiredTime(LocalDateTime.now().plusDays(30));
            checkoutRepository.save(checkout);
            return toDTO(checkout);
        } else {
            throw new IllegalStateException("Checkout must be in REQUESTED status to be rejected.");
        }
    }

    @Override
    @Transactional
    public CheckoutDTO expiredCheckout(Integer id) {
        Checkout checkout = checkoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Checkout not found with id " + id));
        if (checkout.getStatus() == CheckoutStatus.BORROWED) {
            checkout.setEndTime(LocalDateTime.now());
            checkout.setStatus(CheckoutStatus.EXPIRED);
            checkoutRepository.save(checkout);
        } else {
            throw new IllegalStateException("Only BORROWED checkouts can be marked as EXPIRED.");
        }

        return toDTO(checkout);
    }

    @Override
    @Transactional
    public CheckoutDTO returnedCheckout(Integer id) {
        Checkout checkout = checkoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Checkout not found with id " + id));
        
        // checkout.getStatus() == CheckoutStatus.BORROWED || checkout.getStatus() == CheckoutStatus.EXPIRED
        if (checkout.getStatus() == CheckoutStatus.BORROWED) {
            checkout.setEndTime(LocalDateTime.now());
            checkout.setStatus(CheckoutStatus.RETURNED);
            checkoutRepository.save(checkout);
            return toDTO(checkout);
        } else {
            throw new IllegalStateException("Only BORROWED or EXPIRED checkouts can be marked as RETURNED.");
        }
    }

    @Override
    @Transactional
    public CheckoutDTO penaltyCheckout(Integer id) {
        Checkout checkout = checkoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Checkout not found with ID: " + id));
        checkout.setStatus(CheckoutStatus.PENALTY);

        return toDTO(checkout);
    }

    private Double calculateFine(Checkout checkout) {
        long daysOverdue = LocalDateTime.now().minusDays(checkout.getEndTime().toLocalDate().toEpochDay()).toLocalDate()
                .toEpochDay();
        return daysOverdue > 0 ? daysOverdue * 20000.0 : 0.0;
    }

    private CheckoutDTO toDTO(Checkout checkout) {
        CheckoutDTO dto = new CheckoutDTO();
        dto.setId(checkout.getId());
        dto.setStatus(checkout.getStatus());
        // dto.setFine(checkout.getFine());

        UserDTO userDTO = new UserDTO();
        userDTO.setUserUid(checkout.getUser().getUserUid());
        userDTO.setFullName(checkout.getUser().getFullName());
        dto.setUser(userDTO);

        dto.setStatus(checkout.getStatus());
        dto.setStartTime(checkout.getStartTime());
        dto.setExpiredTime(checkout.getExpiredTime());
        dto.setEndTime(checkout.getEndTime());
        return dto;
    }

    public Checkout toEntity(CheckoutDTO checkoutDTO) {
        Checkout checkout = new Checkout();
        if (checkoutDTO.getId() != null && checkoutDTO.getId() > 0) {
            checkout.setId(checkoutDTO.getId());
        }
        checkout.setStatus(checkoutDTO.getStatus());
        checkout.setStartTime(checkoutDTO.getStartTime());
        checkout.setEndTime(checkoutDTO.getEndTime());
        checkout.setExpiredTime(checkoutDTO.getExpiredTime());
        return checkout;
    }

	@Override
	public Page<CheckoutDTO> findCheckoutNeedReturn(String keySearch, PageRequest pageRequest) {
		// TODO Auto-generated method stub
		Page<Checkout> checkouts = checkoutRepository.searchNotification(keySearch, pageRequest);
        // Convert Page<User> to Page<UserDTO>
        List<CheckoutDTO> checkoutReturn = checkouts.stream().map(this::toDTO)
                                      .collect(Collectors.toList());
        return new PageImpl<>(checkoutReturn, pageRequest, checkouts.getTotalElements());
	}

	@Override
	public List<CheckoutDTO> findByUser(Long userUid) {
		// TODO Auto-generated method stub
		List<Checkout> c = checkoutRepository.findByUIdIn(userUid);
		
		List<CheckoutDTO> checkoutDTOs = c.stream()
		        .map(this::toDTO) 
		        .collect(Collectors.toList());
		return checkoutDTOs;
	}
	
	
	
}
