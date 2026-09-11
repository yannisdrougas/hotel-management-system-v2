package com.hotelmanagement.dto.request;

import com.hotelmanagement.enums.RoomStatus;
import com.hotelmanagement.enums.RoomType;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomRequest {

    @NotBlank
    private String roomNumber;

    @NotNull
    private RoomType roomType;

    @Min(0)
    private Integer floor;

    @DecimalMin("0.00")
    private BigDecimal price;

    @NotNull
    private RoomStatus status;

    @NotNull
    private Integer hotelId;

}
