package com.chappelly.gym.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "sets")
public class Sets {

    @Id()
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    private UUID id;

    @Column(name = "number", nullable = false)
    private Short number;

    @Column(name = "reps")
    private Short reps = 0;

    @Column(name = "ratio")
    private Double ratio = 100.0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id", nullable = false)
    @JsonIgnore
    private Exercise exercise;

    public Sets() {}

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Short getReps() { return reps; }
    public void setReps(Short reps) { this.reps = reps; }

    public Double getRatio() { return ratio; }
    public void setRatio(Double ratio) { this.ratio = ratio; }

    public Short getNumber() { return number; }
    public void setNumber(Short number) { this.number = number; }

    public Exercise getExercise() { return exercise; }
    public void setExercise(Exercise exercise) { this.exercise = exercise; }
}
