package com.dvglobal.controller;

import com.dvglobal.entity.Conference;
import com.dvglobal.entity.Session;
import com.dvglobal.entity.Speaker;
import com.dvglobal.entity.Track;
import com.dvglobal.service.ConferenceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conferences")
public class ConferenceController {

    private final ConferenceService conferenceService;

    public ConferenceController(ConferenceService conferenceService) {
        this.conferenceService = conferenceService;
    }

    // Public Endpoints
    @GetMapping("/public/all")
    public ResponseEntity<List<Conference>> getAllPublicConferences() {
        return ResponseEntity.ok(conferenceService.getAllConferences());
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<Conference> getPublicConferenceById(@PathVariable Long id) {
        return ResponseEntity.ok(conferenceService.getConferenceById(id));
    }

    @GetMapping("/public/acronym/{acronym}")
    public ResponseEntity<Conference> getPublicConferenceByAcronym(@PathVariable String acronym) {
        return ResponseEntity.ok(conferenceService.getConferenceByAcronym(acronym));
    }

    @GetMapping("/public/{id}/tracks")
    public ResponseEntity<List<Track>> getPublicConferenceTracks(@PathVariable Long id) {
        return ResponseEntity.ok(conferenceService.getTracksByConference(id));
    }

    @GetMapping("/public/{id}/sessions")
    public ResponseEntity<List<Session>> getPublicConferenceSessions(@PathVariable Long id) {
        return ResponseEntity.ok(conferenceService.getSessionsByConference(id));
    }

    @GetMapping("/public/{id}/speakers")
    public ResponseEntity<List<Speaker>> getPublicConferenceSpeakers(@PathVariable Long id) {
        return ResponseEntity.ok(conferenceService.getSpeakersByConference(id));
    }

    // Chair/Admin Management Endpoints
    @PostMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'CONFERENCE_CHAIR')")
    public ResponseEntity<Conference> createConference(@RequestBody Conference conference) {
        return ResponseEntity.status(HttpStatus.CREATED).body(conferenceService.createConference(conference));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'CONFERENCE_CHAIR')")
    public ResponseEntity<Conference> updateConference(@PathVariable Long id, @RequestBody Conference conference) {
        return ResponseEntity.ok(conferenceService.updateConference(id, conference));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<Void> deleteConference(@PathVariable Long id) {
        conferenceService.deleteConference(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/tracks")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'CONFERENCE_CHAIR')")
    public ResponseEntity<Track> addTrack(@PathVariable Long id, @RequestBody Track track) {
        return ResponseEntity.status(HttpStatus.CREATED).body(conferenceService.addTrack(id, track));
    }

    @PostMapping("/{id}/speakers")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'CONFERENCE_CHAIR')")
    public ResponseEntity<Speaker> addSpeaker(@PathVariable Long id, @RequestBody Speaker speaker) {
        return ResponseEntity.status(HttpStatus.CREATED).body(conferenceService.addSpeaker(id, speaker));
    }

    @PostMapping("/{id}/sessions")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'CONFERENCE_CHAIR')")
    public ResponseEntity<Session> addSession(@PathVariable Long id, @RequestBody Session session) {
        return ResponseEntity.status(HttpStatus.CREATED).body(conferenceService.addSession(id, session));
    }
}
