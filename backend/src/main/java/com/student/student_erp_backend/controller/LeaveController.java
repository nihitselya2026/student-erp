package com.student.student_erp_backend.controller;

import com.student.student_erp_backend.entity.Leave;
import com.student.student_erp_backend.service.LeaveService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "http://localhost:5173")
public class LeaveController {

    private final LeaveService leaveService;

    public LeaveController(LeaveService leaveService) {
        this.leaveService = leaveService;
    }

    @GetMapping("/{studentId}")
    public List<Leave> getLeaves(
            @PathVariable String studentId) {

        return leaveService.getLeaves(studentId);
    }

    @PostMapping
    public Leave saveLeave(@RequestBody Leave leave) {

        return leaveService.saveLeave(leave);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Leave> updateLeave(
            @PathVariable Long id,
            @RequestBody Leave leave) {

        Leave updated =
                leaveService.updateLeave(id, leave);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeave(
            @PathVariable Long id) {

        leaveService.deleteLeave(id);

        return ResponseEntity.noContent().build();
    }
}