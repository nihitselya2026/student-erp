package com.student.student_erp_backend.repository;

import com.student.student_erp_backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {

    Student findByStudentId(String studentId);

    Student findByStudentIdAndEmail(
            String studentId,
            String email
    );
}