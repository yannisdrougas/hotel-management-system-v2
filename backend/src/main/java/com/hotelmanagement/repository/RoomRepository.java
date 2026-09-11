package com.hotelmanagement.repository;

import com.hotelmanagement.enums.RoomStatus;
import com.hotelmanagement.enums.RoomType;
import com.hotelmanagement.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room,Integer>{

    List<Room> findByHotelHotelId(Integer hotelId);

    List<Room> findByStatus(RoomStatus status);

    List<Room> findByRoomType(RoomType roomType);
}
