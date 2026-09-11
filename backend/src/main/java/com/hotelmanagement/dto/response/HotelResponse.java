package com.hotelmanagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotelResponse {

    private Integer hotelId;

    private String name;

    private String phone;

    private Integer stars;

    private AddressSummaryResponse address;

}