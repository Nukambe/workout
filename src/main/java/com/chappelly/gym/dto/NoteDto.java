package com.chappelly.gym.dto;

import java.util.regex.Pattern;

public class NoteDto {

    private String title;
    private String body;
    private static final String NOTE_SEPARATOR = "<[<[<[TITLE_BODY]>]>]>";
    private static final String TITLE_PATTERN = Pattern.quote(NOTE_SEPARATOR);

    public NoteDto() {}
    public NoteDto(String title, String content) {
        this.title = title;
        this.body = content;
    }
    public NoteDto(String note) {
        String[] noteParts = note.split(TITLE_PATTERN);
        if (noteParts.length > 1) {
            this.body = noteParts[1];
        } else {
            this.body = "";
        }
        if (noteParts.length > 0) {
            this.title = noteParts[0];
        } else {
            this.title = "";
        }
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }

    public String toString() {
        return this.title + NOTE_SEPARATOR + this.body;
    }
}
