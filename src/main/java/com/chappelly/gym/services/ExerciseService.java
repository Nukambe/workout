package com.chappelly.gym.services;

import com.chappelly.gym.entities.Exercise;

import java.util.List;
import java.util.UUID;

public interface ExerciseService {
    public void createExercise(Exercise exercise);
    public List<Exercise> getExercises();
    public Exercise getExerciseById(UUID id);
    public Exercise getExerciseByName(String name);
    public Exercise updateExercise(Exercise exercise);
    public void deleteExercise(Exercise exercise);
}
