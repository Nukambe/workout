package com.chappelly.gym.dto;

import com.chappelly.gym.entities.User;
import com.chappelly.gym.entities.Workout;

public class CommunityWorkout {

    private User user;
    private Workout workout;

    public CommunityWorkout() {}
    public CommunityWorkout(Workout workout) {
        this.workout = workout;
        this.user = workout.getUser().getSafeUser();
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Workout getWorkout() {
        return workout;
    }

    public void setWorkout(Workout workout) {
        this.workout = workout;
    }
}
