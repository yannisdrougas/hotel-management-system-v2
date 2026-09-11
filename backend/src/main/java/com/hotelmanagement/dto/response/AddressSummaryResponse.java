package com.hotelmanagement.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressSummaryResponse {

    private Integer addressId;
    private String country;
    private String city;
    private String street;
    private String streetNumber;
}