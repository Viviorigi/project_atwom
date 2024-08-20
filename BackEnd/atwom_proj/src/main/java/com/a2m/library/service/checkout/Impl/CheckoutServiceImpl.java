package com.a2m.library.service.checkout.Impl;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.CheckoutDTO;
import com.a2m.library.dto.CheckoutDetailDTO;
import com.a2m.library.dto.UserDTO;
import com.a2m.library.dto.response.ResourceNotFoundException;
import com.a2m.library.model.Checkout;
import com.a2m.library.model.CheckoutDetail;
import com.a2m.library.model.User;
import com.a2m.library.model.UserFine;
import com.a2m.library.repository.CheckoutRepository;
import com.a2m.library.repository.UserFineRepository;
import com.a2m.library.repository.UserRepository;
import com.a2m.library.service.checkout.CheckoutDetailService;
import com.a2m.library.service.checkout.CheckoutService;
import com.a2m.library.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    private UserFineRepository userFineRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public List<CheckoutDTO> findAll() {
        return checkoutRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<CheckoutDTO> findById(Integer id) {
        return checkoutRepository.findById(id)
                .map(this::toDTO);
    }

    @Override
    @Transactional
    public CheckoutDTO add(CheckoutDTO checkoutDTO) {
        User user = userRepository.findById(checkoutDTO.getUserUid())
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + checkoutDTO.getUserUid()));
        Checkout checkout = toEntity(checkoutDTO);
        checkout.setUser(user);

        checkout.setStatus(CheckoutStatus.REQUESTED);

        checkout = checkoutRepository.save(checkout);

        if (checkoutDTO.getCheckoutDetails() != null) {
            for (CheckoutDetailDTO detailDTO : checkoutDTO.getCheckoutDetails()) {
                detailDTO.setCheckoutId(checkout.getId());
                checkoutDetailService.save(detailDTO);
            }
        }

        return toDTO(checkout);
    }

    @Override
    @Transactional
    public CheckoutDTO updateStatus(Integer id, CheckoutStatus status) {
        Checkout checkout = checkoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Checkout not found with id " + id));

        // Check role
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));

        if (status == CheckoutStatus.APPROVED || status == CheckoutStatus.REJECTED || status == CheckoutStatus.BORROWED) {
            if (!isAdmin) {
                throw new SecurityException("Only admins can update to APPROVED, REJECTED, or BORROWED status");
            }
        }

        checkout.setStatus(status);

        if (status == CheckoutStatus.BORROWED) {
            checkout.setStartTime(LocalDateTime.now());
            checkout.setEndTime(LocalDateTime.now().plusDays(30)); // Default duration
        }

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
        List<Checkout> expiredCheckouts = checkoutRepository.findByEndTimeBeforeAndStatus(LocalDateTime.now(), CheckoutStatus.BORROWED);
        expiredCheckouts.forEach(checkout -> {
            checkout.setStatus(CheckoutStatus.EXPIRED);
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
        Optional<Checkout> optionalCheckout = checkoutRepository.findById(id);
        if (optionalCheckout.isPresent()) {
            Checkout checkout = optionalCheckout.get();
            if (checkout.getStatus() == CheckoutStatus.REQUESTED) {
                checkoutRepository.updateStatusToApproved(id, CheckoutStatus.APPROVED);
                return toDTO(checkoutRepository.findById(id).orElseThrow(() -> new IllegalStateException("Checkout not found")));
            } else {
                throw new IllegalStateException("Checkout must be in REQUESTED status to be approved.");
            }
        } else {
            throw new IllegalStateException("Checkout not found with id: " + id);
        }
    }

    @Override
    @Transactional
    public CheckoutDTO rejectCheckout(Integer id) {
        Optional<Checkout> optionalCheckout = checkoutRepository.findById(id);
        if (optionalCheckout.isPresent()) {
            Checkout checkout = optionalCheckout.get();
            if (checkout.getStatus() == CheckoutStatus.REQUESTED) {
                checkoutRepository.updateStatusToRejected(id, CheckoutStatus.REJECTED);
                return toDTO(checkoutRepository.findById(id).orElseThrow(() -> new IllegalStateException("Checkout not found")));
            } else {
                throw new IllegalStateException("Checkout must be in REQUESTED status to be rejected.");
            }
        } else {
            throw new IllegalStateException("Checkout not found with id: " + id);
        }
    }

    @Override
    public CheckoutDTO borrowCheckout(Integer id) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime endTime = now.plusDays(30);
        checkoutRepository.updateStatusToBorrowed(id, CheckoutStatus.BORROWED, now, endTime);
        return findById(id).orElseThrow(() -> new ResourceNotFoundException("Checkout not found with id " + id));
    }

    @Override
    @Transactional
    public CheckoutDTO expiredCheckout(Integer id) {
        // Tìm checkout theo ID
        Checkout checkout = checkoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Checkout not found with id " + id));
        
        // Kiểm tra trạng thái hiện tại của checkout
        if (checkout.getStatus() == CheckoutStatus.BORROWED) {
            // Cập nhật trạng thái thành EXPIRED
            checkout.setStatus(CheckoutStatus.EXPIRED);
            checkoutRepository.save(checkout);
        } else {
            throw new IllegalStateException("Only BORROWED checkouts can be marked as EXPIRED.");
        }

        return toDTO(checkout);
    }

    private CheckoutDTO toDTO(Checkout checkout) {
        CheckoutDTO dto = new CheckoutDTO();
        dto.setId(checkout.getId());

        UserDTO userDTO = new UserDTO();
        userDTO.setUserUid(checkout.getUser().getUserUid());
        userDTO.setFullName(checkout.getUser().getFullName());
        dto.setUser(userDTO);

        dto.setStatus(checkout.getStatus());
        dto.setStartTime(checkout.getStartTime());
        dto.setEndTime(checkout.getEndTime());
        return dto;
    }

    private UserDTO createUserDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setUserUid(user.getUserUid());
        dto.setFullName(user.getFullName());
        return dto;
    }

    private Checkout toEntity(CheckoutDTO dto) {
        Checkout checkout = new Checkout();
        checkout.setId(dto.getId());
        checkout.setStatus(dto.getStatus());
        checkout.setStartTime(dto.getStartTime());
        checkout.setEndTime(dto.getEndTime());
        return checkout;
    }
}
