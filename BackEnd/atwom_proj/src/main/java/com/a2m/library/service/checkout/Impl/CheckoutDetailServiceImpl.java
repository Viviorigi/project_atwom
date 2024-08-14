package com.a2m.library.service.checkout.Impl;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.a2m.library.dto.CheckoutDetailDTO;
import com.a2m.library.dto.response.ResourceNotFoundException;
import com.a2m.library.model.Book;
import com.a2m.library.model.Checkout;
import com.a2m.library.model.CheckoutDetail;
import com.a2m.library.repository.CheckoutDetailRepository;
import com.a2m.library.service.checkout.CheckoutDetailService;

@Service
public class CheckoutDetailServiceImpl implements CheckoutDetailService {

    @Autowired
    private CheckoutDetailRepository checkoutDetailRepository;

    @Override
    public Set<CheckoutDetailDTO> findAll() {
        return checkoutDetailRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toSet());
    }

    @Override
    public Optional<CheckoutDetailDTO> findById(Integer id) {
        return checkoutDetailRepository.findById(id).map(this::toDTO);
    }

    @Override
    @Transactional
    public CheckoutDetailDTO add(CheckoutDetailDTO checkoutDetailDTO) {
        CheckoutDetail checkoutDetail = new CheckoutDetail();

        // Thêm thông tin về Book
        Book book = new Book();
        book.setId(checkoutDetailDTO.getBookId());
        checkoutDetail.setBook(book);

        // Thêm thông tin về Checkout
        Checkout checkout = new Checkout();
        checkout.setId(checkoutDetailDTO.getCheckoutId());
        checkoutDetail.setCheckout(checkout);

        // Thêm số lượng sách
        checkoutDetail.setQuantity(checkoutDetailDTO.getQuantity());

        // Lưu vào database
        checkoutDetail = checkoutDetailRepository.save(checkoutDetail);
        return toDTO(checkoutDetail);
    }

    @Override
    @Transactional
    public CheckoutDetailDTO update(CheckoutDetailDTO checkoutDetailDTO) {
        CheckoutDetail checkoutDetail = checkoutDetailRepository.findById(checkoutDetailDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("CheckoutDetail not found with id " + checkoutDetailDTO.getId()));

        // Chỉ cập nhật số lượng sách
        checkoutDetail.setQuantity(checkoutDetailDTO.getQuantity());

        // Lưu vào database
        checkoutDetail = checkoutDetailRepository.save(checkoutDetail);
        return toDTO(checkoutDetail);
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        CheckoutDetail checkoutDetail = checkoutDetailRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CheckoutDetail not found with id " + id));

        // Xóa thông tin Book và số lượng
        checkoutDetail.setBook(null);
        checkoutDetail.setQuantity(0);

        // Xóa CheckoutDetail khỏi database
        checkoutDetailRepository.deleteById(id);
    }

    private CheckoutDetailDTO toDTO(CheckoutDetail checkoutDetail) {
        CheckoutDetailDTO dto = new CheckoutDetailDTO();
        dto.setId(checkoutDetail.getId());
        if (checkoutDetail.getBook() != null) {
            dto.setBookId(checkoutDetail.getBook().getId());
        }
        dto.setCheckoutId(checkoutDetail.getCheckout().getId());
        dto.setQuantity(checkoutDetail.getQuantity());
        return dto;
    }

    private CheckoutDetail toEntity(CheckoutDetailDTO dto) {
        CheckoutDetail checkoutDetail = new CheckoutDetail();
        checkoutDetail.setId(dto.getId());

        if (dto.getBookId() != null) {
            Book book = new Book();
            book.setId(dto.getBookId());
            checkoutDetail.setBook(book);
        }

        Checkout checkout = new Checkout();
        checkout.setId(dto.getCheckoutId());
        checkoutDetail.setCheckout(checkout);

        checkoutDetail.setQuantity(dto.getQuantity());
        return checkoutDetail;
    }
}
