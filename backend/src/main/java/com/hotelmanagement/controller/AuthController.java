package com.hotelmanagement.controller;

import com.hotelmanagement.dto.AuthResponse;
import com.hotelmanagement.dto.LoginRequest;
import com.hotelmanagement.dto.RegisterRequest;
import com.hotelmanagement.model.User;
import com.hotelmanagement.service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @RequestBody RegisterRequest request
    ) {

        User user = authService.register(request);

        AuthResponse response = new AuthResponse(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
public ResponseEntity<AuthResponse> login(
        @RequestBody LoginRequest request
) {

    try {

        User user = authService.login(request);

        AuthResponse response = new AuthResponse(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole()
        );

        return ResponseEntity.ok(response);

    } catch (RuntimeException e) {

        return ResponseEntity.status(401).build();

    }

}
}