package com.chappelly.gym.services;

import com.chappelly.gym.dto.MaxProgressRecord;
import com.chappelly.gym.entities.Exercise;
import com.chappelly.gym.entities.User;
import com.chappelly.gym.entities.Workout;
import com.chappelly.gym.repositories.ExerciseRepository;
import com.chappelly.gym.repositories.WorkoutRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExerciseServiceImpl implements ExerciseService {

    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;

    public ExerciseServiceImpl(WorkoutRepository workoutRepository, ExerciseRepository exerciseRepository) {
        this.workoutRepository = workoutRepository;
        this.exerciseRepository = exerciseRepository;
    }

    @Override
    public List<MaxProgressRecord> getMaxProgressRecords(User user) {
        Map<String, MaxProgressRecord> maxProgressRecords = new HashMap<>();
        List<Workout> workouts = workoutRepository.findWorkoutsByUserOrderByCreatedAtDesc(user);
        for (Workout workout : workouts) {
            for (Exercise exercise : workout.getExercises()) {
                MaxProgressRecord record;
                if (!maxProgressRecords.containsKey(exercise.getName())) { // Does exercise already exist?
                    record = new MaxProgressRecord(exercise.getName()); // No - Create a new record
                    record.push(new MaxProgressRecord.WeightRecord(workout.getDate(), exercise.getMaxWeight())); // Add workout date and exercise weight
                    maxProgressRecords.put(exercise.getName(), record); // Add record
                } else {
                    record = maxProgressRecords.get(exercise.getName()); // Yes - Get the current record
                    record.push(new MaxProgressRecord.WeightRecord(workout.getDate(), exercise.getMaxWeight())); // Add workout date and exercise weight
                }
            }
        }

        return new ArrayList<>(maxProgressRecords.values());
    }
}
