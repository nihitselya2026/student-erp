package com.student.student_erp_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentId;
    private String title;
    private String message;
    private String createdAt;
    private String type;
    private Boolean isRead;
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

public String getTitle() {
    return title;
}

public void setTitle(String title) {
    this.title = title;
}

public String getMessage() {
    return message;
}

public void setMessage(String message) {
    this.message = message;
}

public String getCreatedAt() {
    return createdAt;
}

public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
}

public String getType() {
    return type;
}

public void setType(String type) {
    this.type = type;
}

public Boolean getIsRead() {
    return isRead;
}

public void setIsRead(Boolean isRead) {
    this.isRead = isRead;
}
}