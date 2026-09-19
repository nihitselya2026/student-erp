package com.student.student_erp_backend.controller;

import com.student.student_erp_backend.entity.AcademicSubject;
import com.student.student_erp_backend.service.AcademicSubjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/academic-subjects")
@CrossOrigin(origins = "http://localhost:5173")
public class AcademicSubjectController {

    private final AcademicSubjectService academicSubjectService;

    public AcademicSubjectController(AcademicSubjectService academicSubjectService) {
        this.academicSubjectService = academicSubjectService;
    }

    @GetMapping("/{studentId}/{semester}")
    public List<AcademicSubject> getSubjects(
            @PathVariable String studentId,
            @PathVariable Integer semester) {

        return academicSubjectService.getSubjects(studentId, semester);
    }

    @PostMapping
    public AcademicSubject saveSubject(@RequestBody AcademicSubject subject) {
        return academicSubjectService.saveSubject(subject);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AcademicSubject> updateSubject(
            @PathVariable Long id,
            @RequestBody AcademicSubject subject) {

        AcademicSubject updated =
                academicSubjectService.updateSubject(id, subject);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable Long id) {

        academicSubjectService.deleteSubject(id);

        return ResponseEntity.noContent().build();
    }
}