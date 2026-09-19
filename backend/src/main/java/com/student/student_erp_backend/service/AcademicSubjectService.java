package com.student.student_erp_backend.service;

import com.student.student_erp_backend.entity.AcademicSubject;
import com.student.student_erp_backend.repository.AcademicSubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AcademicSubjectService {

    private final AcademicSubjectRepository academicSubjectRepository;

    public AcademicSubjectService(AcademicSubjectRepository academicSubjectRepository) {
        this.academicSubjectRepository = academicSubjectRepository;
    }

    public List<AcademicSubject> getSubjects(String studentId, Integer semester) {
        return academicSubjectRepository.findByStudentIdAndSemester(studentId, semester);
    }

    public AcademicSubject saveSubject(AcademicSubject subject) {
        return academicSubjectRepository.save(subject);
    }

    public AcademicSubject updateSubject(Long id, AcademicSubject updatedSubject) {

        AcademicSubject existingSubject =
                academicSubjectRepository.findById(id).orElse(null);

        if (existingSubject == null) {
            return null;
        }

        existingSubject.setStudentId(updatedSubject.getStudentId());
        existingSubject.setSemester(updatedSubject.getSemester());
        existingSubject.setSubjectName(updatedSubject.getSubjectName());
        existingSubject.setSubjectCode(updatedSubject.getSubjectCode());
        existingSubject.setMarks(updatedSubject.getMarks());
        existingSubject.setGrade(updatedSubject.getGrade());
        existingSubject.setStatus(updatedSubject.getStatus());

        return academicSubjectRepository.save(existingSubject);
    }

    public void deleteSubject(Long id) {
        academicSubjectRepository.deleteById(id);
    }
}