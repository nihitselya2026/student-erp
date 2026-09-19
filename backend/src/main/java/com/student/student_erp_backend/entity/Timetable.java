package com.student.student_erp_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Timetable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentId;
    private Integer semester;
    private String day;
    private String time;
    private String subject;
    private String faculty;
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

public String getDay() {
    return day;
}

public void setDay(String day) {
    this.day = day;
}

public String getTime() {
    return time;
}

public void setTime(String time) {
    this.time = time;
}

public String getSubject() {
    return subject;
}

public void setSubject(String subject) {
    this.subject = subject;
}

public String getFaculty() {
    return faculty;
}

public void setFaculty(String faculty) {
    this.faculty = faculty;
}

public String getRoom() {
    return room;
}

public void setRoom(String room) {
    this.room = room;
}
}