package com.hotelmanagement.controller;

import com.hotelmanagement.dto.request.HotelRequest;
import com.hotelmanagement.dto.response.HotelResponse;
import com.hotelmanagement.service.HotelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
@RequiredArgsConstructor
public class HotelController {

    private final HotelService hotelService;

    /**
     * Δημιουργία νέου ξενοδοχείου
     */
    @PostMapping
    public ResponseEntity<HotelResponse> createHotel(
            @Valid @RequestBody HotelRequest request) {

        HotelResponse response = hotelService.create(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Επιστροφή όλων των ξενοδοχείων
     */
    @GetMapping
    public ResponseEntity<List<HotelResponse>> getAllHotels() {

        return ResponseEntity.ok(hotelService.getAll());

    }

    /**
     * Αναζήτηση ξενοδοχείου με id
     */
    @GetMapping("/{id}")
    public ResponseEntity<HotelResponse> getHotelById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(hotelService.getById(id));

    }

    /**
     * Ενημέρωση ξενοδοχείου
     */
    @PutMapping("/{id}")
    public ResponseEntity<HotelResponse> updateHotel(
            @PathVariable Integer id,
            @Valid @RequestBody HotelRequest request) {

        return ResponseEntity.ok(hotelService.update(id, request));

    }

    /**
     * Διαγραφή ξενοδοχείου
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHotel(
            @PathVariable Integer id) {

        hotelService.delete(id);

        return ResponseEntity.noContent().build();

    }

    /**
     * Αναζήτηση ξενοδοχείων με βάση τα αστέρια
     */
    @GetMapping("/stars/{stars}")
    public ResponseEntity<List<HotelResponse>> getHotelsByStars(
            @PathVariable Integer stars) {

        return ResponseEntity.ok(hotelService.findByStars(stars));

    }

    /**
     * Αναζήτηση ξενοδοχείων με βάση το όνομα
     */
    @GetMapping("/search")
    public ResponseEntity<List<HotelResponse>> searchHotelsByName(
            @RequestParam String name) {

        return ResponseEntity.ok(hotelService.findByName(name));

    }

}
