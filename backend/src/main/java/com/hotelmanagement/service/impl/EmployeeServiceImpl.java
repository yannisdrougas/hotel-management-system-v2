package com.hotelmanagement.service.impl;

import java.util.Optional;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hotelmanagement.exception.ResourceNotFoundException;

import com.hotelmanagement.dto.request.EmployeeRequest;
import com.hotelmanagement.dto.response.EmployeeResponse;
import com.hotelmanagement.model.Address;
import com.hotelmanagement.model.Employee;
import com.hotelmanagement.repository.AddressRepository;
import com.hotelmanagement.repository.EmployeeRepository;
import com.hotelmanagement.service.EmployeeService;
import com.hotelmanagement.enums.EmployeePosition;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final AddressRepository addressRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository,
                               AddressRepository addressRepository) {
        this.employeeRepository = employeeRepository;
        this.addressRepository = addressRepository;
    }

    // =====================================================
    // CREATE EMPLOYEE
    // =====================================================

    @Override
    public EmployeeResponse createEmployee(EmployeeRequest request) {

        Employee employee = new Employee();

        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setPosition(request.getPosition());
        employee.setSalary(request.getSalary());
        employee.setHireDate(request.getHireDate());
        employee.setPhone(request.getPhone());

        if (request.getAddressId() != null) {

            Address address = addressRepository.findById(request.getAddressId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Address not found with id: "
                                    + request.getAddressId()));

            employee.setAddress(address);
        }

        Employee savedEmployee = employeeRepository.save(employee);

        return convertToResponse(savedEmployee);
    }

    // =====================================================
    // UPDATE EMPLOYEE
    // =====================================================

    @Override
    public EmployeeResponse updateEmployee(Integer employeeId,
                                           EmployeeRequest request) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with id: "
                                + employeeId));

        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setPosition(request.getPosition());
        employee.setSalary(request.getSalary());
        employee.setHireDate(request.getHireDate());
        employee.setPhone(request.getPhone());

        if (request.getAddressId() != null) {

            Address address = addressRepository.findById(request.getAddressId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Address not found with id: "
                                    + request.getAddressId()));

            employee.setAddress(address);
        }

        Employee updatedEmployee = employeeRepository.save(employee);

        return convertToResponse(updatedEmployee);
    }

    // =====================================================
    // DELETE EMPLOYEE
    // =====================================================

    @Override
    public void deleteEmployee(Integer employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with id: "
                                + employeeId));

        employeeRepository.delete(employee);
    }

    // =====================================================
    // GET EMPLOYEE BY ID
    // =====================================================

    @Override
    public EmployeeResponse getEmployeeById(Integer employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with id: "
                                + employeeId));

        return convertToResponse(employee);
    }

    // =====================================================
    // GET ALL EMPLOYEES
    // =====================================================

    @Override
    public List<EmployeeResponse> getAllEmployees() {

        return employeeRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // =====================================================
    // FIND BY LAST NAME
    // =====================================================

    @Override
    public List<EmployeeResponse> findByLastName(String lastName) {

        return employeeRepository.findByLastName(lastName)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // =====================================================
    // FIND BY POSITION
    // =====================================================

    @Override
    public List<EmployeeResponse> findByPosition(EmployeePosition position) {

        return employeeRepository.findByPosition(position)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // =====================================================
    // CONVERT ENTITY TO RESPONSE
    // =====================================================

    private EmployeeResponse convertToResponse(Employee employee) {

        EmployeeResponse response = new EmployeeResponse();

        response.setEmployeeId(employee.getEmployeeId());
        response.setFirstName(employee.getFirstName());
        response.setLastName(employee.getLastName());
        response.setPosition(employee.getPosition());
        response.setSalary(employee.getSalary());
        response.setHireDate(employee.getHireDate());
        response.setPhone(employee.getPhone());

        if (employee.getAddress() != null) {

            response.setAddressId(employee.getAddress().getAddressId());
            response.setCountry(employee.getAddress().getCountry());
            response.setCity(employee.getAddress().getCity());
            response.setStreet(employee.getAddress().getStreet());
            response.setStreetNumber(employee.getAddress().getStreetNumber());

        }

        return response;
    }

}

