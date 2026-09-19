package com.student.student_erp_backend.service;

import com.student.student_erp_backend.entity.Academics;
import com.student.student_erp_backend.repository.AcademicsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AcademicsService {

    private final AcademicsRepository academicsRepository;

    public AcademicsService(AcademicsRepository academicsRepository) {
        this.academicsRepository = academicsRepository;
    }

    public List<Academics> getAcademicsByStudentId(String studentId) {
        return academicsRepository.findByStudentId(studentId);
    }

    public Academics saveAcademics(Academics academics) {
        return academicsRepository.save(academics);
    }

    public Academics updateAcademics(Long id, Academics updatedAcademics) {

        Academics existingAcademics =
                academicsRepository.findById(id).orElse(null);

        if (existingAcademics == null) {
            return null;
        }

        existingAcademics.setStudentId(updatedAcademics.getStudentId());
        existingAcademics.setSemester(updatedAcademics.getSemester());
        existingAcademics.setSgpa(updatedAcademics.getSgpa());
        existingAcademics.setCgpa(updatedAcademics.getCgpa());

        return academicsRepository.save(existingAcademics);
    }

    public void deleteAcademics(Long id) {
        academicsRepository.deleteById(id);
    }
}