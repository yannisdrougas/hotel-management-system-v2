package com.hotelmanagement.service.impl;

import com.hotelmanagement.enums.ReservationStatus;
import org.springframework.stereotype.Service;

import com.hotelmanagement.exception.BusinessException;
import com.hotelmanagement.exception.ResourceNotFoundException;

import java.math.BigDecimal;
import java.util.List;

import com.hotelmanagement.enums.PaymentMethod;
import com.hotelmanagement.enums.PaymentStatus;

import com.hotelmanagement.dto.request.PaymentRequest;
import com.hotelmanagement.dto.response.PaymentResponse;
import com.hotelmanagement.model.Payment;
import com.hotelmanagement.model.Reservation;
import com.hotelmanagement.repository.PaymentRepository;
import com.hotelmanagement.repository.ReservationRepository;
import com.hotelmanagement.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final ReservationRepository reservationRepository;

    public PaymentServiceImpl(
            PaymentRepository paymentRepository,
            ReservationRepository reservationRepository) {

        this.paymentRepository = paymentRepository;
        this.reservationRepository = reservationRepository;
    }

    // =====================================================
    // CREATE PAYMENT
    // =====================================================

    @Override
    public PaymentResponse createPayment(PaymentRequest request) {

        // Δεν επιτρέπεται δεύτερη πληρωμή
        if (paymentRepository.existsByReservationReservationId(
                request.getReservationId())) {

            throw new BusinessException(
                    "Payment already exists for reservation id: "
                            + request.getReservationId());
        }

 // =====================================================
// BUSINESS RULE
// Payment amount must be greater than zero
// =====================================================

        if (request.getAmount() == null
                || request.getAmount().compareTo(BigDecimal.ZERO) <= 0) {

            throw new BusinessException(
                    "Payment amount must be greater than zero.");
        }

        Reservation reservation = reservationRepository
                .findById(request.getReservationId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Reservation not found with id: "
                                        + request.getReservationId()));

 // =====================================================
// BUSINESS RULE
// Cancelled reservations cannot be paid
// =====================================================

        if (reservation.getStatus() == ReservationStatus.CANCELLED) {

            throw new BusinessException(
                    "Cannot pay for a cancelled reservation.");
        }

        Payment payment = new Payment();

        payment.setReservation(reservation);
        payment.setPaymentDate(request.getPaymentDate());
        payment.setAmount(request.getAmount());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPaymentStatus(request.getPaymentStatus());

        Payment savedPayment = paymentRepository.save(payment);

        return convertToResponse(savedPayment);
    }

    // =====================================================
    // UPDATE PAYMENT
    // =====================================================

    @Override
    public PaymentResponse updatePayment(
            Integer paymentId,
            PaymentRequest request) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payment not found with id: "
                                        + paymentId));

        if (request.getAmount() == null
                || request.getAmount().compareTo(BigDecimal.ZERO) <= 0) {

            throw new BusinessException(
                    "Payment amount must be greater than zero.");
        }

// =====================================================
// CHECK IF RESERVATION CHANGED
// =====================================================

        boolean reservationChanged =
                !payment.getReservation()
                        .getReservationId()
                        .equals(request.getReservationId());


// =====================================================
// PREVENT SECOND PAYMENT FOR SAME RESERVATION
// =====================================================

        if (
                reservationChanged
                        &&
                        paymentRepository.existsByReservationReservationId(
                                request.getReservationId()
                        )
        ) {

            throw new BusinessException(
                    "Payment already exists for reservation id: "
                            + request.getReservationId()
            );

        }

        Reservation reservation = reservationRepository
                .findById(request.getReservationId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Reservation not found with id: "
                                        + request.getReservationId()));

// =====================================================
// BUSINESS RULE
// Cancelled reservations cannot be paid
// =====================================================

        if (reservation.getStatus() == ReservationStatus.CANCELLED) {

            throw new BusinessException(
                    "Cannot pay for a cancelled reservation.");
        }

        payment.setReservation(reservation);
        payment.setPaymentDate(request.getPaymentDate());
        payment.setAmount(request.getAmount());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPaymentStatus(request.getPaymentStatus());

        Payment updatedPayment = paymentRepository.save(payment);

        return convertToResponse(updatedPayment);
    }

    // =====================================================
    // DELETE PAYMENT
    // =====================================================

    @Override
    public void deletePayment(Integer paymentId) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payment not found with id: "
                                        + paymentId));

        paymentRepository.delete(payment);
    }

    // =====================================================
    // GET PAYMENT BY ID
    // =====================================================

    @Override
    public PaymentResponse getPaymentById(Integer paymentId) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payment not found with id: "
                                        + paymentId));

        return convertToResponse(payment);
    }

    // =====================================================
    // GET ALL PAYMENTS
    // =====================================================

    @Override
    public List<PaymentResponse> getAllPayments() {

        return paymentRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // =====================================================
    // FIND BY RESERVATION
    // =====================================================

    @Override
    public List<PaymentResponse> findByReservation(Integer reservationId) {

        return paymentRepository.findByReservationReservationId(reservationId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // =====================================================
    // FIND BY PAYMENT STATUS
    // =====================================================

    @Override
    public List<PaymentResponse> findByPaymentStatus(
            PaymentStatus paymentStatus) {

        return paymentRepository.findByPaymentStatus(paymentStatus)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // =====================================================
    // FIND BY PAYMENT METHOD
    // =====================================================

    @Override
    public List<PaymentResponse> findByPaymentMethod(
            PaymentMethod paymentMethod) {

        return paymentRepository.findByPaymentMethod(paymentMethod)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // =====================================================
    // CONVERT ENTITY TO RESPONSE
    // =====================================================

    private PaymentResponse convertToResponse(Payment payment) {

        PaymentResponse response = new PaymentResponse();

        // ==========================
        // Payment
        // ==========================

        response.setPaymentId(payment.getPaymentId());
        response.setPaymentDate(payment.getPaymentDate());
        response.setAmount(payment.getAmount());
        response.setPaymentMethod(payment.getPaymentMethod());
        response.setPaymentStatus(payment.getPaymentStatus());

        // ==========================
        // Reservation
        // ==========================

        if (payment.getReservation() != null) {

            response.setReservationId(
                    payment.getReservation().getReservationId());

            response.setCheckIn(
                    payment.getReservation().getCheckIn());

            response.setCheckOut(
                    payment.getReservation().getCheckOut());

            // ==========================
            // Customer
            // ==========================

            if (payment.getReservation().getCustomer() != null) {

                response.setCustomerId(
                        payment.getReservation()
                                .getCustomer()
                                .getCustomerId());

                response.setCustomerFirstName(
                        payment.getReservation()
                                .getCustomer()
                                .getFirstName());

                response.setCustomerLastName(
                        payment.getReservation()
                                .getCustomer()
                                .getLastName());
            }

            // ==========================
            // Room
            // ==========================

            if (payment.getReservation().getRoom() != null) {

                response.setRoomId(
                        payment.getReservation()
                                .getRoom()
                                .getRoomId());

                response.setRoomNumber(
                        payment.getReservation()
                                .getRoom()
                                .getRoomNumber());

                response.setRoomType(
                        payment.getReservation()
                                .getRoom()
                                .getRoomType());
            }
        }

        return response;
    }

}
