package com.chappelly.gym.controllers;

import com.chappelly.gym.utility.S3Util;
import com.chappelly.gym.entities.User;
import com.chappelly.gym.services.UserService;
import com.chappelly.gym.utility.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UsersController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/avatar")
    public ResponseEntity<String> uploadAvatar(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        Optional<User> jwtUser = jwtUtil.getUserFromJwtToken(request.getCookies());

        if (jwtUser.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (file.isEmpty()) return ResponseEntity.badRequest().build();

        User user = jwtUser.get();
        String url = userService.updateAvatar(user, file);

        if (url != null) { return ResponseEntity.ok(url); }
        else { return ResponseEntity.badRequest().build(); }
    }

    @GetMapping("/community")
    public ResponseEntity<List<User>> getUsers(HttpServletRequest request) {
        Optional<User> jwtUser = jwtUtil.getUserFromJwtToken(request.getCookies());
        if (jwtUser.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        return ResponseEntity.ok(this.userService.findAll());
    }
}
