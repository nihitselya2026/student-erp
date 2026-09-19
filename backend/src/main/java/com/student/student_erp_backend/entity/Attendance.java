package com.student.student_erp_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Attendance {

    @Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String studentId;

private String subject;

private Integer totalClasses;

private Integer presentClasses;

private Integer absentClasses;

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

public String getSubject() {
    return subject;
}

public void setSubject(String subject) {
    this.subject = subject;
}

public Integer getTotalClasses() {
    return totalClasses;
}

public void setTotalClasses(Integer totalClasses) {
    this.totalClasses = totalClasses;
}

public Integer getPresentClasses() {
    return presentClasses;
}

public void setPresentClasses(Integer presentClasses) {
    this.presentClasses = presentClasses;
}

public Integer getAbsentClasses() {
    return absentClasses;
}

public void setAbsentClasses(Integer absentClasses) {
    this.absentClasses = absentClasses;
}

public String getStatus() {
    return status;
}

public void setStatus(String status) {
    this.status = status;
}
}