package com.dvglobal.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class RealtimeEventService {

    private final SimpMessagingTemplate messagingTemplate;
    private final List<RealtimeEventPayload> recentEvents = Collections.synchronizedList(new ArrayList<>());

    public RealtimeEventService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public enum EventType {
        NEW_REGISTRATION,
        PAYMENT_SUCCESS,
        NEW_PAPER,
        REVIEW_SUBMITTED,
        NEW_USER,
        SUMMIT_UPDATED,
        SESSION_UPDATED,
        ANNOUNCEMENT_PUBLISHED,
        ATTENDANCE_CHECKED_IN,
        CERTIFICATE_GENERATED
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RealtimeEventPayload {
        private String eventId;
        private EventType eventType;
        private String title;
        private String description;
        private Object details;
        private String timestamp;
    }

    public RealtimeEventPayload broadcast(EventType eventType, String title, String description, Object details) {
        RealtimeEventPayload event = RealtimeEventPayload.builder()
                .eventId("EVT-" + System.currentTimeMillis())
                .eventType(eventType)
                .title(title)
                .description(description)
                .details(details)
                .timestamp(Instant.now().toString())
                .build();

        recentEvents.add(0, event);
        if (recentEvents.size() > 50) {
            recentEvents.remove(recentEvents.size() - 1);
        }

        try {
            messagingTemplate.convertAndSend("/topic/admin-events", event);
        } catch (Exception e) {
            // Log fallback error gracefully
        }

        return event;
    }

    public List<RealtimeEventPayload> getRecentEvents() {
        return new ArrayList<>(recentEvents);
    }
}
