package com.chappelly.gym.entities;

import org.hibernate.jdbc.Work;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    User user;
    Workout workout;

    @BeforeEach
    void setUp() {
        user = new User();
        workout = new Workout();
    }

    @Test
    void hashPassword() {
        user.setPassword("password");
        user.hashPassword();
        assertNull(user.getPassword());
        assertTrue(user.verifyPassword("password"));
    }

    @Test
    void getSafeUser() {
        user.setPassword("password");
        user.hashPassword();
        User safeUser = user.getSafeUser();
        assertNotNull(safeUser);
        assertNull(safeUser.getPasswordHash());
    }

    @Test
    void verifyPassword() {
        user.setPassword("password");
        user.hashPassword();
        assertNull(user.getPassword());
        assertTrue(user.verifyPassword("password"));
        assertFalse(user.verifyPassword("wrong password"));
    }

    @Test
    void addWorkout() {
        user.addWorkout(workout);
        List<Workout> workouts = user.getWorkouts();
        assertEquals(workout, workouts.getFirst());
    }

    @Test
    void getId() {
        UUID id = UUID.randomUUID();
        user.setId(id);
        UUID userId = user.getId();
        assertNotNull(userId);
        assertEquals(id, userId);
    }

    @Test
    void setId() {
        UUID id = UUID.randomUUID();
        user.setId(id);
        UUID userId = user.getId();
        assertNotNull(userId);
        assertEquals(id, userId);
    }

    @Test
    void getName() {
        String name = "Test G. McTesterson";
        user.setName(name);
        String userName = user.getName();
        assertNotNull(userName);
        assertEquals(name, userName);
    }

    @Test
    void setName() {
        String name = "Test S. McTesterson";
        user.setName(name);
        String userName = user.getName();
        assertNotNull(userName);
        assertEquals(name, userName);
    }

    @Test
    void getEmail() {
        String email = "get@testmail.com";
        user.setEmail(email);
        String userEmail = user.getEmail();
        assertNotNull(userEmail);
        assertEquals(email, userEmail);
    }

    @Test
    void setEmail() {
        String email = "set@testmail.com";
        user.setEmail(email);
        String userEmail = user.getEmail();
        assertNotNull(userEmail);
        assertEquals(email, userEmail);
    }

    @Test
    void isEmailVerified() {
        assertFalse(user.isEmailVerified());
    }

    @Test
    void setEmailVerified() {
        user.setEmailVerified(true);
        assertTrue(user.isEmailVerified());
        user.setEmailVerified(false);
        assertFalse(user.isEmailVerified());
    }

    @Test
    void getPasswordHash() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = "password";
        user.setPassword(password);
        user.hashPassword();
        String passwordHash = user.getPasswordHash();
        assertNotNull(passwordHash);
        assertTrue(encoder.matches(password, passwordHash));
    }

    @Test
    void setPasswordHash() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = "password";
        String hashedPassword = encoder.encode(password);
        user.setPasswordHash(hashedPassword);
        assertEquals(hashedPassword, user.getPasswordHash());
    }

    @Test
    void getAvatarUrl() {
        assertEquals("https://gym-nav.chappelly.com/default-avatar.png", user.getAvatarUrl());
    }

    @Test
    void setAvatarUrl() {
        user.setAvatarUrl("https://gym-nav.chappelly.com");
        assertEquals("https://gym-nav.chappelly.com", user.getAvatarUrl());
    }

    @Test
    void getLastLogin() {
        Date date = new Date();
        user.setLastLogin(date);
        assertEquals(date, user.getLastLogin());
    }

    @Test
    void setLastLogin() {
        Date date = new Date();
        user.setLastLogin(date);
        assertEquals(date, user.getLastLogin());
    }

    @Test
    void getPasswordResetToken() {
        String token = UUID.randomUUID().toString();
        user.setPasswordResetToken(token);
        assertEquals(token, user.getPasswordResetToken());
    }

    @Test
    void setPasswordResetToken() {
        String token = UUID.randomUUID().toString();
        user.setPasswordResetToken(token);
        assertEquals(token, user.getPasswordResetToken());
    }

    @Test
    void getWorkouts() {
        List<Workout> workouts = user.getWorkouts();
        assertNotNull(workouts);
    }

    @Test
    void setWorkouts() {
        List<Workout> workouts = new ArrayList<>();
        user.setWorkouts(workouts);
        assertEquals(workouts, user.getWorkouts());
    }

    @Test
    void getPassword() {
        String password = "password";
        user.setPassword(password);
        assertEquals(password, user.getPassword());
    }

    @Test
    void setPassword() {
        String password = "password";
        user.setPassword(password);
        assertEquals(password, user.getPassword());
    }

    @Test
    void getConfirmPassword() {
        String password = "password";
        user.setConfirmPassword(password);
        assertEquals(password, user.getConfirmPassword());
    }

    @Test
    void setConfirmPassword() {
        String password = "password";
        user.setConfirmPassword(password);
        assertEquals(password, user.getConfirmPassword());
    }
}