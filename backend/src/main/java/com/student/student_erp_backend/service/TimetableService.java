package com.student.student_erp_backend.service;

import com.student.student_erp_backend.entity.Timetable;
import com.student.student_erp_backend.repository.TimetableRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TimetableService {

    private final TimetableRepository timetableRepository;

    public TimetableService(TimetableRepository timetableRepository) {
        this.timetableRepository = timetableRepository;
    }

    public List<Timetable> getTimetable(String studentId, Integer semester) {
        return timetableRepository.findByStudentIdAndSemester(studentId, semester);
    }

    public Timetable saveTimetable(Timetable timetable) {
        return timetableRepository.save(timetable);
    }

    public Timetable updateTimetable(Long id, Timetable updatedTimetable) {

        Timetable existingTimetable =
                timetableRepository.findById(id).orElse(null);

        if (existingTimetable == null) {
            return null;
        }

        existingTimetable.setStudentId(updatedTimetable.getStudentId());
        existingTimetable.setSemester(updatedTimetable.getSemester());
        existingTimetable.setDay(updatedTimetable.getDay());
        existingTimetable.setTime(updatedTimetable.getTime());
        existingTimetable.setSubject(updatedTimetable.getSubject());
        existingTimetable.setFaculty(updatedTimetable.getFaculty());
        existingTimetable.setRoom(updatedTimetable.getRoom());

        return timetableRepository.save(existingTimetable);
    }

    public void deleteTimetable(Long id) {
        timetableRepository.deleteById(id);
    }
}