package com.student.student_erp_backend.controller;

import com.student.student_erp_backend.entity.ExamResult;
import com.student.student_erp_backend.service.ExamResultService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam-results")
@CrossOrigin(origins = "http://localhost:5173")
public class ExamResultController {

    private final ExamResultService examResultService;

    public ExamResultController(ExamResultService examResultService) {
        this.examResultService = examResultService;
    }

    @GetMapping("/{studentId}/{semester}")
    public List<ExamResult> getResults(
            @PathVariable String studentId,
            @PathVariable Integer semester) {

        return examResultService.getResults(studentId, semester);
    }

    @PostMapping
    public ExamResult saveResult(@RequestBody ExamResult result) {
        return examResultService.saveResult(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExamResult> updateResult(
            @PathVariable Long id,
            @RequestBody ExamResult result) {

        ExamResult updated =
                examResultService.updateResult(id, result);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResult(@PathVariable Long id) {

        examResultService.deleteResult(id);

        return ResponseEntity.noContent().build();
    }
}