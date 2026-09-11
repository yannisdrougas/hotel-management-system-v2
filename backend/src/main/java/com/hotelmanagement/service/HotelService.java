package com.hotelmanagement.service;

import com.hotelmanagement.dto.request.HotelRequest;
import com.hotelmanagement.dto.response.HotelResponse;

import java.util.List;

public interface HotelService {

    HotelResponse create(HotelRequest request);

    HotelResponse update(Integer id, HotelRequest request);

    void delete(Integer id);

    HotelResponse getById(Integer id);

    List<HotelResponse> getAll();

    List<HotelResponse> findByStars(Integer stars);

    List<HotelResponse> findByName(String name);

}
