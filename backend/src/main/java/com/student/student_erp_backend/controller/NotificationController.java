package com.student.student_erp_backend.controller;

import com.student.student_erp_backend.entity.Notification;
import com.student.student_erp_backend.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/{studentId}")
    public List<Notification> getNotifications(
            @PathVariable String studentId) {

        return notificationService.getNotifications(studentId);
    }

    @PostMapping
    public Notification saveNotification(
            @RequestBody Notification notification) {

        return notificationService.saveNotification(notification);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notification> updateNotification(
            @PathVariable Long id,
            @RequestBody Notification notification) {

        Notification updated =
                notificationService.updateNotification(id, notification);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(
            @PathVariable Long id) {

        notificationService.deleteNotification(id);

        return ResponseEntity.noContent().build();
    }
        @PutMapping("/read-all/{studentId}")
    public ResponseEntity<Void> markAllAsRead(
            @PathVariable String studentId) {

        notificationService.markAllAsRead(studentId);

        return ResponseEntity.ok().build();
    }
}