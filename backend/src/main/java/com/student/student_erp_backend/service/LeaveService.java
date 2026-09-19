package com.student.student_erp_backend.service;

import com.student.student_erp_backend.entity.Leave;
import com.student.student_erp_backend.repository.LeaveRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveService {

    private final LeaveRepository leaveRepository;

    public LeaveService(LeaveRepository leaveRepository) {
        this.leaveRepository = leaveRepository;
    }

    public List<Leave> getLeaves(String studentId) {
        return leaveRepository.findByStudentId(studentId);
    }

    public Leave saveLeave(Leave leave) {
        return leaveRepository.save(leave);
    }

    public Leave updateLeave(Long id, Leave updatedLeave) {

        Leave existingLeave =
                leaveRepository.findById(id).orElse(null);

        if (existingLeave == null) {
            return null;
        }

        existingLeave.setStudentId(updatedLeave.getStudentId());
        existingLeave.setLeaveType(updatedLeave.getLeaveType());
        existingLeave.setFromDate(updatedLeave.getFromDate());
        existingLeave.setToDate(updatedLeave.getToDate());
        existingLeave.setReason(updatedLeave.getReason());
        existingLeave.setStatus(updatedLeave.getStatus());

        return leaveRepository.save(existingLeave);
    }

    public void deleteLeave(Long id) {
        leaveRepository.deleteById(id);
    }
}