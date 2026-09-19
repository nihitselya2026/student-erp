package com.student.student_erp_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_settings")
public class UserSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentId;
    private Boolean emailNotifications;
    private Boolean pushNotifications;

    private Boolean academicNotifications;
    private Boolean assignmentNotifications;
    private Boolean examNotifications;
    private Boolean feeNotifications;
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

public Boolean getEmailNotifications() {
    return emailNotifications;
}

public void setEmailNotifications(Boolean emailNotifications) {
    this.emailNotifications = emailNotifications;
}

public Boolean getPushNotifications() {
    return pushNotifications;
}

public void setPushNotifications(Boolean pushNotifications) {
    this.pushNotifications = pushNotifications;
}
public Boolean getAcademicNotifications() {
    return academicNotifications;
}

public void setAcademicNotifications(Boolean academicNotifications) {
    this.academicNotifications = academicNotifications;
}

public Boolean getAssignmentNotifications() {
    return assignmentNotifications;
}

public void setAssignmentNotifications(Boolean assignmentNotifications) {
    this.assignmentNotifications = assignmentNotifications;
}

public Boolean getExamNotifications() {
    return examNotifications;
}

public void setExamNotifications(Boolean examNotifications) {
    this.examNotifications = examNotifications;
}

public Boolean getFeeNotifications() {
    return feeNotifications;
}

public void setFeeNotifications(Boolean feeNotifications) {
    this.feeNotifications = feeNotifications;
}
}