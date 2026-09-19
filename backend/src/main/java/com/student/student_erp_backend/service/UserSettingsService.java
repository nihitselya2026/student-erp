package com.student.student_erp_backend.service;

import com.student.student_erp_backend.entity.UserSettings;
import com.student.student_erp_backend.repository.UserSettingsRepository;
import org.springframework.stereotype.Service;

@Service
public class UserSettingsService {

    private final UserSettingsRepository userSettingsRepository;

    public UserSettingsService(UserSettingsRepository userSettingsRepository) {
        this.userSettingsRepository = userSettingsRepository;
    }

    public UserSettings getSettings(String studentId) {
        return userSettingsRepository.findByStudentId(studentId).orElse(null);
    }

    public UserSettings saveSettings(UserSettings settings) {
        return userSettingsRepository.save(settings);
    }

    public UserSettings updateSettings(
            String studentId,
            UserSettings updatedSettings) {

        UserSettings existingSettings =
                userSettingsRepository.findByStudentId(studentId).orElse(null);

        if (existingSettings == null) {
            return null;
        }

        existingSettings.setEmailNotifications(
                updatedSettings.getEmailNotifications());

        existingSettings.setPushNotifications(
                updatedSettings.getPushNotifications());
        existingSettings.setAcademicNotifications(
    updatedSettings.getAcademicNotifications()
);

existingSettings.setAssignmentNotifications(
    updatedSettings.getAssignmentNotifications()
);

existingSettings.setExamNotifications(
    updatedSettings.getExamNotifications()
);

existingSettings.setFeeNotifications(
    updatedSettings.getFeeNotifications()
);

        return userSettingsRepository.save(existingSettings);
    }
}