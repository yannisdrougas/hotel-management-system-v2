package com.hotelmanagement.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.hotelmanagement.enums.EmployeePosition;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeResponse {

    private Integer employeeId;

    private String firstName;

    private String lastName;

    private EmployeePosition position;

    private BigDecimal salary;

    private LocalDate hireDate;

    private String phone;

    // Στοιχεία διεύθυνσης
    private Integer addressId;
    private String country;
    private String city;
    private String street;
    private String streetNumber;

}
