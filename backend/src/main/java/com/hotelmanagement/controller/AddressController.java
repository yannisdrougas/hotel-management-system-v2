package com.hotelmanagement.controller;

import com.hotelmanagement.dto.request.AddressRequest;
import com.hotelmanagement.dto.response.AddressResponse;
import com.hotelmanagement.service.AddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @PostMapping
    public AddressResponse create(@Valid @RequestBody AddressRequest request){

        return addressService.create(request);

    }

    @GetMapping
    public List<AddressResponse> getAll(){

        return addressService.getAll();

    }

    @GetMapping("/{id}")
    public AddressResponse getById(@PathVariable Integer id){

        return addressService.getById(id);

    }

    @PutMapping("/{id}")
    public AddressResponse update(@PathVariable Integer id,
                                  @Valid @RequestBody AddressRequest request){

        return addressService.update(id,request);

    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){

        addressService.delete(id);

    }

}
