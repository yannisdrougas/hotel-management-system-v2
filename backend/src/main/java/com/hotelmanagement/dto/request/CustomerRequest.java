package com.hotelmanagement.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRequest {

    @NotBlank(message = "Το όνομα είναι υποχρεωτικό")
    private String firstName;

    @NotBlank(message = "Το επώνυμο είναι υποχρεωτικό")
    private String lastName;

    @Email(message = "Μη έγκυρη διεύθυνση email")
    @NotBlank(message = "Το email είναι υποχρεωτικό")
    private String email;

    @NotBlank(message = "Το τηλέφωνο είναι υποχρεωτικό")
    private String phone;

    private Integer addressId;
}