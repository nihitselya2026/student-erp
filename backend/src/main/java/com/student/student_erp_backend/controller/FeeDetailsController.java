package com.student.student_erp_backend.controller;

import com.student.student_erp_backend.entity.FeeDetails;
import com.student.student_erp_backend.service.FeeDetailsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fee-details")
@CrossOrigin(origins = "http://localhost:5173")
public class FeeDetailsController {

    private final FeeDetailsService feeDetailsService;

    public FeeDetailsController(FeeDetailsService feeDetailsService) {
        this.feeDetailsService = feeDetailsService;
    }

    @GetMapping("/{studentId}/{semester}")
    public List<FeeDetails> getFeeDetails(
            @PathVariable String studentId,
            @PathVariable Integer semester) {

        return feeDetailsService.getFeeDetails(studentId, semester);
    }

    @PostMapping
    public FeeDetails saveFeeDetails(
            @RequestBody FeeDetails feeDetails) {

        return feeDetailsService.saveFeeDetails(feeDetails);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeeDetails> updateFeeDetails(
            @PathVariable Long id,
            @RequestBody FeeDetails feeDetails) {

        FeeDetails updated =
                feeDetailsService.updateFeeDetails(id, feeDetails);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeeDetails(
            @PathVariable Long id) {

        feeDetailsService.deleteFeeDetails(id);

        return ResponseEntity.noContent().build();
    }
}