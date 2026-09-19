package com.student.student_erp_backend.controller;

import com.student.student_erp_backend.entity.Message;
import com.student.student_erp_backend.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = {"http://localhost:5173"})
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<List<Message>> getMessages(
            @PathVariable String studentId) {

        return ResponseEntity.ok(
                messageService.getMessages(studentId)
        );
    }

    @PostMapping
    public ResponseEntity<Message> sendMessage(
            @RequestBody Message message) {

        return ResponseEntity.ok(
                messageService.sendMessage(message)
        );
    }
        @PutMapping("/read")
    public ResponseEntity<Void> markMessagesAsRead(
            @RequestParam String senderId,
            @RequestParam String receiverId) {

        messageService.markMessagesAsRead(
                senderId,
                receiverId
        );

        return ResponseEntity.ok().build();
    }
}