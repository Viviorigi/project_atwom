package com.a2m.library.service.status;

import com.a2m.library.constant.CheckoutStatus;
import com.a2m.library.dto.CheckoutDTO;
import com.a2m.library.dto.ReturnBookDTO;
import com.a2m.library.model.Checkout;
import com.a2m.library.model.ReturnBook;

import java.util.List;
import java.util.Optional;

public interface ReturnBookService {
    ReturnBook createReturnBookFromCheckout(Checkout checkout);
    void updateReturnBookStatus(Integer returnBookId, CheckoutStatus status);
    List<ReturnBook> findAll();
    ReturnBook findById(Integer id);
    void deleteById(Integer id);
    ReturnBookDTO updateStatusToReturned(Integer returnBookId);

    ReturnBookDTO updateStatusToPenalty(Integer returnBookId, Double fineAmount);
}
