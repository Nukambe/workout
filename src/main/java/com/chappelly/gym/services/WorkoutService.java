package com.chappelly.gym.services;

import com.chappelly.gym.dto.CommunityWorkout;
import com.chappelly.gym.entities.User;
import com.chappelly.gym.entities.Workout;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface WorkoutService {
    public List<Workout> findWorkoutsByUser(User user);
    public Workout findWorkoutByUserAndId(User user, UUID id);
    public void createWorkout(Workout workout, User user);
    public void updateWorkout(Workout workout, User user);
    public void deleteWorkout(UUID id, User user);
    public List<Workout> findWorkoutsInDateRange(User user, String startDate, String endDate);
    public List<CommunityWorkout> findAll();
    List<Workout> findAllWorkouts();
}
