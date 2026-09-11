package com.hotelmanagement.service.impl;

import com.hotelmanagement.enums.RoomStatus;
import org.springframework.stereotype.Service;
import java.util.List;

import com.hotelmanagement.exception.BusinessException;
import com.hotelmanagement.exception.ResourceNotFoundException;

import com.hotelmanagement.enums.ReservationStatus;

import com.hotelmanagement.dto.request.ReservationRequest;
import com.hotelmanagement.dto.response.ReservationResponse;
import com.hotelmanagement.model.Customer;
import com.hotelmanagement.model.Employee;
import com.hotelmanagement.model.Reservation;
import com.hotelmanagement.model.Room;
import com.hotelmanagement.repository.CustomerRepository;
import com.hotelmanagement.repository.EmployeeRepository;
import com.hotelmanagement.repository.ReservationRepository;
import com.hotelmanagement.repository.RoomRepository;
import com.hotelmanagement.service.ReservationService;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final CustomerRepository customerRepository;
    private final RoomRepository roomRepository;
    private final EmployeeRepository employeeRepository;

    public ReservationServiceImpl(
            ReservationRepository reservationRepository,
            CustomerRepository customerRepository,
            RoomRepository roomRepository,
            EmployeeRepository employeeRepository) {

        this.reservationRepository = reservationRepository;
        this.customerRepository = customerRepository;
        this.roomRepository = roomRepository;
        this.employeeRepository = employeeRepository;
    }

    // =====================================================
    // CREATE RESERVATION
    // =====================================================

    @Override
    public ReservationResponse createReservation(ReservationRequest request) {

        // =====================================================
        // BUSINESS RULES
        // =====================================================

        if (request.getCustomerId() == null) {
            throw new BusinessException("Customer is required.");
        }

        if (request.getRoomId() == null) {
            throw new BusinessException("Room is required.");
        }

        if (request.getStatus() == null) {
            throw new BusinessException("Reservation status is required.");
        }

        if (request.getCheckIn() == null || request.getCheckOut() == null) {
            throw new BusinessException(
                    "Check-in and Check-out dates are required.");
        }

        if (!request.getCheckOut().isAfter(request.getCheckIn())) {
            throw new BusinessException(
                    "Check-out date must be after check-in date.");
        }

        if (request.getGuests() <= 0) {
            throw new BusinessException(
                    "Guests must be greater than zero.");
        }

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found with id: "
                                + request.getCustomerId()));

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Room not found with id: "
                                + request.getRoomId()));

// =====================================================
// BUSINESS RULE
// Room cannot be reserved if it is under maintenance
// =====================================================

        if (room.getStatus() == RoomStatus.MAINTENANCE) {

            throw new BusinessException(
                    "Room is under maintenance and cannot be reserved.");
        }

// =====================================================
// BUSINESS RULE
// Prevent overlapping reservations
// =====================================================

        List<Reservation> existingReservations =
                reservationRepository.findByRoomRoomId(
                        request.getRoomId());

        for (Reservation existing : existingReservations) {

            if (existing.getStatus() == ReservationStatus.CANCELLED) {
                continue;
            }

            boolean overlap =
                    request.getCheckIn().isBefore(existing.getCheckOut())
                            && request.getCheckOut().isAfter(existing.getCheckIn());

            if (overlap) {

                throw new BusinessException(
                        "The room is already reserved for the selected dates.");
            }
        }

        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with id: "
                                + request.getEmployeeId()));

        Reservation reservation = new Reservation();

        reservation.setCustomer(customer);
        reservation.setRoom(room);
        reservation.setEmployee(employee);

        reservation.setCheckIn(request.getCheckIn());
        reservation.setCheckOut(request.getCheckOut());
        reservation.setGuests(request.getGuests());
        reservation.setStatus(request.getStatus());

        Reservation savedReservation =
                reservationRepository.save(reservation);

        return convertToResponse(savedReservation);
    }

    // =====================================================
    // UPDATE RESERVATION
    // =====================================================
    @Override
    public ReservationResponse updateReservation(
            Integer reservationId,
            ReservationRequest request) {

        // =====================================================
        // VALIDATION
        // =====================================================

        if (request.getCustomerId() == null) {

            throw new BusinessException(
                    "Customer is required."
            );

        }

        if (request.getRoomId() == null) {

            throw new BusinessException(
                    "Room is required."
            );

        }

        if (request.getEmployeeId() == null) {

            throw new BusinessException(
                    "Employee is required."
            );

        }

        if (request.getStatus() == null) {

            throw new BusinessException(
                    "Reservation status is required."
            );

        }

        if (
                request.getCheckIn() == null ||
                        request.getCheckOut() == null
        ) {

            throw new BusinessException(
                    "Check-in and Check-out dates are required."
            );

        }

        if (
                !request.getCheckOut()
                        .isAfter(request.getCheckIn())
        ) {

            throw new BusinessException(
                    "Check-out date must be after check-in date."
            );

        }

        if (
                request.getGuests() == null ||
                        request.getGuests() <= 0
        ) {

            throw new BusinessException(
                    "Guests must be greater than zero."
            );

        }


        // =====================================================
        // FIND EXISTING RESERVATION
        // =====================================================

        Reservation reservation =
                reservationRepository
                        .findById(reservationId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Reservation not found with id: "
                                                + reservationId
                                )
                        );


        // =====================================================
        // CHECK WHAT CHANGED
        // =====================================================

        boolean roomChanged =
                !reservation.getRoom()
                        .getRoomId()
                        .equals(request.getRoomId());


        boolean checkInChanged =
                !reservation.getCheckIn()
                        .equals(request.getCheckIn());


        boolean checkOutChanged =
                !reservation.getCheckOut()
                        .equals(request.getCheckOut());


        boolean reactivatingReservation =
                reservation.getStatus()
                        == ReservationStatus.CANCELLED
                        &&
                        request.getStatus()
                                != ReservationStatus.CANCELLED;


        // =====================================================
        // FIND CUSTOMER
        // =====================================================

        Customer customer =
                customerRepository
                        .findById(request.getCustomerId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Customer not found with id: "
                                                + request.getCustomerId()
                                )
                        );


        // =====================================================
        // FIND ROOM
        // =====================================================

        Room room =
                roomRepository
                        .findById(request.getRoomId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Room not found with id: "
                                                + request.getRoomId()
                                )
                        );


        // =====================================================
        // ROOM CANNOT BE UNDER MAINTENANCE
        // =====================================================

        if (
                room.getStatus()
                        == RoomStatus.MAINTENANCE
        ) {

            throw new BusinessException(
                    "Room is under maintenance and cannot be reserved."
            );

        }


        // =====================================================
        // OVERLAP CHECK ONLY WHEN NEEDED
        // =====================================================

        boolean shouldCheckOverlap =
                request.getStatus()
                        != ReservationStatus.CANCELLED
                        &&
                        (
                                roomChanged
                                        ||
                                        checkInChanged
                                        ||
                                        checkOutChanged
                                        ||
                                        reactivatingReservation
                        );


        if (shouldCheckOverlap) {

            List<Reservation> existingReservations =
                    reservationRepository
                            .findByRoomRoomId(
                                    request.getRoomId()
                            );


            for (Reservation existing : existingReservations) {

                // =================================================
                // IGNORE CURRENT RESERVATION
                // =================================================

                if (
                        existing.getReservationId()
                                .equals(reservationId)
                ) {

                    continue;

                }


                // =================================================
                // IGNORE CANCELLED RESERVATIONS
                // =================================================

                if (
                        existing.getStatus()
                                == ReservationStatus.CANCELLED
                ) {

                    continue;

                }


                // =================================================
                // CHECK DATE OVERLAP
                // =================================================

                boolean overlap =
                        request.getCheckIn()
                                .isBefore(
                                        existing.getCheckOut()
                                )
                                &&
                                request.getCheckOut()
                                        .isAfter(
                                                existing.getCheckIn()
                                        );


                if (overlap) {

                    throw new BusinessException(
                            "The room is already reserved for the selected dates."
                    );

                }

            }

        }


        // =====================================================
        // FIND EMPLOYEE
        // =====================================================

        Employee employee =
                employeeRepository
                        .findById(request.getEmployeeId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Employee not found with id: "
                                                + request.getEmployeeId()
                                )
                        );


        // =====================================================
        // UPDATE RESERVATION
        // =====================================================

        reservation.setCustomer(customer);

        reservation.setRoom(room);

        reservation.setEmployee(employee);

        reservation.setCheckIn(
                request.getCheckIn()
        );

        reservation.setCheckOut(
                request.getCheckOut()
        );

        reservation.setGuests(
                request.getGuests()
        );

        reservation.setStatus(
                request.getStatus()
        );


        // =====================================================
        // SAVE
        // =====================================================

        Reservation updatedReservation =
                reservationRepository.save(
                        reservation
                );


        return convertToResponse(
                updatedReservation
        );

    }

    // =====================================================
    // DELETE RESERVATION
    // =====================================================

    @Override
    public void deleteReservation(Integer reservationId) {

        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Reservation not found with id: "
                                + reservationId));

        reservationRepository.delete(reservation);
    }

    // =====================================================
    // GET RESERVATION BY ID
    // =====================================================

    @Override
    public ReservationResponse getReservationById(Integer reservationId) {

        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Reservation not found with id: "
                                + reservationId));

        return convertToResponse(reservation);
    }

    // =====================================================
    // GET ALL RESERVATIONS
    // =====================================================

    @Override
    public List<ReservationResponse> getAllReservations() {

        return reservationRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // =====================================================
    // FIND BY CUSTOMER
    // =====================================================

    @Override
    public List<ReservationResponse> findByCustomer(Integer customerId) {

        return reservationRepository.findByCustomerCustomerId(customerId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // =====================================================
    // FIND BY ROOM
    // =====================================================

    @Override
    public List<ReservationResponse> findByRoom(Integer roomId) {

        return reservationRepository.findByRoomRoomId(roomId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // =====================================================
    // FIND BY EMPLOYEE
    // =====================================================

    @Override
    public List<ReservationResponse> findByEmployee(Integer employeeId) {

        return reservationRepository.findByEmployeeEmployeeId(employeeId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // =====================================================
    // FIND BY STATUS
    // =====================================================

    @Override
    public List<ReservationResponse> findByStatus(ReservationStatus status) {

        return reservationRepository.findByStatus(status)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // =====================================================
    // CONVERT ENTITY TO RESPONSE
    // =====================================================

    private ReservationResponse convertToResponse(Reservation reservation) {

        ReservationResponse response = new ReservationResponse();

        // Reservation
        response.setReservationId(reservation.getReservationId());
        response.setCheckIn(reservation.getCheckIn());
        response.setCheckOut(reservation.getCheckOut());
        response.setGuests(reservation.getGuests());
        response.setStatus(reservation.getStatus());

        // ==========================
        // Customer
        // ==========================

        if (reservation.getCustomer() != null) {

            response.setCustomerId(
                    reservation.getCustomer().getCustomerId());

            response.setCustomerFirstName(
                    reservation.getCustomer().getFirstName());

            response.setCustomerLastName(
                    reservation.getCustomer().getLastName());
        }

        // ==========================
        // Room
        // ==========================

        if (reservation.getRoom() != null) {

            response.setRoomId(
                    reservation.getRoom().getRoomId());

            response.setRoomNumber(
                    reservation.getRoom().getRoomNumber());

            response.setRoomType(
                    reservation.getRoom().getRoomType());
					
			// Hotel
			if (reservation.getRoom().getHotel() != null) {

			response.setHotelId(
                reservation.getRoom().getHotel().getHotelId());

			response.setHotelName(
				reservation.getRoom().getHotel().getName());
			}
        }

        // ==========================
        // Employee
        // ==========================

        if (reservation.getEmployee() != null) {

            response.setEmployeeId(
                    reservation.getEmployee().getEmployeeId());

            response.setEmployeeFirstName(
                    reservation.getEmployee().getFirstName());

            response.setEmployeeLastName(
                    reservation.getEmployee().getLastName());
        }

        return response;
    }

}
