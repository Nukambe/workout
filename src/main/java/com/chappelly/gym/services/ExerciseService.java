package com.chappelly.gym.services;

import com.chappelly.gym.dto.MaxProgressRecord;
import com.chappelly.gym.entities.Exercise;
import com.chappelly.gym.entities.User;

import java.util.List;
import java.util.UUID;

public interface ExerciseService {
    public List<MaxProgressRecord> getMaxProgressRecords(User user);
}
