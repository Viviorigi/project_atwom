package com.a2m.library.service.notification;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface SeeEmitterService {
	SseEmitter subscribe(String userUid);
}
