package com.student.student_erp_backend.service;

import com.student.student_erp_backend.entity.Payment;
import com.student.student_erp_backend.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public List<Payment> getPaymentsByStudentId(String studentId) {
        return paymentRepository.findByStudentId(studentId);
    }

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Payment updatePayment(
            Long id,
            Payment updatedPayment) {

        Payment existingPayment =
                paymentRepository.findById(id).orElse(null);

        if (existingPayment == null) {
            return null;
        }

        existingPayment.setStudentId(
                updatedPayment.getStudentId());

        existingPayment.setTransactionId(
                updatedPayment.getTransactionId());

        existingPayment.setPaymentDate(
                updatedPayment.getPaymentDate());

        existingPayment.setAmount(
                updatedPayment.getAmount());

        existingPayment.setPaymentMode(
                updatedPayment.getPaymentMode());

        existingPayment.setStatus(
                updatedPayment.getStatus());

        return paymentRepository.save(existingPayment);
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}