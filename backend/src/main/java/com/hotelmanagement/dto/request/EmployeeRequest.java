package com.hotelmanagement.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.hotelmanagement.enums.EmployeePosition;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeRequest {

    private String firstName;

    private String lastName;

    private EmployeePosition position;

    private BigDecimal salary;

    private LocalDate hireDate;

    private String phone;

    private Integer addressId;

}
