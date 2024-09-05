package com.chappelly.gym.controllers;

import com.chappelly.gym.dto.LoginRequest;
import com.chappelly.gym.entities.User;
import com.chappelly.gym.services.UserService;
import com.chappelly.gym.utility.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    private final boolean isProduction = "production".equals(System.getenv("ENV"));

    @GetMapping("")
    public ResponseEntity<Void> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        Optional<User> jwtUser = jwtUtil.getUserFromJwtToken(request.getCookies());
        if (jwtUser.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        User user = jwtUser.get();
        String jwt = jwtUtil.generateJwtToken(user.getEmail());
        setJwtCookie(jwt, response);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        User user = userService.signIn(loginRequest.getEmail(), loginRequest.getPassword());
        if (user == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        String jwt = jwtUtil.generateJwtToken(user.getEmail());
        setJwtCookie(jwt, response);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        boolean successful = userService.signUp(user);
        if (successful) {
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        return ResponseEntity.badRequest().body("ERROR: Signup Failed!");
    }

    private void setJwtCookie(String jwt, HttpServletResponse response) {
        Cookie cookie = new Cookie("JWT_TOKEN", jwt);
        cookie.setHttpOnly(true);
        cookie.setSecure(isProduction);
        cookie.setPath("/");
        cookie.setMaxAge(7 * 24 * 60 * 60);
        cookie.setAttribute("SameSite", "Strict");
        response.addCookie(cookie);
    }
}
