package com.hotelmanagement.dto;

import com.hotelmanagement.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

    private Integer userId;

    private String firstName;

    private String lastName;

    private String email;

    private UserRole role;

}