package com.hotelmanagement.dto.response;

import com.hotelmanagement.enums.RoomStatus;
import com.hotelmanagement.enums.RoomType;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomResponse {

    private Integer roomId;

    private String roomNumber;

    private RoomType roomType;

    private Integer floor;

    private BigDecimal price;

    private RoomStatus status;

    private HotelSummaryResponse hotel;

}
