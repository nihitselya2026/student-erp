package com.student.student_erp_backend.repository;

import com.student.student_erp_backend.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

    List<Announcement> findByStudentId(String studentId);
}