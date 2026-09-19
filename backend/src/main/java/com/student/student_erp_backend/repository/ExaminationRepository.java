package com.student.student_erp_backend.repository;

import com.student.student_erp_backend.entity.Examination;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExaminationRepository extends JpaRepository<Examination, Long> {

    List<Examination> findByStudentIdAndSemester(
            String studentId,
            Integer semester
    );
}