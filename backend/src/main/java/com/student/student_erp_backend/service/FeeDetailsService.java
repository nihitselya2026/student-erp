package com.student.student_erp_backend.service;

import com.student.student_erp_backend.entity.FeeDetails;
import com.student.student_erp_backend.repository.FeeDetailsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeeDetailsService {

    private final FeeDetailsRepository feeDetailsRepository;

    public FeeDetailsService(FeeDetailsRepository feeDetailsRepository) {
        this.feeDetailsRepository = feeDetailsRepository;
    }

    public List<FeeDetails> getFeeDetails(
            String studentId,
            Integer semester) {

        return feeDetailsRepository
                .findByStudentIdAndSemester(studentId, semester);
    }

    public FeeDetails saveFeeDetails(FeeDetails feeDetails) {
        return feeDetailsRepository.save(feeDetails);
    }

    public FeeDetails updateFeeDetails(
            Long id,
            FeeDetails updatedFeeDetails) {

        FeeDetails existingFeeDetails =
                feeDetailsRepository.findById(id).orElse(null);

        if (existingFeeDetails == null) {
            return null;
        }

        existingFeeDetails.setStudentId(
                updatedFeeDetails.getStudentId());

        existingFeeDetails.setSemester(
                updatedFeeDetails.getSemester());

        existingFeeDetails.setTotalFee(
                updatedFeeDetails.getTotalFee());

        existingFeeDetails.setPaidFee(
                updatedFeeDetails.getPaidFee());

        existingFeeDetails.setPendingFee(
                updatedFeeDetails.getPendingFee());

        existingFeeDetails.setDueDate(
                updatedFeeDetails.getDueDate());

        existingFeeDetails.setStatus(
                updatedFeeDetails.getStatus());

        return feeDetailsRepository.save(existingFeeDetails);
    }

    public void deleteFeeDetails(Long id) {
        feeDetailsRepository.deleteById(id);
    }
}