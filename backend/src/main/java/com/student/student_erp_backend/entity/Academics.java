package com.student.student_erp_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Academics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentId;

    private Integer semester;

    private Double sgpa;

    private Double cgpa;
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

public Double getSgpa() {
    return sgpa;
}

public void setSgpa(Double sgpa) {
    this.sgpa = sgpa;
}

public Double getCgpa() {
    return cgpa;
}

public void setCgpa(Double cgpa) {
    this.cgpa = cgpa;
}

}