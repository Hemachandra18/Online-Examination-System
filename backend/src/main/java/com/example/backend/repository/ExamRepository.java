package com.example.backend.repository;

import com.example.backend.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam, Long> {
}
