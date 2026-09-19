package com.student.student_erp_backend.service;

import com.student.student_erp_backend.entity.Attendance;
import com.student.student_erp_backend.repository.AttendanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public AttendanceService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    public List<Attendance> getAttendanceByStudentId(String studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }

    public Attendance saveAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    public Attendance updateAttendance(Long id, Attendance updatedAttendance) {
        Attendance existingAttendance =
                attendanceRepository.findById(id).orElse(null);

        if (existingAttendance == null) {
            return null;
        }

        existingAttendance.setStudentId(updatedAttendance.getStudentId());
        existingAttendance.setSubject(updatedAttendance.getSubject());
        existingAttendance.setTotalClasses(updatedAttendance.getTotalClasses());
        existingAttendance.setPresentClasses(updatedAttendance.getPresentClasses());
        existingAttendance.setAbsentClasses(updatedAttendance.getAbsentClasses());
        existingAttendance.setStatus(updatedAttendance.getStatus());

        return attendanceRepository.save(existingAttendance);
    }

    public void deleteAttendance(Long id) {
        attendanceRepository.deleteById(id);
    }
}