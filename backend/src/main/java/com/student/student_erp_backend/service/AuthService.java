package com.student.student_erp_backend.service;

import com.student.student_erp_backend.entity.Student;
import com.student.student_erp_backend.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class AuthService {

    private final StudentRepository studentRepository;

    private final Map<String, String> otpStore = new HashMap<>();
    private final Map<String, Long> otpExpiryStore = new HashMap<>();

    private final Map<String, Student> signupStudentStore = new HashMap<>();
    private final Map<String, String> signupOtpStore = new HashMap<>();
    private final Map<String, Long> signupOtpExpiryStore = new HashMap<>();

    private final EmailService emailService;

    public AuthService(
            StudentRepository studentRepository,
            EmailService emailService) {

        this.studentRepository = studentRepository;
        this.emailService = emailService;
    }

    // =========================
    // LOGIN
    // =========================

    public Student login(
            String studentId,
            String password) {

        Student student =
                studentRepository.findByStudentId(studentId);

        if (student != null
                && student.getPassword() != null
                && student.getPassword().equals(password)) {

            return student;
        }

        return null;
    }

    // =========================
    // CHANGE PASSWORD
    // =========================

    public boolean changePassword(
            String studentId,
            String oldPassword,
            String newPassword) {

        Student student =
                studentRepository.findByStudentId(studentId);

        if (student == null) {
            return false;
        }

        if (student.getPassword() == null
                || !student.getPassword().equals(oldPassword)) {

            return false;
        }

        student.setPassword(newPassword);
        studentRepository.save(student);

        return true;
    }

    // =========================
    // SIGNUP
    // =========================

    public boolean studentIdExists(String studentId) {

    Student existingStudent =
            studentRepository.findByStudentId(studentId);

    return existingStudent != null;
}
   public boolean sendSignupOtp(Student student) {

    if (studentIdExists(student.getStudentId())) {
        return false;
    }

    String otp = String.format(
            "%06d",
            new Random().nextInt(1000000)
    );

    long expiryTime =
            System.currentTimeMillis()
                    + (5 * 60 * 1000);

    signupStudentStore.put(
            student.getStudentId(),
            student
    );

    signupOtpStore.put(
            student.getStudentId(),
            otp
    );

    signupOtpExpiryStore.put(
            student.getStudentId(),
            expiryTime
    );

    emailService.sendOtpEmail(
            student.getEmail(),
            otp
    );

    return true;
}
public boolean verifySignupOtp(
        String studentId,
        String otp) {

    String storedOtp =
            signupOtpStore.get(studentId);

    Long expiryTime =
            signupOtpExpiryStore.get(studentId);

    if (storedOtp == null
            || expiryTime == null) {

        return false;
    }

    if (System.currentTimeMillis() > expiryTime) {

        signupOtpStore.remove(studentId);
        signupOtpExpiryStore.remove(studentId);
        signupStudentStore.remove(studentId);

        return false;
    }

    if (!storedOtp.equals(otp)) {
        return false;
    }

    Student student =
            signupStudentStore.get(studentId);

    if (student == null) {
        return false;
    }

    studentRepository.save(student);

    signupOtpStore.remove(studentId);
    signupOtpExpiryStore.remove(studentId);
    signupStudentStore.remove(studentId);

    return true;
}

    // =========================
    // SEND OTP
    // =========================

    public boolean sendOtp(
            String studentId,
            String email) {

        Student student =
                studentRepository.findByStudentIdAndEmail(
                        studentId,
                        email
                );

        if (student == null) {
            return false;
        }

        String otp = String.format(
                "%06d",
                new Random().nextInt(1000000)
        );

        long expiryTime =
                System.currentTimeMillis()
                        + (5 * 60 * 1000);

        otpStore.put(studentId, otp);

        otpExpiryStore.put(
                studentId,
                expiryTime
        );

        emailService.sendOtpEmail(
                email,
                otp
        );

        return true;
    }

    // =========================
    // VERIFY OTP
    // =========================

    public boolean verifyOtp(
            String studentId,
            String otp) {

        String storedOtp =
                otpStore.get(studentId);

        Long expiryTime =
                otpExpiryStore.get(studentId);

        if (storedOtp == null
                || expiryTime == null) {

            return false;
        }

        if (System.currentTimeMillis() > expiryTime) {

            otpStore.remove(studentId);
            otpExpiryStore.remove(studentId);

            return false;
        }

        if (!storedOtp.equals(otp)) {
            return false;
        }

        return true;
    }

    // =========================
    // RESET PASSWORD
    // =========================

    public boolean resetPassword(
            String studentId,
            String otp,
            String newPassword) {

        // First verify OTP again
        boolean verified =
                verifyOtp(studentId, otp);

        if (!verified) {
            return false;
        }

        Student student =
                studentRepository.findByStudentId(
                        studentId
                );

        if (student == null) {
            return false;
        }

        // Update password
        student.setPassword(newPassword);

        studentRepository.save(student);

        // OTP should not be usable again
        otpStore.remove(studentId);
        otpExpiryStore.remove(studentId);

        return true;
    }
}