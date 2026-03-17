package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Create new user
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }
}
