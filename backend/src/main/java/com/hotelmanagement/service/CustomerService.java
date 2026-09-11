package com.hotelmanagement.service;

import com.hotelmanagement.dto.request.CustomerRequest;
import com.hotelmanagement.dto.response.CustomerResponse;

import java.util.List;

public interface CustomerService {

    CustomerResponse create(CustomerRequest request);

    CustomerResponse update(Integer id,
                            CustomerRequest request);

    void delete(Integer id);

    CustomerResponse getById(Integer id);

    List<CustomerResponse> getAll();

    List<CustomerResponse> findByLastName(String lastName);

}
