package com.eatright.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.eatright.server.models.EmailDetails;

@Service
public class EmailServiceImpl {
 
    @Autowired 
    private JavaMailSender javaMailSender;
 
    @Value
    ("${spring.mail.username}") private String sender;
 
    public String sendSimpleMail(EmailDetails details)
    {
        try {
            SimpleMailMessage mailMessage
                = new SimpleMailMessage();
 
            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject());
 
            javaMailSender.send(mailMessage);
            return "Mail Sent is Successful...";
        }
 
        catch (Exception e) {
            return "Error while Sending Mail";
        }
    }
}
