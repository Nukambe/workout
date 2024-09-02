package com.chappelly.gym.repositories;

import com.chappelly.gym.entities.Exercise;
import com.chappelly.gym.entities.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    public void deleteAllByWorkout(Workout workout);
}
