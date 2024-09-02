package com.chappelly.gym.repositories;

import com.chappelly.gym.entities.Sets;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;
import java.util.UUID;

@Repository
public interface SetsRepository extends JpaRepository<Sets, UUID> {
    public void deleteAllByExerciseIdIn(Set<Long> exerciseIds);
}
