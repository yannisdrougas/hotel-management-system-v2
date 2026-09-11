package com.hotelmanagement.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.hotelmanagement.dto.request.PaymentRequest;
import com.hotelmanagement.dto.response.PaymentResponse;
import com.hotelmanagement.enums.PaymentMethod;
import com.hotelmanagement.enums.PaymentStatus;
import com.hotelmanagement.service.PaymentService;

@RestController
@RequestMapping("/api/payments")

public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // =====================================================
    // CREATE
    // =====================================================

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PaymentResponse createPayment(
            @RequestBody PaymentRequest request) {

        return paymentService.createPayment(request);
    }

    // =====================================================
    // GET ALL
    // =====================================================

    @GetMapping
    public List<PaymentResponse> getAllPayments() {

        return paymentService.getAllPayments();
    }

    // =====================================================
    // GET BY ID
    // =====================================================

    @GetMapping("/{id}")
    public PaymentResponse getPaymentById(
            @PathVariable Integer id) {

        return paymentService.getPaymentById(id);
    }

    // =====================================================
    // UPDATE
    // =====================================================

    @PutMapping("/{id}")
    public PaymentResponse updatePayment(
            @PathVariable Integer id,
            @RequestBody PaymentRequest request) {

        return paymentService.updatePayment(id, request);
    }

    // =====================================================
    // DELETE
    // =====================================================

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePayment(
            @PathVariable Integer id) {

        paymentService.deletePayment(id);
    }

    // =====================================================
    // SEARCH BY RESERVATION
    // =====================================================

    @GetMapping("/reservation/{reservationId}")
    public List<PaymentResponse> findByReservation(
            @PathVariable Integer reservationId) {

        return paymentService.findByReservation(reservationId);
    }

    // =====================================================
    // SEARCH BY STATUS
    // =====================================================

    @GetMapping("/status/{status}")
    public List<PaymentResponse> findByPaymentStatus(
            @PathVariable PaymentStatus status) {

        return paymentService.findByPaymentStatus(status);
    }

    // =====================================================
    // SEARCH BY METHOD
    // =====================================================

    @GetMapping("/method/{method}")
    public List<PaymentResponse> findByPaymentMethod(
            @PathVariable PaymentMethod method) {

        return paymentService.findByPaymentMethod(method);
    }

}
