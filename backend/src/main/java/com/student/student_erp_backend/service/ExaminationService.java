package com.student.student_erp_backend.service;

import com.student.student_erp_backend.entity.Examination;
import com.student.student_erp_backend.repository.ExaminationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExaminationService {

    private final ExaminationRepository examinationRepository;

    public ExaminationService(ExaminationRepository examinationRepository) {
        this.examinationRepository = examinationRepository;
    }

    public List<Examination> getExaminations(
            String studentId,
            Integer semester) {

        return examinationRepository
                .findByStudentIdAndSemester(studentId, semester);
    }

    public Examination saveExamination(Examination examination) {
        return examinationRepository.save(examination);
    }

    public Examination updateExamination(
            Long id,
            Examination updatedExamination) {

        Examination existingExamination =
                examinationRepository.findById(id).orElse(null);

        if (existingExamination == null) {
            return null;
        }

        existingExamination.setStudentId(
                updatedExamination.getStudentId());

        existingExamination.setSemester(
                updatedExamination.getSemester());

        existingExamination.setExamName(
                updatedExamination.getExamName());

        existingExamination.setSubject(
                updatedExamination.getSubject());

        existingExamination.setExamDate(
                updatedExamination.getExamDate());

        existingExamination.setExamTime(
                updatedExamination.getExamTime());

        existingExamination.setRoom(
                updatedExamination.getRoom());

        return examinationRepository.save(existingExamination);
    }

    public void deleteExamination(Long id) {
        examinationRepository.deleteById(id);
    }
}