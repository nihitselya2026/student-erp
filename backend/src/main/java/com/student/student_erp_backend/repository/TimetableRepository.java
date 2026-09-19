package com.student.student_erp_backend.repository;

import com.student.student_erp_backend.entity.Timetable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimetableRepository extends JpaRepository<Timetable, Long> {

    List<Timetable> findByStudentIdAndSemester(
            String studentId,
            Integer semester
    );
}