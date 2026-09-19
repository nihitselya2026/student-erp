package com.student.student_erp_backend.repository;

import com.student.student_erp_backend.entity.AcademicSubject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AcademicSubjectRepository extends JpaRepository<AcademicSubject, Long> {

    List<AcademicSubject> findByStudentIdAndSemester(String studentId, Integer semester);
}