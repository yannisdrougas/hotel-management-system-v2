package com.hotelmanagement.service.impl;

import com.hotelmanagement.dto.request.HotelRequest;
import com.hotelmanagement.dto.response.AddressSummaryResponse;
import com.hotelmanagement.dto.response.HotelResponse;
import com.hotelmanagement.exception.ResourceNotFoundException;
import com.hotelmanagement.model.Address;
import com.hotelmanagement.model.Hotel;
import com.hotelmanagement.repository.AddressRepository;
import com.hotelmanagement.repository.HotelRepository;
import com.hotelmanagement.service.HotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HotelServiceImpl implements HotelService {

    private final HotelRepository hotelRepository;

    private final AddressRepository addressRepository;

    @Override
    public HotelResponse create(HotelRequest request) {

        Address address = addressRepository.findById(request.getAddressId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Address not found"));

        Hotel hotel = new Hotel();

        hotel.setName(request.getName());
        hotel.setPhone(request.getPhone());
        hotel.setStars(request.getStars());
        hotel.setAddress(address);

        hotel = hotelRepository.save(hotel);

        return mapToResponse(hotel);
    }

    @Override
    public List<HotelResponse> getAll() {

        return hotelRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    @Override
    public HotelResponse getById(Integer id) {

        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Hotel not found"));

        return mapToResponse(hotel);

    }

    @Override
    public void delete(Integer id) {

        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Hotel not found"));

        hotelRepository.delete(hotel);

    }

    @Override
    public HotelResponse update(Integer id,
                                HotelRequest request) {

        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Hotel not found"));

        Address address = addressRepository.findById(request.getAddressId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Address not found"));

        hotel.setName(request.getName());
        hotel.setPhone(request.getPhone());
        hotel.setStars(request.getStars());
        hotel.setAddress(address);

        hotel = hotelRepository.save(hotel);

        return mapToResponse(hotel);

    }

    @Override
    public List<HotelResponse> findByStars(Integer stars) {

        return hotelRepository.findByStars(stars)
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    @Override
    public List<HotelResponse> findByName(String name) {

        return hotelRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    private HotelResponse mapToResponse(Hotel hotel) {

        HotelResponse response = new HotelResponse();

        response.setHotelId(hotel.getHotelId());
        response.setName(hotel.getName());
        response.setPhone(hotel.getPhone());
        response.setStars(hotel.getStars());

        Address address = hotel.getAddress();

        if (address != null) {

            AddressSummaryResponse addressResponse =
                    new AddressSummaryResponse();

            addressResponse.setAddressId(address.getAddressId());

            addressResponse.setCountry(address.getCountry());
            addressResponse.setCity(address.getCity());
            addressResponse.setStreet(address.getStreet());
            addressResponse.setStreetNumber(address.getStreetNumber());

            response.setAddress(addressResponse);
        }

        return response;
    }
}
