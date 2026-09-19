package com.student.student_erp_backend.repository;

import com.student.student_erp_backend.entity.FeeDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeeDetailsRepository extends JpaRepository<FeeDetails, Long> {

    List<FeeDetails> findByStudentIdAndSemester(
            String studentId,
            Integer semester
    );
}