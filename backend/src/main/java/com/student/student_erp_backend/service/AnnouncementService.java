package com.student.student_erp_backend.service;

import com.student.student_erp_backend.entity.Announcement;
import com.student.student_erp_backend.repository.AnnouncementRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    public AnnouncementService(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    public List<Announcement> getAnnouncements(String studentId) {
        return announcementRepository.findByStudentId(studentId);
    }

    public Announcement saveAnnouncement(Announcement announcement) {
        return announcementRepository.save(announcement);
    }

    public Announcement updateAnnouncement(
            Long id,
            Announcement updatedAnnouncement) {

        Announcement existingAnnouncement =
                announcementRepository.findById(id).orElse(null);

        if (existingAnnouncement == null) {
            return null;
        }

        existingAnnouncement.setStudentId(
                updatedAnnouncement.getStudentId());

        existingAnnouncement.setTitle(
                updatedAnnouncement.getTitle());

        existingAnnouncement.setMessage(
                updatedAnnouncement.getMessage());

        existingAnnouncement.setCreatedAt(
                updatedAnnouncement.getCreatedAt());

        existingAnnouncement.setPriority(
                updatedAnnouncement.getPriority());

        return announcementRepository.save(existingAnnouncement);
    }

    public void deleteAnnouncement(Long id) {
        announcementRepository.deleteById(id);
    }
}