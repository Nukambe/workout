package com.chappelly.gym.repositories;

import com.chappelly.gym.entities.User;
import com.chappelly.gym.entities.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    public List<Workout> findWorkoutsByUserOrderByCreatedAtDesc(User user);
    public Workout findWorkoutByUserAndId(User user, Long id);
    public void deleteWorkoutByUserAndId(User user, Long id);
}
