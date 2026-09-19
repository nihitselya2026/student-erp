package com.student.student_erp_backend.service;

import com.student.student_erp_backend.entity.Student;
import com.student.student_erp_backend.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    public Student updateStudent(Long id, Student updatedStudent) {
    Student existingStudent = studentRepository.findById(id).orElse(null);

    if (existingStudent == null) {
        return null;
    }

    existingStudent.setStudentId(updatedStudent.getStudentId());
    existingStudent.setPassword(updatedStudent.getPassword());
    existingStudent.setName(updatedStudent.getName());
    existingStudent.setDateOfBirth(updatedStudent.getDateOfBirth());
    existingStudent.setGender(updatedStudent.getGender());
    existingStudent.setBloodGroup(updatedStudent.getBloodGroup());
    existingStudent.setRollNumber(updatedStudent.getRollNumber());
    existingStudent.setDepartment(updatedStudent.getDepartment());
    existingStudent.setCourse(updatedStudent.getCourse());
    existingStudent.setSemester(updatedStudent.getSemester());
    existingStudent.setAdmissionYear(updatedStudent.getAdmissionYear());
    existingStudent.setEmail(updatedStudent.getEmail());
    existingStudent.setPhone(updatedStudent.getPhone());
    existingStudent.setAddress(updatedStudent.getAddress());

    return studentRepository.save(existingStudent);
}
}