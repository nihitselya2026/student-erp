package com.student.student_erp_backend.repository;
import com.student.student_erp_backend.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findBySenderIdOrReceiverId(
            String senderId,
            String receiverId
    );

    List<Message> findBySenderIdAndReceiverId(
            String senderId,
            String receiverId
    );
}