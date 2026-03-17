package com.example.backend.controller;

import com.example.backend.entity.Question;
import com.example.backend.repository.QuestionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
@CrossOrigin(origins = "http://localhost:5173")
public class QuestionController {

    private final QuestionRepository questionRepository;

    public QuestionController(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    // Get questions by exam
    @GetMapping("/exam/{examId}")
    public List<Question> getQuestionsByExam(@PathVariable Long examId) {
        return questionRepository.findByExamId(examId);
    }

    @DeleteMapping("/{id}")
public void deleteQuestion(@PathVariable Long id) {
    questionRepository.deleteById(id);
}

    // Add question
    @PostMapping
    public Question addQuestion(@RequestBody Question question) {
        return questionRepository.save(question);
    }
}
