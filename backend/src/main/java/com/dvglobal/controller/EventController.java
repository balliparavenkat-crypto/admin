package com.dvglobal.controller;

import com.dvglobal.service.RealtimeEventService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    private final RealtimeEventService realtimeEventService;
    private final CopyOnWriteArrayList<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    public EventController(RealtimeEventService realtimeEventService) {
        this.realtimeEventService = realtimeEventService;
    }

    @GetMapping("/recent")
    public ResponseEntity<List<RealtimeEventService.RealtimeEventPayload>> getRecentEvents() {
        return ResponseEntity.ok(realtimeEventService.getRecentEvents());
    }

    @PostMapping("/trigger")
    public ResponseEntity<RealtimeEventService.RealtimeEventPayload> triggerEvent(@RequestBody Map<String, Object> body) {
        String typeStr = (String) body.getOrDefault("eventType", "NEW_REGISTRATION");
        String title = (String) body.getOrDefault("title", "Live Event");
        String description = (String) body.getOrDefault("description", "Event triggered from Admin Dashboard");
        Object details = body.get("details");

        RealtimeEventService.EventType type;
        try {
            type = RealtimeEventService.EventType.valueOf(typeStr);
        } catch (Exception e) {
            type = RealtimeEventService.EventType.NEW_REGISTRATION;
        }

        RealtimeEventService.RealtimeEventPayload payload = realtimeEventService.broadcast(type, title, description, details);

        // Notify active SSE listeners
        List<SseEmitter> deadEmitters = new CopyOnWriteArrayList<>();
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event().name("dashboard-event").data(payload));
            } catch (IOException e) {
                deadEmitters.add(emitter);
            }
        }
        emitters.removeAll(deadEmitters);

        return ResponseEntity.ok(payload);
    }

    @GetMapping(path = "/sse", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamEvents() {
        SseEmitter emitter = new SseEmitter(30 * 60 * 1000L); // 30 mins
        emitters.add(emitter);

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitter.onError((e) -> emitters.remove(emitter));

        return emitter;
    }
}
