package com.student.student_erp_backend.repository;

import com.student.student_erp_backend.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    List<Assignment> findByStudentIdAndSemester(
            String studentId,
            Integer semester
    );
}