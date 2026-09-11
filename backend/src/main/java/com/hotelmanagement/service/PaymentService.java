package com.hotelmanagement.service;

import java.util.List;

import com.hotelmanagement.dto.request.PaymentRequest;
import com.hotelmanagement.dto.response.PaymentResponse;
import com.hotelmanagement.enums.PaymentMethod;
import com.hotelmanagement.enums.PaymentStatus;

public interface PaymentService {

    // ==========================================
    // CREATE
    // ==========================================

    PaymentResponse createPayment(PaymentRequest request);

    // ==========================================
    // UPDATE
    // ==========================================

    PaymentResponse updatePayment(
            Integer paymentId,
            PaymentRequest request);

    // ==========================================
    // DELETE
    // ==========================================

    void deletePayment(Integer paymentId);

    // ==========================================
    // GET BY ID
    // ==========================================

    PaymentResponse getPaymentById(Integer paymentId);

    // ==========================================
    // GET ALL
    // ==========================================

    List<PaymentResponse> getAllPayments();

    // ==========================================
    // SEARCH
    // ==========================================

    List<PaymentResponse> findByReservation(Integer reservationId);

    List<PaymentResponse> findByPaymentStatus(
            PaymentStatus paymentStatus);

    List<PaymentResponse> findByPaymentMethod(
            PaymentMethod paymentMethod);

}
