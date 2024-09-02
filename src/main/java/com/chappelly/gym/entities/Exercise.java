package com.chappelly.gym.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "exercises")
public class Exercise {

    @Id()
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "note")
    private String note;

    @ManyToOne()
    @JsonIgnore
    private Workout workout;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Date updatedAt;

    @Column(name = "max_weight")
    private Double maxWeight;

    @OneToMany(mappedBy = "exercise", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @OrderBy("number ASC")
    @JsonInclude
    private Set<Sets> sets = new HashSet<>();

    public Exercise() {}

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public Workout getWorkout() { return this.workout; }
    public void setWorkout(Workout workout) { this.workout = workout; }

    public Set<Sets> getSets() { return this.sets; }
    public void setSets(Set<Sets> sets) { this.sets = sets; }

    public Double getMaxWeight() { return maxWeight; }
    public void setMaxWeight(Double maxWeight) { this.maxWeight = maxWeight; }
}
