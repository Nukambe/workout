package com.chappelly.gym.bootstrap;

import com.chappelly.gym.entities.User;
import com.chappelly.gym.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class BootStrapData implements CommandLineRunner {

    private final UserRepository userRepository;

    public BootStrapData(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User sampleUser = new User();
            sampleUser.setName("Wesley");
            sampleUser.setEmail("wesley@gmail.com");
            sampleUser.setPassword("password");
            userRepository.save(sampleUser);
        }
    }
}
