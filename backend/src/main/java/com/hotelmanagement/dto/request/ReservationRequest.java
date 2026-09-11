package com.hotelmanagement.dto.request;

import java.time.LocalDate;

import com.hotelmanagement.enums.ReservationStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationRequest {

    private Integer customerId;

    private Integer roomId;

    private Integer employeeId;

    private LocalDate checkIn;

    private LocalDate checkOut;

    private Integer guests;

    private ReservationStatus status;

}