package com.student.student_erp_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@Table(name = "student_leave")
public class Leave {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentId;
    private String leaveType;
    private String fromDate;
    private String toDate;
    private String reason;
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

public String getLeaveType() {
    return leaveType;
}

public void setLeaveType(String leaveType) {
    this.leaveType = leaveType;
}

public String getFromDate() {
    return fromDate;
}

public void setFromDate(String fromDate) {
    this.fromDate = fromDate;
}

public String getToDate() {
    return toDate;
}

public void setToDate(String toDate) {
    this.toDate = toDate;
}

public String getReason() {
    return reason;
}

public void setReason(String reason) {
    this.reason = reason;
}

public String getStatus() {
    return status;
}

public void setStatus(String status) {
    this.status = status;
}
}