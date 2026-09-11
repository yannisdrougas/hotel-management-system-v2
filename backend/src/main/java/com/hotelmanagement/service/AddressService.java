package com.hotelmanagement.service;

import com.hotelmanagement.dto.request.AddressRequest;
import com.hotelmanagement.dto.response.AddressResponse;

import java.util.List;

public interface AddressService {

    AddressResponse create(AddressRequest request);

    AddressResponse update(Integer id, AddressRequest request);

    void delete(Integer id);

    AddressResponse getById(Integer id);

    List<AddressResponse> getAll();

}
