package com.a2m.library.service.notification;

public interface SeeNotificationService {
	void sendSseNotification(String userUid, String data);
	
	void sendSseNotification_Account(String user, String data);
	
	void sendSseNotification_Order(String user, String data);
}
