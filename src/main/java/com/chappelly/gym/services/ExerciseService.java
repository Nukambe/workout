package com.chappelly.gym.services;

import com.chappelly.gym.entities.Exercise;

import java.util.List;

public interface ExerciseService {
    public void createExercise(Exercise exercise);
    public List<Exercise> getExercises();
    public Exercise getExerciseById(int id);
    public Exercise getExerciseByName(String name);
    public Exercise updateExercise(Exercise exercise);
    public void deleteExercise(Exercise exercise);
}
