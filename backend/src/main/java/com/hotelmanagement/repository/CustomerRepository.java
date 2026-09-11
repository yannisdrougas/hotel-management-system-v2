package com.hotelmanagement.repository;

import com.hotelmanagement.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository
        extends JpaRepository<Customer, Integer> {

    List<Customer> findByLastName(String lastName);

    List<Customer> findByAddress_AddressId(Integer addressId);

}