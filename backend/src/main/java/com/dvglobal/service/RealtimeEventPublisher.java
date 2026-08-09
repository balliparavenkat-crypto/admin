package com.dvglobal.service;

import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class RealtimeEventPublisher {

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    public SseEmitter subscribe() {
        SseEmitter emitter = new SseEmitter(0L); // Infinite timeout for long-polling SSE stream
        emitters.add(emitter);

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitter.onError((ex) -> emitters.remove(emitter));

        try {
            emitter.send(SseEmitter.event()
                    .name("CONNECTED")
                    .data(AdminEvent.builder()
                            .eventType("CONNECTED")
                            .message("Real-time Admin Event Stream Connected")
                            .timestamp(Instant.now())
                            .build()));
        } catch (IOException e) {
            emitters.remove(emitter);
        }

        return emitter;
    }

    public void publish(String eventType, String title, String message, Object payload) {
        AdminEvent event = AdminEvent.builder()
                .eventType(eventType)
                .title(title)
                .message(message)
                .payload(payload)
                .timestamp(Instant.now())
                .build();

        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event().name("ADMIN_EVENT").data(event));
            } catch (Exception e) {
                emitters.remove(emitter);
            }
        }
    }

    @Data
    @Builder
    public static class AdminEvent {
        private String eventType;
        private String title;
        private String message;
        private Object payload;
        private Instant timestamp;
    }
}
