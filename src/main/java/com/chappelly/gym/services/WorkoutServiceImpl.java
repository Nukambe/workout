package com.chappelly.gym.services;

import com.chappelly.gym.entities.*;
import com.chappelly.gym.repositories.ExerciseRepository;
import com.chappelly.gym.repositories.SetsRepository;
import com.chappelly.gym.repositories.WorkoutRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

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
        return this.workoutRepository.findWorkoutsByUserOrderByCreatedAtDesc(user);
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
    @Transactional
    public Workout updateWorkout(Workout newWorkout, User user) {
        Workout workout = this.workoutRepository.findWorkoutByUserAndId(user, newWorkout.getId());
        this.exerciseRepository.deleteAllByWorkout(workout);

        for (Exercise exercise : newWorkout.getExercises()) {
            exercise.setId(null);
            exercise.setWorkout(workout);
            exercise = this.exerciseRepository.save(exercise);
            for (Sets set : exercise.getSets()) {
                set.setExercise(exercise);
                this.setsRepository.save(set);
            }
        }
        return workout;
    }

    @Override
    public Workout findWorkoutByUserAndId(User user, UUID id) {
        return this.workoutRepository.findWorkoutByUserAndId(user, id);
    }
}
