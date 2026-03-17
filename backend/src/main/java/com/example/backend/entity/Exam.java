package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private Integer duration;

    public Exam() {
    }

    public Exam(String title, Integer duration) {
        this.title = title;
        this.duration = duration;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }
}
