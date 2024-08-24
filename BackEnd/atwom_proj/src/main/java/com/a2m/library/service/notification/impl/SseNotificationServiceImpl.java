package com.a2m.library.service.notification.impl;

import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.library.model.Notification;
import com.a2m.library.repository.NotificationRepository;
import com.a2m.library.repository.SeeEmitterRepository;
import com.a2m.library.service.notification.SeeNotificationService;

@Service
public class SseNotificationServiceImpl implements SeeNotificationService {

    @Autowired
    private SeeEmitterRepository seeEmitterRepository;
    
    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public void sendSseNotification(String userUid, String data) {
    	
    	Notification notification = new Notification();
    	notification.setReceiver(userUid);
    	notification.setMessage(data);
    	notification.setCre_dt(LocalDateTime.now());
    	notificationRepository.save(notification);
    	
        seeEmitterRepository.get(userUid).ifPresentOrElse(sseEmitter -> {
            try {
                sseEmitter.send(data);
            } catch (IOException e) {
                e.printStackTrace();
                seeEmitterRepository.remove(userUid);
            }
        }, () -> {
            System.out.println("Value is empty");
        });
    }

	@Override
	public void sendSseNotification_Account(String user, String data) {
		// TODO Auto-generated method stub
		Notification notification = new Notification();
    	notification.setReceiver(user);
    	notification.setMessage(data);
    	notification.setCre_dt(LocalDateTime.now());
    	notificationRepository.save(notification);
    	
        seeEmitterRepository.get(user).ifPresentOrElse(sseEmitter -> {
            try {
                sseEmitter.send(data);
            } catch (IOException e) {
                e.printStackTrace();
                seeEmitterRepository.remove(user);
            }
        }, () -> {
            System.out.println("Value is empty");
        });
	}
    
    
}
