package com.hotelmanagement.service;

import com.hotelmanagement.dto.request.RoomRequest;
import com.hotelmanagement.dto.response.RoomResponse;
import com.hotelmanagement.enums.RoomStatus;
import com.hotelmanagement.enums.RoomType;

import java.util.List;

public interface RoomService {

    RoomResponse create(RoomRequest request);

    RoomResponse update(Integer id, RoomRequest request);

    RoomResponse getById(Integer id);

    List<RoomResponse> getAll();

    void delete(Integer id);

    List<RoomResponse> findByHotel(Integer hotelId);

    List<RoomResponse> findByStatus(RoomStatus status);

    List<RoomResponse> findByRoomType(RoomType roomType);

}