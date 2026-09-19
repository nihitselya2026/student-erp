package com.student.student_erp_backend.repository;

import com.student.student_erp_backend.entity.Leave;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRepository extends JpaRepository<Leave, Long> {

    List<Leave> findByStudentId(String studentId);
}