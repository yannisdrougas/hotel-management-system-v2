package com.hotelmanagement.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotelRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String phone;

    @Min(1)
    @Max(5)
    private Integer stars;

    private Integer addressId;

}
