package com.student.student_erp_backend.repository;

import com.student.student_erp_backend.entity.ExamResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {

    List<ExamResult> findByStudentIdAndSemester(
            String studentId,
            Integer semester
    );
}