package com.chappelly.gym.repositories;

import com.chappelly.gym.entities.User;
import com.chappelly.gym.entities.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, UUID> {
    public List<Workout> findWorkoutsByUserOrderByDateDesc(User user);
    public Workout findWorkoutByUserAndId(User user, UUID id);
    public List<Workout> findWorkoutsByUserAndDateBetween(User user, Date end, Date start);
    List<Workout> findAllByUserId(UUID userId);
}
