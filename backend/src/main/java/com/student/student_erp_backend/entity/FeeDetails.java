package com.student.student_erp_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class FeeDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentId;
    private Integer semester;
    private Double totalFee;
    private Double paidFee;
    private Double pendingFee;
    private String dueDate;
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

public Double getTotalFee() {
    return totalFee;
}

public void setTotalFee(Double totalFee) {
    this.totalFee = totalFee;
}

public Double getPaidFee() {
    return paidFee;
}

public void setPaidFee(Double paidFee) {
    this.paidFee = paidFee;
}

public Double getPendingFee() {
    return pendingFee;
}

public void setPendingFee(Double pendingFee) {
    this.pendingFee = pendingFee;
}

public String getDueDate() {
    return dueDate;
}

public void setDueDate(String dueDate) {
    this.dueDate = dueDate;
}

public String getStatus() {
    return status;
}

public void setStatus(String status) {
    this.status = status;
}
}