package com.student.student_erp_backend.controller;

import com.student.student_erp_backend.entity.UserSettings;
import com.student.student_erp_backend.service.UserSettingsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "http://localhost:5173")
public class UserSettingsController {

    private final UserSettingsService userSettingsService;

    public UserSettingsController(UserSettingsService userSettingsService) {
        this.userSettingsService = userSettingsService;
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<UserSettings> getSettings(
            @PathVariable String studentId) {

        UserSettings settings =
                userSettingsService.getSettings(studentId);

        if (settings == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(settings);
    }

    @PostMapping
    public UserSettings saveSettings(
            @RequestBody UserSettings settings) {

        return userSettingsService.saveSettings(settings);
    }

    @PutMapping("/{studentId}")
    public ResponseEntity<UserSettings> updateSettings(
            @PathVariable String studentId,
            @RequestBody UserSettings settings) {

        UserSettings updated =
                userSettingsService.updateSettings(studentId, settings);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }
}