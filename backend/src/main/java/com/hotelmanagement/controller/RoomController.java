package com.hotelmanagement.controller;

import com.hotelmanagement.dto.request.RoomRequest;
import com.hotelmanagement.dto.response.RoomResponse;
import com.hotelmanagement.enums.RoomStatus;
import com.hotelmanagement.enums.RoomType;
import com.hotelmanagement.service.RoomService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
@Tag(name = "Room", description = "Room Management API")
public class RoomController {

    private final RoomService roomService;

    @Operation(summary = "Create a new room")
    @PostMapping
    public ResponseEntity<RoomResponse> createRoom(
            @Valid @RequestBody RoomRequest request) {

        return new ResponseEntity<>(
                roomService.create(request),
                HttpStatus.CREATED);
    }

    @Operation(summary = "Get all rooms")
    @GetMapping
    public ResponseEntity<List<RoomResponse>> getAllRooms() {

        return ResponseEntity.ok(roomService.getAll());
    }

    @Operation(summary = "Get room by id")
    @GetMapping("/{id}")
    public ResponseEntity<RoomResponse> getRoomById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(roomService.getById(id));
    }

    @Operation(summary = "Update room")
    @PutMapping("/{id}")
    public ResponseEntity<RoomResponse> updateRoom(
            @PathVariable Integer id,
            @Valid @RequestBody RoomRequest request) {

        return ResponseEntity.ok(roomService.update(id, request));
    }

    @Operation(summary = "Delete room")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(
            @PathVariable Integer id) {

        roomService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Find rooms by hotel")
    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<List<RoomResponse>> getRoomsByHotel(
            @PathVariable Integer hotelId) {

        return ResponseEntity.ok(roomService.findByHotel(hotelId));
    }

    @Operation(summary = "Find rooms by status")
    @GetMapping("/status/{status}")
    public ResponseEntity<List<RoomResponse>> getRoomsByStatus(
            @PathVariable RoomStatus status) {

        return ResponseEntity.ok(roomService.findByStatus(status));
    }

    @Operation(summary = "Find rooms by type")
    @GetMapping("/type/{roomType}")
    public ResponseEntity<List<RoomResponse>> getRoomsByType(
            @PathVariable RoomType roomType) {

        return ResponseEntity.ok(roomService.findByRoomType(roomType));
    }
}
