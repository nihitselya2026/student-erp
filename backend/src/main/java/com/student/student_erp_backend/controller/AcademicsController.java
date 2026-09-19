package com.student.student_erp_backend.controller;

import com.student.student_erp_backend.entity.Academics;
import com.student.student_erp_backend.service.AcademicsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/academics")
@CrossOrigin(origins = "http://localhost:5173")
public class AcademicsController {

    private final AcademicsService academicsService;

    public AcademicsController(AcademicsService academicsService) {
        this.academicsService = academicsService;
    }

    @GetMapping("/{studentId}")
    public List<Academics> getAcademics(@PathVariable String studentId) {
        return academicsService.getAcademicsByStudentId(studentId);
    }

    @PostMapping
    public Academics saveAcademics(@RequestBody Academics academics) {
        return academicsService.saveAcademics(academics);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Academics> updateAcademics(
            @PathVariable Long id,
            @RequestBody Academics academics) {

        Academics updated =
                academicsService.updateAcademics(id, academics);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAcademics(@PathVariable Long id) {

        academicsService.deleteAcademics(id);

        return ResponseEntity.noContent().build();
    }
}