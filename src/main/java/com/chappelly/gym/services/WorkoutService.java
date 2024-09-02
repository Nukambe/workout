package com.chappelly.gym.services;

import com.chappelly.gym.entities.User;
import com.chappelly.gym.entities.Workout;

import java.util.List;
import java.util.UUID;

public interface WorkoutService {
    public List<Workout> findWorkoutsByUser(User user);
    public Workout findWorkoutByUserAndId(User user, UUID id);
    public void createWorkout(Workout workout, User user);
    public Workout updateWorkout(Workout workout, User user);
}
