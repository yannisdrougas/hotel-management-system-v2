package com.hotelmanagement.service;

import java.util.List;

import com.hotelmanagement.dto.request.ReservationRequest;
import com.hotelmanagement.dto.response.ReservationResponse;
import com.hotelmanagement.enums.ReservationStatus;

public interface ReservationService {

    // Create
    ReservationResponse createReservation(ReservationRequest request);

    // Update
    ReservationResponse updateReservation(Integer reservationId,
                                          ReservationRequest request);

    // Delete
    void deleteReservation(Integer reservationId);

    // Get by ID
    ReservationResponse getReservationById(Integer reservationId);

    // Get all
    List<ReservationResponse> getAllReservations();

    // Search by Customer
    List<ReservationResponse> findByCustomer(Integer customerId);

    // Search by Room
    List<ReservationResponse> findByRoom(Integer roomId);

    // Search by Employee
    List<ReservationResponse> findByEmployee(Integer employeeId);

    // Search by Status
    List<ReservationResponse> findByStatus(ReservationStatus status);

}