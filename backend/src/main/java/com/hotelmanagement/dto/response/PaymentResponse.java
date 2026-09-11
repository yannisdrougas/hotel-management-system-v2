package com.hotelmanagement.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.hotelmanagement.enums.PaymentMethod;
import com.hotelmanagement.enums.PaymentStatus;

import com.hotelmanagement.enums.RoomType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse {

    // ==========================
    // Payment
    // ==========================

    private Integer paymentId;

    private LocalDate paymentDate;

    private BigDecimal amount;

    private PaymentMethod paymentMethod;

    private PaymentStatus paymentStatus;

    // ==========================
    // Reservation
    // ==========================

    private Integer reservationId;

    private LocalDate checkIn;

    private LocalDate checkOut;

    // ==========================
    // Customer
    // ==========================

    private Integer customerId;

    private String customerFirstName;

    private String customerLastName;

    // ==========================
    // Room
    // ==========================

    private Integer roomId;

    private String roomNumber;

    private RoomType roomType;
}
