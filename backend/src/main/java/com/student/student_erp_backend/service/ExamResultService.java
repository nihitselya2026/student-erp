package com.student.student_erp_backend.service;

import com.student.student_erp_backend.entity.ExamResult;
import com.student.student_erp_backend.repository.ExamResultRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamResultService {

    private final ExamResultRepository examResultRepository;

    public ExamResultService(ExamResultRepository examResultRepository) {
        this.examResultRepository = examResultRepository;
    }

    public List<ExamResult> getResults(
            String studentId,
            Integer semester) {

        return examResultRepository
                .findByStudentIdAndSemester(studentId, semester);
    }

    public ExamResult saveResult(ExamResult result) {
        return examResultRepository.save(result);
    }

    public ExamResult updateResult(
            Long id,
            ExamResult updatedResult) {

        ExamResult existingResult =
                examResultRepository.findById(id).orElse(null);

        if (existingResult == null) {
            return null;
        }

        existingResult.setStudentId(updatedResult.getStudentId());
        existingResult.setSemester(updatedResult.getSemester());
        existingResult.setExamName(updatedResult.getExamName());
        existingResult.setSubject(updatedResult.getSubject());
        existingResult.setMarks(updatedResult.getMarks());
        existingResult.setGrade(updatedResult.getGrade());
        existingResult.setStatus(updatedResult.getStatus());

        return examResultRepository.save(existingResult);
    }

    public void deleteResult(Long id) {
        examResultRepository.deleteById(id);
    }
}