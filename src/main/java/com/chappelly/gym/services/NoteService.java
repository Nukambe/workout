package com.chappelly.gym.services;

import com.chappelly.gym.dto.NoteDto;
import com.chappelly.gym.entities.User;

public interface NoteService {
    public void updateNote(User user, NoteDto[] content);
    public NoteDto[] getNote(User user);
}
