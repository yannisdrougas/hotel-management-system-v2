package com.hotelmanagement.repository;

import com.hotelmanagement.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel,Integer> {

    List<Hotel> findByStars(Integer stars);

    List<Hotel> findByNameContainingIgnoreCase(String name);

}