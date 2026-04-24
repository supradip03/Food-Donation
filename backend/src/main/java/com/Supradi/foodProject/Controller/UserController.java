package com.Supradi.foodProject.Controller;

import com.Supradi.foodProject.Model.LoginUser;
import com.Supradi.foodProject.Model.Users;
import com.Supradi.foodProject.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Users user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginUser loginUser) {
        return userService.login(loginUser.getEmail(), loginUser.getPassword());
    }
}
