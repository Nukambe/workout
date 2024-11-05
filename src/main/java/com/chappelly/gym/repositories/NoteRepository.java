package com.chappelly.gym.repositories;

import com.chappelly.gym.entities.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer> {
    public Note findByUserId(UUID userId);
}
