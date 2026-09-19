package com.student.student_erp_backend.controller;

import com.student.student_erp_backend.entity.Timetable;
import com.student.student_erp_backend.service.TimetableService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timetable")
@CrossOrigin(origins = "http://localhost:5173")
public class TimetableController {

    private final TimetableService timetableService;

    public TimetableController(TimetableService timetableService) {
        this.timetableService = timetableService;
    }

    @GetMapping("/{studentId}/{semester}")
    public List<Timetable> getTimetable(
            @PathVariable String studentId,
            @PathVariable Integer semester) {

        return timetableService.getTimetable(studentId, semester);
    }

    @PostMapping
    public Timetable saveTimetable(@RequestBody Timetable timetable) {
        return timetableService.saveTimetable(timetable);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Timetable> updateTimetable(
            @PathVariable Long id,
            @RequestBody Timetable timetable) {

        Timetable updated =
                timetableService.updateTimetable(id, timetable);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTimetable(@PathVariable Long id) {

        timetableService.deleteTimetable(id);

        return ResponseEntity.noContent().build();
    }
}