package com.asset.asset_management.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendRegistrationEmail(String toEmail, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Welcome to Asset Management System");
        message.setText(
                "Hello " + name + ",\n\n" +
                "Your account has been created successfully in the Asset Management System.\n\n" +
                "You can now log in and access your employee portal.\n\n" +
                "Regards,\n" +
                "Asset Management Team"
        );

        mailSender.send(message);
    }
}