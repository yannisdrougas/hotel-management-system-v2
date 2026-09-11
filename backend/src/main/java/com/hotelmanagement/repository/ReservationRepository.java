package com.hotelmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotelmanagement.enums.ReservationStatus;
import com.hotelmanagement.model.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    // Search by Customer
    List<Reservation> findByCustomerCustomerId(Integer customerId);

    // Search by Room
    List<Reservation> findByRoomRoomId(Integer roomId);

    // Search by Employee
    List<Reservation> findByEmployeeEmployeeId(Integer employeeId);

    // Search by Status
    List<Reservation> findByStatus(ReservationStatus status);

}
