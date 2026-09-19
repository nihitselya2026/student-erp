package com.student.student_erp_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Examination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentId;
    private Integer semester;
    private String examName;
    private String subject;
    private String examDate;
    private String examTime;
    private String room;
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

public String getExamName() {
    return examName;
}

public void setExamName(String examName) {
    this.examName = examName;
}

public String getSubject() {
    return subject;
}

public void setSubject(String subject) {
    this.subject = subject;
}

public String getExamDate() {
    return examDate;
}

public void setExamDate(String examDate) {
    this.examDate = examDate;
}

public String getExamTime() {
    return examTime;
}

public void setExamTime(String examTime) {
    this.examTime = examTime;
}

public String getRoom() {
    return room;
}

public void setRoom(String room) {
    this.room = room;
}
}