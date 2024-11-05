package com.chappelly.gym.controllers;

import com.chappelly.gym.dto.CommunityWorkout;
import com.chappelly.gym.entities.User;
import com.chappelly.gym.entities.Workout;
import com.chappelly.gym.services.WorkoutService;
import com.chappelly.gym.utility.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutsController {

    private final WorkoutService workoutService;
    private final JwtUtil jwtUtil;

    public WorkoutsController(WorkoutService workoutService, JwtUtil jwtUtil) {
        this.workoutService = workoutService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("")
    public ResponseEntity<List<Workout>> getWorkouts(HttpServletRequest request) {
        Optional<User> jwtUser = jwtUtil.getUserFromJwtToken(request.getCookies());
        if (jwtUser.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        User user = jwtUser.get();
        return ResponseEntity.ok(workoutService.findWorkoutsByUser(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Workout> getWorkoutById(@PathVariable UUID id, HttpServletRequest request) {
        Optional<User> jwtUser = jwtUtil.getUserFromJwtToken(request.getCookies());
        if (jwtUser.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        User user = jwtUser.get();
        return ResponseEntity.ok(workoutService.findWorkoutByUserAndId(user, id));
    }

    @PostMapping("")
    public ResponseEntity<Void> createWorkout(@RequestBody Workout workout, HttpServletRequest request) {
        Optional<User> jwtUser = jwtUtil.getUserFromJwtToken(request.getCookies());
        if (jwtUser.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        User user = jwtUser.get();
        workoutService.createWorkout(workout, user);
        return ResponseEntity.ok().build();
    }

    @PutMapping("")
    public ResponseEntity<Void> updateWorkout(@RequestBody Workout workout, HttpServletRequest request) {
        Optional<User> jwtUser = jwtUtil.getUserFromJwtToken(request.getCookies());
        if (jwtUser.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        User user = jwtUser.get();
        this.workoutService.updateWorkout(workout, user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkout(@PathVariable UUID id, HttpServletRequest request) {
        Optional<User> jwtUser = jwtUtil.getUserFromJwtToken(request.getCookies());
        if (jwtUser.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        User user = jwtUser.get();
        this.workoutService.deleteWorkout(id, user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Workout>> searchWorkouts(
            @RequestParam("start") String start,
            @RequestParam("end") String end,
            HttpServletRequest request
    ) {
        Optional<User> jwtUser = jwtUtil.getUserFromJwtToken(request.getCookies());
        if (jwtUser.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        User user = jwtUser.get();
        return ResponseEntity.ok(this.workoutService.findWorkoutsInDateRange(user, start, end));
    }

    @GetMapping("/community")
    public ResponseEntity<List<CommunityWorkout>> getCommunityWorkouts(HttpServletRequest request) {
        Optional<User> jwtUser = jwtUtil.getUserFromJwtToken(request.getCookies());
        if (jwtUser.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        return ResponseEntity.ok(this.workoutService.findAll());
    }
}
