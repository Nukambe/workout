package com.chappelly.gym.services;

import com.chappelly.gym.dto.CommunityWorkout;
import com.chappelly.gym.entities.*;
import com.chappelly.gym.repositories.ExerciseRepository;
import com.chappelly.gym.repositories.SetsRepository;
import com.chappelly.gym.repositories.WorkoutRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
public class WorkoutServiceImpl implements WorkoutService {

    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;
    private final SetsRepository setsRepository;

    public WorkoutServiceImpl(WorkoutRepository workoutRepository, ExerciseRepository exerciseRepository, SetsRepository setsRepository) {
        this.workoutRepository = workoutRepository;
        this.exerciseRepository = exerciseRepository;
        this.setsRepository = setsRepository;
    }

    @Override
    public List<Workout> findWorkoutsByUser(User user) {
        return this.workoutRepository.findWorkoutsByUserOrderByDateDesc(user);
    }

    @Override
    public void createWorkout(Workout workout, User user) {
        workout.setUser(user);
        Workout repoWorkout = this.workoutRepository.save(workout);
        for (Exercise exercise : workout.getExercises()) {
            exercise.setWorkout(repoWorkout);
            Exercise repoExercise = this.exerciseRepository.save(exercise);
            for (Sets set : exercise.getSets()) {
                set.setExercise(repoExercise);
                this.setsRepository.save(set);
            }
        }
    }

    @Override
    public void updateWorkout(Workout workout, User user) {
        Workout repoWorkout = this.workoutRepository.findWorkoutByUserAndId(user, workout.getId());
        repoWorkout.setName(workout.getName());
        repoWorkout.setDate(convertDateToUTC(workout.getDate()));
        this.exerciseRepository.deleteAll(repoWorkout.getExercises());
        for (Exercise exercise : workout.getExercises()) {
            exercise.setId(null);
            exercise.setWorkout(repoWorkout);
            Exercise repoExercise = this.exerciseRepository.save(exercise);
            for (Sets set : exercise.getSets()) {
                set.setId(null);
                set.setExercise(repoExercise);
                this.setsRepository.save(set);
            }
        }
    }

    @Override
    public Workout findWorkoutByUserAndId(User user, UUID id) {
        return this.workoutRepository.findWorkoutByUserAndId(user, id);
    }

    @Override
    public void deleteWorkout(UUID id, User user) {
        Workout workout = this.workoutRepository.findWorkoutByUserAndId(user, id);
        workoutRepository.delete(workout);
    }

    @Override
    public List<Workout> findWorkoutsInDateRange(User user, String startDate, String endDate) {
        Date start = convertISOToDate(startDate);
        Date end = convertISOToDate(endDate);
        return this.workoutRepository.findWorkoutsByUserAndDateBetween(user, end, start);
    }

    @Override
    public List<CommunityWorkout> findAll() {
        List<CommunityWorkout> communityWorkouts = new ArrayList<>();
        List<Workout> workouts = this.workoutRepository.findAll();

        for (Workout workout : workouts) {
            communityWorkouts.add(new CommunityWorkout(workout));
        }
        return communityWorkouts;
    }

    private Date convertISOToDate(String iso) {
        Instant instant = Instant.parse(iso);
        return Date.from(instant);
    }

    private Date convertDateToUTC(Date date) {
        Instant instant = date.toInstant();
        return Date.from(instant);
    }
}
