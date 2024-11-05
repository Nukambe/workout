package com.chappelly.gym.services;

import com.chappelly.gym.dto.NoteDto;
import com.chappelly.gym.entities.Note;
import com.chappelly.gym.entities.User;
import com.chappelly.gym.repositories.NoteRepository;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import java.util.regex.Pattern;

@Service
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;
    private static final String NOTE_DELIMITER = "<[<[<[NOTE_DELIMITER]>]>]>";
    private static final String NOTE_PATTERN = Pattern.quote(NOTE_DELIMITER);

    public NoteServiceImpl(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @Override
    public void updateNote(User user, NoteDto[] content) {
        Note note = this.noteRepository.findByUserId(user.getId());
        if (note == null) {
            note = new Note();
            note.setUser(user);
        }
        String[] notes = new String[content.length];
        for (int i = 0; i < content.length; i++) {
            notes[i] = content[i].toString();
        }
        note.setContent(String.join(NOTE_DELIMITER, notes));
        this.noteRepository.save(note);
    }

    @Override
    public NoteDto[] getNote(User user) {
        Note note = this.noteRepository.findByUserId(user.getId());
        if (note == null) {
            note = new Note();
            note.setUser(user);
            this.noteRepository.save(note);
            return new NoteDto[0];
        }
        String[] notes = note.getContent().split(NOTE_PATTERN);
        NoteDto[] noteDtos = new NoteDto[notes.length];
        for (int i = 0; i < notes.length; i++) {
            noteDtos[i] = new NoteDto(notes[i]);
        }
        return noteDtos;
    }
}
