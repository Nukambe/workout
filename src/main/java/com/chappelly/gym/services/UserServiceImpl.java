package com.chappelly.gym.services;

import com.chappelly.gym.utility.S3Util;
import com.chappelly.gym.entities.User;
import com.chappelly.gym.entities.Workout;
import com.chappelly.gym.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final S3Util s3Util;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, S3Util s3Util) {
        this.userRepository = userRepository;
        this.s3Util = s3Util;
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

    @Override
    public String updateAvatar(User user, MultipartFile file) {
        try {
            Path tempDir = Files.createTempDirectory("avatars");
            File tempFile = new File(tempDir.toFile(), file.getOriginalFilename());
            file.transferTo(tempFile);

            String keyName = "avatars/" + user.getId();
            s3Util.uploadAvatar(tempFile.getAbsolutePath(), keyName);
            Files.deleteIfExists(tempFile.toPath());

            String url = "https://gymnav.s3.us-east-1.amazonaws.com/" + keyName;
            user.setAvatarUrl(url);
            userRepository.save(user);
            return url;
        } catch (IOException e) {
//            throw new RuntimeException(e);
            return null;
        }
    }

    @Override
    public List<User> findAll() {
        List<User> users = new ArrayList<>();
        for (User user : userRepository.findAll()) {
            users.add(user.getSafeUser());
        }
        return users;
    }
}
