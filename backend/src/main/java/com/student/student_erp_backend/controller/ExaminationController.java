package com.student.student_erp_backend.controller;

import com.student.student_erp_backend.entity.Examination;
import com.student.student_erp_backend.service.ExaminationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/examinations")
@CrossOrigin(origins = "http://localhost:5173")
public class ExaminationController {

    private final ExaminationService examinationService;

    public ExaminationController(ExaminationService examinationService) {
        this.examinationService = examinationService;
    }

    @GetMapping("/{studentId}/{semester}")
    public List<Examination> getExaminations(
            @PathVariable String studentId,
            @PathVariable Integer semester) {

        return examinationService.getExaminations(studentId, semester);
    }

    @PostMapping
    public Examination saveExamination(
            @RequestBody Examination examination) {

        return examinationService.saveExamination(examination);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Examination> updateExamination(
            @PathVariable Long id,
            @RequestBody Examination examination) {

        Examination updated =
                examinationService.updateExamination(id, examination);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExamination(
            @PathVariable Long id) {

        examinationService.deleteExamination(id);

        return ResponseEntity.noContent().build();
    }
}