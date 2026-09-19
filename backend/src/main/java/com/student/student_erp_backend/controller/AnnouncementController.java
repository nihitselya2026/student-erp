package com.student.student_erp_backend.controller;

import com.student.student_erp_backend.entity.Announcement;
import com.student.student_erp_backend.service.AnnouncementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/announcements")
@CrossOrigin(origins = "http://localhost:5173")
public class AnnouncementController {

    private final AnnouncementService announcementService;

    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @GetMapping("/{studentId}")
    public List<Announcement> getAnnouncements(
            @PathVariable String studentId) {

        return announcementService.getAnnouncements(studentId);
    }

    @PostMapping
    public Announcement saveAnnouncement(
            @RequestBody Announcement announcement) {

        return announcementService.saveAnnouncement(announcement);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Announcement> updateAnnouncement(
            @PathVariable Long id,
            @RequestBody Announcement announcement) {

        Announcement updated =
                announcementService.updateAnnouncement(id, announcement);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnouncement(
            @PathVariable Long id) {

        announcementService.deleteAnnouncement(id);

        return ResponseEntity.noContent().build();
    }
}