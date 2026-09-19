package com.student.student_erp_backend.service;

import com.student.student_erp_backend.entity.Assignment;
import com.student.student_erp_backend.repository.AssignmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;

    public AssignmentService(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    public List<Assignment> getAssignments(String studentId, Integer semester) {
        return assignmentRepository.findByStudentIdAndSemester(studentId, semester);
    }

    public Assignment saveAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    public Assignment updateAssignment(Long id, Assignment updatedAssignment) {

        Assignment existingAssignment =
                assignmentRepository.findById(id).orElse(null);

        if (existingAssignment == null) {
            return null;
        }

        existingAssignment.setStudentId(updatedAssignment.getStudentId());
        existingAssignment.setSemester(updatedAssignment.getSemester());
        existingAssignment.setSubject(updatedAssignment.getSubject());
        existingAssignment.setTitle(updatedAssignment.getTitle());
        existingAssignment.setDescription(updatedAssignment.getDescription());
        existingAssignment.setDueDate(updatedAssignment.getDueDate());
        existingAssignment.setStatus(updatedAssignment.getStatus());

        return assignmentRepository.save(existingAssignment);
    }

    public void deleteAssignment(Long id) {
        assignmentRepository.deleteById(id);
    }
}