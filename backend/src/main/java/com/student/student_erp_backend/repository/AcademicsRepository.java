package com.student.student_erp_backend.repository;

import com.student.student_erp_backend.entity.Academics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AcademicsRepository extends JpaRepository<Academics, Long> {

    List<Academics> findByStudentId(String studentId);
}