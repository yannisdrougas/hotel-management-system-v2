package com.hotelmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotelmanagement.model.Employee;
import com.hotelmanagement.enums.EmployeePosition;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    List<Employee> findByLastName(String lastName);

    List<Employee> findByPosition(EmployeePosition position);

}
