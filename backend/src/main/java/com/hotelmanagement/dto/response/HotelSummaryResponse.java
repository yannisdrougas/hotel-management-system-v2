package com.hotelmanagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotelSummaryResponse {

    private Integer hotelId;

    private String name;

    private Integer stars;

}
