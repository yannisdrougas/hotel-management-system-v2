package com.hotelmanagement.service;

import java.util.List;

import com.hotelmanagement.dto.request.EmployeeRequest;
import com.hotelmanagement.dto.response.EmployeeResponse;
import com.hotelmanagement.enums.EmployeePosition;

public interface EmployeeService {

    // Create
    EmployeeResponse createEmployee(EmployeeRequest request);

    // Update
    EmployeeResponse updateEmployee(Integer employeeId, EmployeeRequest request);

    // Delete
    void deleteEmployee(Integer employeeId);

    // Get by ID
    EmployeeResponse getEmployeeById(Integer employeeId);

    // Get all
    List<EmployeeResponse> getAllEmployees();

    // Search by last name
    List<EmployeeResponse> findByLastName(String lastName);

    // Search by position
    List<EmployeeResponse> findByPosition(EmployeePosition position);

}