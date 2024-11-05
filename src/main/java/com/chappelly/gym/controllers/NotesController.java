package com.chappelly.gym.controllers;

import com.chappelly.gym.dto.NoteDto;
import com.chappelly.gym.entities.Note;
import com.chappelly.gym.entities.User;
import com.chappelly.gym.services.NoteService;
import com.chappelly.gym.utility.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Optional;

@RestController
@RequestMapping("/api/notes")
public class NotesController {

    private final NoteService noteService;
    private final JwtUtil jwtUtil;

    public NotesController(final NoteService noteService, final JwtUtil jwtUtil) {
        this.noteService = noteService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("")
    public ResponseEntity<NoteDto[]> getNotes(HttpServletRequest request) {
        Optional<User> jwtUser = jwtUtil.getUserFromJwtToken(request.getCookies());
        if (jwtUser.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        User user = jwtUser.get();
        NoteDto[] notes = noteService.getNote(user);
        System.out.println(Arrays.toString(notes));
        return ResponseEntity.ok(notes);
    }

    @PutMapping("")
    public ResponseEntity<Void> updateNote(@RequestBody NoteDto[] content, HttpServletRequest request) {
        Optional<User> jwtUser = jwtUtil.getUserFromJwtToken(request.getCookies());
        if (jwtUser.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        User user = jwtUser.get();
        noteService.updateNote(user, content);
        return ResponseEntity.ok().build();
    }
}
