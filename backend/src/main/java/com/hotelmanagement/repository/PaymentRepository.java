package com.hotelmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotelmanagement.enums.PaymentMethod;
import com.hotelmanagement.enums.PaymentStatus;
import com.hotelmanagement.model.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    // ===========================================
    // Search by Reservation
    // ===========================================

    List<Payment> findByReservationReservationId(Integer reservationId);

    // ===========================================
    // Search by Payment Status
    // ===========================================

    List<Payment> findByPaymentStatus(PaymentStatus paymentStatus);

    // ===========================================
    // Search by Payment Method
    // ===========================================

    List<Payment> findByPaymentMethod(PaymentMethod paymentMethod);

    // ===========================================
    // Check if Reservation already has Payment
    // ===========================================

    boolean existsByReservationReservationId(Integer reservationId);

}
