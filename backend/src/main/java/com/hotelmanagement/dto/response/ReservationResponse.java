package com.hotelmanagement.dto.response;

import java.time.LocalDate;

import com.hotelmanagement.enums.ReservationStatus;

import com.hotelmanagement.enums.RoomType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponse {

    private Integer reservationId;

    // Customer
    private Integer customerId;
    private String customerFirstName;
    private String customerLastName;

    // Room
    private Integer roomId;
    private String roomNumber;
    private RoomType roomType;
	
	// Hotel
	private Integer hotelId;
	private String hotelName;

    // Employee
    private Integer employeeId;
    private String employeeFirstName;
    private String employeeLastName;

    // Reservation Details
    private LocalDate checkIn;
    private LocalDate checkOut;

    private Integer guests;

    private ReservationStatus status;

}
