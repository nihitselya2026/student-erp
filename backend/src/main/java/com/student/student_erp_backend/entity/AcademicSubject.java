package com.student.student_erp_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class AcademicSubject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentId;
    private Integer semester;
    private String subjectName;
    private String subjectCode;
    private Integer marks;
    private String grade;
    private String status;
public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public String getStudentId() {
    return studentId;
}

public void setStudentId(String studentId) {
    this.studentId = studentId;
}

public Integer getSemester() {
    return semester;
}

public void setSemester(Integer semester) {
    this.semester = semester;
}

public String getSubjectName() {
    return subjectName;
}

public void setSubjectName(String subjectName) {
    this.subjectName = subjectName;
}

public String getSubjectCode() {
    return subjectCode;
}

public void setSubjectCode(String subjectCode) {
    this.subjectCode = subjectCode;
}

public Integer getMarks() {
    return marks;
}

public void setMarks(Integer marks) {
    this.marks = marks;
}

public String getGrade() {
    return grade;
}

public void setGrade(String grade) {
    this.grade = grade;
}

public String getStatus() {
    return status;
}

public void setStatus(String status) {
    this.status = status;
}
}