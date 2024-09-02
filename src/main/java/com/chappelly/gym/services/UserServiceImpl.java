package com.chappelly.gym.services;

import com.chappelly.gym.entities.User;
import com.chappelly.gym.entities.Workout;
import com.chappelly.gym.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.orElse(null);
    }

    @Override
    public boolean signUp(User user) {
        Optional<User> repoUser = userRepository.findByEmail(user.getEmail());
        if (repoUser.isPresent()) {
            return false;
        }
        userRepository.save(user);
        return true;
    }

    @Override
    public User signIn(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return user.verifyPassword(password) ? user : null;
        }
        return null;
    }

    @Override
    public void changePassword(UUID id, String password) {
        Optional<User> repoUser = userRepository.findById(id);
        if (repoUser.isPresent()) {
            User user = repoUser.get();
            user.setPassword(password);
            userRepository.save(user);
        }
    }

    @Override
    public void addWorkout(Workout workout, User user) {
        user.addWorkout(workout);
        userRepository.save(user);
    }
}
