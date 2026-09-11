package com.hotelmanagement.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.hotelmanagement.dto.request.ReservationRequest;
import com.hotelmanagement.dto.response.ReservationResponse;
import com.hotelmanagement.enums.ReservationStatus;
import com.hotelmanagement.service.ReservationService;

@RestController
@RequestMapping("/api/reservations")
//@CrossOrigin(origins = "*")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    // =====================================================
    // CREATE
    // =====================================================

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReservationResponse createReservation(
            @RequestBody ReservationRequest request) {

        return reservationService.createReservation(request);
    }

    // =====================================================
    // GET ALL
    // =====================================================

    @GetMapping
    public List<ReservationResponse> getAllReservations() {

        return reservationService.getAllReservations();
    }

    // =====================================================
    // GET BY ID
    // =====================================================

    @GetMapping("/{id}")
    public ReservationResponse getReservationById(
            @PathVariable Integer id) {

        return reservationService.getReservationById(id);
    }

    // =====================================================
    // UPDATE
    // =====================================================

    @PutMapping("/{id}")
    public ReservationResponse updateReservation(
            @PathVariable Integer id,
            @RequestBody ReservationRequest request) {

        return reservationService.updateReservation(id, request);
    }

    // =====================================================
    // DELETE
    // =====================================================

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteReservation(
            @PathVariable Integer id) {

        reservationService.deleteReservation(id);
    }

    // =====================================================
    // SEARCH BY CUSTOMER
    // =====================================================

    @GetMapping("/customer/{customerId}")
    public List<ReservationResponse> findByCustomer(
            @PathVariable Integer customerId) {

        return reservationService.findByCustomer(customerId);
    }

    // =====================================================
    // SEARCH BY ROOM
    // =====================================================

    @GetMapping("/room/{roomId}")
    public List<ReservationResponse> findByRoom(
            @PathVariable Integer roomId) {

        return reservationService.findByRoom(roomId);
    }

    // =====================================================
    // SEARCH BY EMPLOYEE
    // =====================================================

    @GetMapping("/employee/{employeeId}")
    public List<ReservationResponse> findByEmployee(
            @PathVariable Integer employeeId) {

        return reservationService.findByEmployee(employeeId);
    }

    // =====================================================
    // SEARCH BY STATUS
    // =====================================================

    @GetMapping("/status/{status}")
    public List<ReservationResponse> findByStatus(
            @PathVariable ReservationStatus status) {

        return reservationService.findByStatus(status);
    }

}
