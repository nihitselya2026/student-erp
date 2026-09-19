package com.student.student_erp_backend.service;

import com.student.student_erp_backend.entity.Message;
import com.student.student_erp_backend.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<Message> getMessages(String studentId) {
        return messageRepository.findBySenderIdOrReceiverId(
                studentId,
                studentId
        );
    }

    public Message sendMessage(Message message) {

        if (message.getSentAt() == null) {
            message.setSentAt(LocalDateTime.now());
        }

        if (message.getIsRead() == null) {
            message.setIsRead(false);
        }

        return messageRepository.save(message);
    }

    public void markMessagesAsRead(
            String senderId,
            String receiverId
    ) {
        List<Message> messages =
                messageRepository.findBySenderIdAndReceiverId(
                        senderId,
                        receiverId
                );

        for (Message message : messages) {
            message.setIsRead(true);
        }

        messageRepository.saveAll(messages);
    }
}