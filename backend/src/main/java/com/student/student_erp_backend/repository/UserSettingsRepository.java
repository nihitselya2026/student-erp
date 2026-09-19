package com.student.student_erp_backend.repository;

import com.student.student_erp_backend.entity.UserSettings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserSettingsRepository extends JpaRepository<UserSettings, Long> {

    Optional<UserSettings> findByStudentId(String studentId);
}