package com.hotelmanagement.dto.response;

import lombok.Data;

@Data
public class AddressResponse {

    private Integer addressId;

    private String country;

    private String city;

    private String street;

    private String streetNumber;

}
