package com.chappelly.gym.entities;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class SetsTest {

    private Sets sets;
    private Exercise exercise;

    @BeforeEach
    void setUp() {
        sets = new Sets();
        exercise = new Exercise();
    }

    @Test
    void getId() {
        // Arrange
        UUID id = new UUID(0, 0);
        sets.setId(id);

        // Act
        UUID setsId = sets.getId();

        // Assert
        assertEquals(id, setsId, "The id should match the expected value.");
    }

    @Test
    void setId() {
        // Arrange
        UUID id = new UUID(0, 0);

        // Act
        sets.setId(id);

        // Assert
        assertEquals(id, sets.getId(), "The setId() should correctly set the id.");
    }

    @Test
    void getReps() {
        // Arrange
        String expectedReps = "10";
        sets.setReps(expectedReps);

        // Act
        String actualReps = sets.getReps();

        // Assert
        assertEquals(expectedReps, actualReps, "The reps should match the expected value.");
    }

    @Test
    void setReps() {
        // Arrange
        String reps = "12";

        // Act
        sets.setReps(reps);

        // Assert
        assertEquals(reps, sets.getReps(), "The setReps() should correctly set the number of reps.");
    }

    @Test
    void getRatio() {
        // Arrange
        double expectedRatio = 98.5;
        sets.setRatio(expectedRatio);

        // Act
        double actualRatio = sets.getRatio();

        // Assert
        assertEquals(expectedRatio, actualRatio, "The ratio should match the expected value.");
    }

    @Test
    void setRatio() {
        // Arrange
        double ratio = 54.5;

        // Act
        sets.setRatio(ratio);

        // Assert
        assertEquals(ratio, sets.getRatio(), "The setRatio() should correctly set the ratio.");
    }

    @Test
    void getNumber() {
        // Arrange
        Short expectedNumber = 5;
        sets.setNumber(expectedNumber);

        // Act
        Short actualNumber = sets.getNumber();

        // Assert
        assertEquals(expectedNumber, actualNumber, "The number should match the expected value.");
    }

    @Test
    void setNumber() {
        // Arrange
        Short number = 8;

        // Act
        sets.setNumber(number);

        // Assert
        assertEquals(number, sets.getNumber(), "The setNumber() should correctly set the number.");
    }

    @Test
    void getExercise() {
        // Arrange
        Exercise expectedExercise = new Exercise();
        expectedExercise.setName("Bench Press");
        sets.setExercise(expectedExercise);

        // Act
        Exercise actualExercise = sets.getExercise();

        // Assert
        assertEquals(expectedExercise, actualExercise, "The exercise should match the expected value.");
    }

    @Test
    void setExercise() {
        // Arrange
        Exercise exercise = new Exercise();
        exercise.setName("Squats");

        // Act
        sets.setExercise(exercise);

        // Assert
        assertEquals(exercise, sets.getExercise(), "The setExercise() should correctly set the exercise.");
    }
}