package com.student.student_erp_backend.service;

import com.student.student_erp_backend.entity.Notification;
import com.student.student_erp_backend.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<Notification> getNotifications(String studentId) {
        return notificationRepository.findByStudentId(studentId);
    }

    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public Notification updateNotification(
            Long id,
            Notification updatedNotification) {

        Notification existingNotification =
                notificationRepository.findById(id).orElse(null);

        if (existingNotification == null) {
            return null;
        }

        existingNotification.setStudentId(updatedNotification.getStudentId());
        existingNotification.setTitle(updatedNotification.getTitle());
        existingNotification.setMessage(updatedNotification.getMessage());
        existingNotification.setCreatedAt(updatedNotification.getCreatedAt());
        existingNotification.setType(updatedNotification.getType());
        existingNotification.setIsRead(updatedNotification.getIsRead());

        return notificationRepository.save(existingNotification);
    }

    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }
    public void markAllAsRead(String studentId) {
    List<Notification> notifications =
            notificationRepository.findByStudentId(studentId);

    for (Notification notification : notifications) {
        notification.setIsRead(true);
    }

    notificationRepository.saveAll(notifications);
}
}