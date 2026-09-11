package com.hotelmanagement.service.impl;

import com.hotelmanagement.dto.request.AddressRequest;
import com.hotelmanagement.dto.response.AddressResponse;
import com.hotelmanagement.model.Address;
import com.hotelmanagement.model.Customer;
import com.hotelmanagement.repository.AddressRepository;
import com.hotelmanagement.repository.CustomerRepository;
import com.hotelmanagement.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final CustomerRepository customerRepository;

    @Override
    public AddressResponse create(AddressRequest request) {

        Address address = new Address();

        address.setCountry(request.getCountry());
        address.setCity(request.getCity());
        address.setStreet(request.getStreet());
        address.setStreetNumber(request.getStreetNumber());

        return convertToResponse(addressRepository.save(address));
    }


    @Override
    public AddressResponse update(Integer id, AddressRequest request) {

        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        address.setCountry(request.getCountry());
        address.setCity(request.getCity());
        address.setStreet(request.getStreet());
        address.setStreetNumber(request.getStreetNumber());

        return convertToResponse(addressRepository.save(address));
    }

    @Override
    public void delete(Integer id) {

        // =====================================================
        // CHECK IF ADDRESS EXISTS
        // =====================================================

        addressRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Address not found"
                        )
                );


        // =====================================================
        // CHECK IF ADDRESS IS USED BY CUSTOMER
        // =====================================================

        List<Customer> customers =
                customerRepository.findByAddress_AddressId(id);


        if (!customers.isEmpty()) {

            throw new RuntimeException(
                    "Cannot delete address because it is used by a customer."
            );

        }


        // =====================================================
        // DELETE ADDRESS
        // =====================================================

        addressRepository.deleteById(id);

    }

    @Override
    public List<AddressResponse> getAll() {

        return addressRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();

    }

    @Override
    public AddressResponse getById(Integer id) {

        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        return convertToResponse(address);

    }


    private AddressResponse convertToResponse(Address address){

        AddressResponse response = new AddressResponse();

        response.setAddressId(address.getAddressId());
        response.setCountry(address.getCountry());
        response.setCity(address.getCity());
        response.setStreet(address.getStreet());
        response.setStreetNumber(address.getStreetNumber());

        return response;

    }

}
