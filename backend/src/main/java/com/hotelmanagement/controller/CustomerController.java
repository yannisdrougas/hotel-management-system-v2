package com.hotelmanagement.controller;

import com.hotelmanagement.dto.request.CustomerRequest;
import com.hotelmanagement.dto.response.CustomerResponse;
import com.hotelmanagement.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    /**
     * Δημιουργία νέου πελάτη
     */
    @PostMapping
    public ResponseEntity<CustomerResponse> createCustomer(
            @Valid @RequestBody CustomerRequest request) {

        CustomerResponse response = customerService.create(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Επιστροφή όλων των πελατών
     */
    @GetMapping
    public ResponseEntity<List<CustomerResponse>> getAllCustomers() {

        return ResponseEntity.ok(customerService.getAll());

    }

    /**
     * Επιστροφή πελάτη με βάση το id
     */
    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> getCustomerById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(customerService.getById(id));

    }

    /**
     * Ενημέρωση στοιχείων πελάτη
     */
    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponse> updateCustomer(
            @PathVariable Integer id,
            @Valid @RequestBody CustomerRequest request) {

        return ResponseEntity.ok(customerService.update(id, request));

    }

    /**
     * Διαγραφή πελάτη
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(
            @PathVariable Integer id) {

        customerService.delete(id);

        return ResponseEntity.noContent().build();

    }

    @GetMapping("/search")
    public ResponseEntity<List<CustomerResponse>> searchByLastName(
            @RequestParam String lastName) {

        return ResponseEntity.ok(
                customerService.findByLastName(lastName));

    }

}