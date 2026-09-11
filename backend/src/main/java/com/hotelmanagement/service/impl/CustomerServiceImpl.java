package com.hotelmanagement.service.impl;

import com.hotelmanagement.dto.request.CustomerRequest;
import com.hotelmanagement.dto.response.CustomerResponse;
import com.hotelmanagement.exception.ResourceNotFoundException;
import com.hotelmanagement.model.Address;
import com.hotelmanagement.model.Customer;
import com.hotelmanagement.repository.AddressRepository;
import com.hotelmanagement.repository.CustomerRepository;
import com.hotelmanagement.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.hotelmanagement.dto.response.AddressSummaryResponse;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl
        implements CustomerService {

    private final CustomerRepository customerRepository;

    private final AddressRepository addressRepository;

    @Override
    public CustomerResponse create(CustomerRequest request) {

        Address address =
                addressRepository.findById(request.getAddressId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Address not found"));

        Customer customer = new Customer();

        customer.setFirstName(request.getFirstName());
        customer.setLastName(request.getLastName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setAddress(address);

        customer = customerRepository.save(customer);

        return mapToResponse(customer);
    }

    private CustomerResponse mapToResponse(Customer customer) {

        CustomerResponse response = new CustomerResponse();

        response.setCustomerId(customer.getCustomerId());
        response.setFirstName(customer.getFirstName());
        response.setLastName(customer.getLastName());
        response.setEmail(customer.getEmail());
        response.setPhone(customer.getPhone());

        Address address = customer.getAddress();

        AddressSummaryResponse addressResponse =
                new AddressSummaryResponse();

        addressResponse.setCountry(address.getCountry());
        addressResponse.setCity(address.getCity());
        addressResponse.setStreet(address.getStreet());
        addressResponse.setStreetNumber(address.getStreetNumber());

        response.setAddress(addressResponse);

        return response;
    }

    @Override
    public List<CustomerResponse> getAll() {

        return customerRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    @Override
    public CustomerResponse getById(Integer id){

        Customer customer =
                customerRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Customer not found"));

        return mapToResponse(customer);

    }

    @Override
    public void delete(Integer id){

        Customer customer =
                customerRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Customer not found"));

        customerRepository.delete(customer);

    }

    @Override
    public List<CustomerResponse> findByLastName(String lastName) {

        return customerRepository.findByLastName(lastName)
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    @Override
    public CustomerResponse update(
            Integer id,
            CustomerRequest request){

        Customer customer =
                customerRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Customer not found"));

        Address address =
                addressRepository.findById(request.getAddressId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Address not found"));

        customer.setFirstName(request.getFirstName());
        customer.setLastName(request.getLastName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setAddress(address);

        customer =
                customerRepository.save(customer);

        return mapToResponse(customer);

    }
}
