package com.a2m.library.service.notification.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.a2m.library.repository.SeeEmitterRepository;
import com.a2m.library.service.notification.SeeEmitterService;

@Service
public class SeeEmitterServiceImpl implements SeeEmitterService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(SeeEmitterServiceImpl.class);
	
	@Autowired
    private SeeEmitterRepository seeEmitterRepository;

	@Override
	public SseEmitter subscribe(String userUid) {
		// TODO Auto-generated method stub
		SseEmitter emitter = new SseEmitter(-1L);
        emitter.onCompletion(() -> seeEmitterRepository.remove(userUid));
        emitter.onTimeout(() -> seeEmitterRepository.remove(userUid));
        emitter.onError(e -> {
            LOGGER.error("Create SseEmitter exception", e);
            seeEmitterRepository.remove(userUid);
        });
        seeEmitterRepository.addEmitter(userUid, emitter);
        return emitter;
	}

}
