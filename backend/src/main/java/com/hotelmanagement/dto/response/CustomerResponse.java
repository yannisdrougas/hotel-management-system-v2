package com.hotelmanagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponse {

    private Integer customerId;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private AddressSummaryResponse address;
}

