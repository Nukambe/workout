package com.chappelly.gym.controllers;

import com.chappelly.gym.dto.MaxProgressRecord;
import com.chappelly.gym.entities.User;
import com.chappelly.gym.services.ExerciseService;
import com.chappelly.gym.services.WorkoutService;
import com.chappelly.gym.utility.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exercises")
public class ExercisesController {

    private final ExerciseService exerciseService;
    private final JwtUtil jwtUtil;

    public ExercisesController(ExerciseService exerciseService, JwtUtil jwtUtil) {
        this.exerciseService = exerciseService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/max-progress-report")
    public ResponseEntity<List<MaxProgressRecord>> maxProgressReport(HttpServletRequest request) {
        Optional<User> jwtUser = jwtUtil.getUserFromJwtToken(request.getCookies());
        if (jwtUser.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        User user = jwtUser.get();
        return ResponseEntity.ok(exerciseService.getMaxProgressRecords(user));
    }
}
