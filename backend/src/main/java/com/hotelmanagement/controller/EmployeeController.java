package com.hotelmanagement.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.hotelmanagement.dto.request.EmployeeRequest;
import com.hotelmanagement.dto.response.EmployeeResponse;
import com.hotelmanagement.enums.EmployeePosition;
import com.hotelmanagement.service.EmployeeService;

@RestController
@RequestMapping("/api/employees")
//@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // =====================================================
    // CREATE
    // =====================================================

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EmployeeResponse createEmployee(
            @RequestBody EmployeeRequest request) {

        return employeeService.createEmployee(request);
    }

    // =====================================================
    // GET ALL
    // =====================================================

    @GetMapping
    public List<EmployeeResponse> getAllEmployees() {

        return employeeService.getAllEmployees();
    }

    // =====================================================
    // GET BY ID
    // =====================================================

    @GetMapping("/{id}")
    public EmployeeResponse getEmployeeById(
            @PathVariable Integer id) {

        return employeeService.getEmployeeById(id);
    }

    // =====================================================
    // UPDATE
    // =====================================================

    @PutMapping("/{id}")
    public EmployeeResponse updateEmployee(
            @PathVariable Integer id,
            @RequestBody EmployeeRequest request) {

        return employeeService.updateEmployee(id, request);
    }

    // =====================================================
    // DELETE
    // =====================================================

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEmployee(
            @PathVariable Integer id) {

        employeeService.deleteEmployee(id);
    }

    // =====================================================
    // SEARCH BY LAST NAME
    // =====================================================

    @GetMapping("/lastname/{lastName}")
    public List<EmployeeResponse> findByLastName(
            @PathVariable String lastName) {

        return employeeService.findByLastName(lastName);
    }

    // =====================================================
    // SEARCH BY POSITION
    // =====================================================

    @GetMapping("/position/{position}")
    public List<EmployeeResponse> findByPosition(
            @PathVariable EmployeePosition position) {

        return employeeService.findByPosition(position);
    }

}
