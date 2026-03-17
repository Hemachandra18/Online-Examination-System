package com.example.backend.controller;

import com.example.backend.entity.Exam;
import com.example.backend.repository.ExamRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exams")
@CrossOrigin(origins = "http://localhost:5173")
public class ExamController {

    private final ExamRepository examRepository;

    public ExamController(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    // Get all exams
    @GetMapping
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    // Create new exam
    @PostMapping
    public Exam createExam(@RequestBody Exam exam) {
        return examRepository.save(exam);
    }
}
