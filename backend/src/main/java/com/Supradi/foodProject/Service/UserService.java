package com.Supradi.foodProject.Service;

import com.Supradi.foodProject.JwtUtils.JwtUtils;
import com.Supradi.foodProject.Model.Users;
import com.Supradi.foodProject.Repository.UserRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final  JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;
    public UserService(
            UserRepo userRepo,
            JwtUtils jwtUtils,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authManager
    ) {
        this.userRepo = userRepo;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
        this.authManager = authManager;
    }

    public ResponseEntity<String> register(Users user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);

        return new ResponseEntity<>("Registered", HttpStatus.OK);
    }


    public ResponseEntity<String> login(String email, String password) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));
        if(authentication.isAuthenticated()) {

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            String role = userDetails.getAuthorities().iterator().next().getAuthority();

            Optional<Users> user = userRepo.findByEmail(email);

            String token = jwtUtils.generateToken(email, role, user.get().getUsername());

            return new ResponseEntity<>(token, HttpStatus.OK);
        }
            return new ResponseEntity<>("Invalid credentials", HttpStatus.NOT_FOUND);
    }
}










