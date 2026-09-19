package com.student.student_erp_backend.controller;

import com.student.student_erp_backend.entity.Student;
import com.student.student_erp_backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<Student> login(
            @RequestBody LoginRequest request) {

        Student student = authService.login(
                request.getStudentId(),
                request.getPassword()
        );

        if (student == null) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok(student);
    }

    // =========================
// SIGNUP - SEND OTP
// =========================

@PostMapping("/signup/send-otp")
public ResponseEntity<String> sendSignupOtp(
        @RequestBody Student student) {

    boolean sent =
            authService.sendSignupOtp(student);

    if (!sent) {
        return ResponseEntity.status(409)
                .body("Student ID already exists");
    }

    return ResponseEntity.ok(
            "Signup OTP sent successfully"
    );
}


// =========================
// SIGNUP - VERIFY OTP
// =========================

@PostMapping("/signup/verify-otp")
public ResponseEntity<String> verifySignupOtp(
        @RequestBody VerifyOtpRequest request) {

    boolean verified =
            authService.verifySignupOtp(
                    request.getStudentId(),
                    request.getOtp()
            );

    if (!verified) {
        return ResponseEntity.status(400)
                .body("Invalid or expired OTP");
    }

    return ResponseEntity.ok(
            "Account created successfully"
    );
}

    // =========================
    // CHANGE PASSWORD
    // =========================

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordRequest request) {

        boolean changed = authService.changePassword(
                request.getStudentId(),
                request.getOldPassword(),
                request.getNewPassword()
        );

        if (!changed) {
            return ResponseEntity.status(400)
                    .body("Invalid student ID or old password");
        }

        return ResponseEntity.ok(
                "Password changed successfully"
        );
    }

    // =========================
    // FORGOT PASSWORD - SEND OTP
    // =========================

    @PostMapping("/forgot-password/send-otp")
    public ResponseEntity<String> sendOtp(
            @RequestBody ForgotPasswordRequest request) {

        boolean sent = authService.sendOtp(
                request.getStudentId(),
                request.getEmail()
        );

        if (!sent) {
            return ResponseEntity.status(404)
                    .body("Student ID and email do not match");
        }

        return ResponseEntity.ok(
                "OTP sent successfully"
        );
    }

    // =========================
    // FORGOT PASSWORD - VERIFY OTP
    // =========================

    @PostMapping("/forgot-password/verify-otp")
    public ResponseEntity<String> verifyOtp(
            @RequestBody VerifyOtpRequest request) {

        boolean verified = authService.verifyOtp(
                request.getStudentId(),
                request.getOtp()
        );

        if (!verified) {
            return ResponseEntity.status(400)
                    .body("Invalid or expired OTP");
        }

        return ResponseEntity.ok(
                "OTP verified successfully"
        );
    }

    // =========================
    // FORGOT PASSWORD - RESET PASSWORD
    // =========================

    @PostMapping("/forgot-password/reset-password")
    public ResponseEntity<String> resetPassword(
            @RequestBody ResetPasswordRequest request) {

        boolean reset = authService.resetPassword(
                request.getStudentId(),
                request.getOtp(),
                request.getNewPassword()
        );

        if (!reset) {
            return ResponseEntity.status(400)
                    .body("Invalid or expired OTP");
        }

        return ResponseEntity.ok(
                "Password reset successfully"
        );
    }

    // =========================
    // LOGIN REQUEST
    // =========================

    public static class LoginRequest {

        private String studentId;
        private String password;

        public String getStudentId() {
            return studentId;
        }

        public void setStudentId(String studentId) {
            this.studentId = studentId;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    // =========================
    // CHANGE PASSWORD REQUEST
    // =========================

    public static class ChangePasswordRequest {

        private String studentId;
        private String oldPassword;
        private String newPassword;

        public String getStudentId() {
            return studentId;
        }

        public void setStudentId(String studentId) {
            this.studentId = studentId;
        }

        public String getOldPassword() {
            return oldPassword;
        }

        public void setOldPassword(String oldPassword) {
            this.oldPassword = oldPassword;
        }

        public String getNewPassword() {
            return newPassword;
        }

        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }
    }

    // =========================
    // FORGOT PASSWORD REQUEST
    // =========================

    public static class ForgotPasswordRequest {

        private String studentId;
        private String email;

        public String getStudentId() {
            return studentId;
        }

        public void setStudentId(String studentId) {
            this.studentId = studentId;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }

    // =========================
    // VERIFY OTP REQUEST
    // =========================

    public static class VerifyOtpRequest {

        private String studentId;
        private String otp;

        public String getStudentId() {
            return studentId;
        }

        public void setStudentId(String studentId) {
            this.studentId = studentId;
        }

        public String getOtp() {
            return otp;
        }

        public void setOtp(String otp) {
            this.otp = otp;
        }
    }

    // =========================
    // RESET PASSWORD REQUEST
    // =========================

    public static class ResetPasswordRequest {

        private String studentId;
        private String otp;
        private String newPassword;

        public String getStudentId() {
            return studentId;
        }

        public void setStudentId(String studentId) {
            this.studentId = studentId;
        }

        public String getOtp() {
            return otp;
        }

        public void setOtp(String otp) {
            this.otp = otp;
        }

        public String getNewPassword() {
            return newPassword;
        }

        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }
    }
}