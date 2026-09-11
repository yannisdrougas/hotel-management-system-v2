package com.hotelmanagement.service.impl;

import com.hotelmanagement.dto.request.RoomRequest;
import com.hotelmanagement.dto.response.HotelSummaryResponse;
import com.hotelmanagement.dto.response.RoomResponse;
import com.hotelmanagement.enums.RoomStatus;
import com.hotelmanagement.enums.RoomType;
import com.hotelmanagement.exception.ResourceNotFoundException;
import com.hotelmanagement.model.Hotel;
import com.hotelmanagement.model.Room;
import com.hotelmanagement.repository.HotelRepository;
import com.hotelmanagement.repository.RoomRepository;
import com.hotelmanagement.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    private final HotelRepository hotelRepository;

    @Override
    public RoomResponse create(RoomRequest request) {

        Hotel hotel = hotelRepository.findById(request.getHotelId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Hotel not found"));

        Room room = new Room();

        room.setRoomNumber(request.getRoomNumber());
        room.setRoomType(request.getRoomType());
        room.setFloor(request.getFloor());
        room.setPrice(request.getPrice());
        room.setStatus(request.getStatus());
        room.setHotel(hotel);

        room = roomRepository.save(room);

        return mapToResponse(room);
    }

    @Override
    public List<RoomResponse> getAll() {

        return roomRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public RoomResponse getById(Integer id) {

        Room room = roomRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Room not found"));

        return mapToResponse(room);
    }

    @Override
    public RoomResponse update(Integer id, RoomRequest request) {

        Room room = roomRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Room not found"));

        Hotel hotel = hotelRepository.findById(request.getHotelId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Hotel not found"));

        room.setRoomNumber(request.getRoomNumber());
        room.setRoomType(request.getRoomType());
        room.setFloor(request.getFloor());
        room.setPrice(request.getPrice());
        room.setStatus(request.getStatus());
        room.setHotel(hotel);

        room = roomRepository.save(room);

        return mapToResponse(room);
    }

    @Override
    public void delete(Integer id) {

        Room room = roomRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Room not found"));

        roomRepository.delete(room);
    }

    @Override
    public List<RoomResponse> findByHotel(Integer hotelId) {

        return roomRepository.findByHotelHotelId(hotelId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<RoomResponse> findByStatus(RoomStatus status) {

        return roomRepository.findByStatus(status)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<RoomResponse> findByRoomType(RoomType roomType) {

        return roomRepository.findByRoomType(roomType)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private RoomResponse mapToResponse(Room room) {

        RoomResponse response = new RoomResponse();

        response.setRoomId(room.getRoomId());
        response.setRoomNumber(room.getRoomNumber());
        response.setRoomType(room.getRoomType());
        response.setFloor(room.getFloor());
        response.setPrice(room.getPrice());
        response.setStatus(room.getStatus());

        if (room.getHotel() != null) {

            HotelSummaryResponse hotelResponse =
                    new HotelSummaryResponse();

            hotelResponse.setHotelId(room.getHotel().getHotelId());
            hotelResponse.setName(room.getHotel().getName());
            hotelResponse.setStars(room.getHotel().getStars());

            response.setHotel(hotelResponse);
        }

        return response;
    }

}


