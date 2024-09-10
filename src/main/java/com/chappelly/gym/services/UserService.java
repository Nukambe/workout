package com.chappelly.gym.services;

import com.chappelly.gym.entities.User;
import com.chappelly.gym.entities.Workout;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface UserService {
    public User getUserByEmail(String email);
    public boolean signUp(User user);
    public User signIn(String email, String password);
    public void changePassword(UUID id, String password);
    public void addWorkout(Workout workout, User user);
    public String updateAvatar(User user, MultipartFile file);
}
