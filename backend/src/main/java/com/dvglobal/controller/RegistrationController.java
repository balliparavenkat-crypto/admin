package com.dvglobal.controller;

import com.dvglobal.entity.Conference;
import com.dvglobal.entity.Registration;
import com.dvglobal.entity.User;
import com.dvglobal.repository.ConferenceRepository;
import com.dvglobal.repository.RegistrationRepository;
import com.dvglobal.repository.UserRepository;
import com.dvglobal.service.RealtimeEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins = "*", maxAge = 3600)
public class RegistrationController {

    private final RegistrationRepository registrationRepository;
    private final ConferenceRepository conferenceRepository;
    private final UserRepository userRepository;
    private final RealtimeEventPublisher realtimeEventPublisher;

    public RegistrationController(RegistrationRepository registrationRepository,
                                  ConferenceRepository conferenceRepository,
                                  UserRepository userRepository,
                                  RealtimeEventPublisher realtimeEventPublisher) {
        this.registrationRepository = registrationRepository;
        this.conferenceRepository = conferenceRepository;
        this.userRepository = userRepository;
        this.realtimeEventPublisher = realtimeEventPublisher;
    }

    @GetMapping
    public ResponseEntity<List<Registration>> getAllRegistrations() {
        return ResponseEntity.ok(registrationRepository.findAll());
    }

    @GetMapping("/conference/{conferenceId}")
    public ResponseEntity<List<Registration>> getRegistrationsByConference(@PathVariable Long conferenceId) {
        return ResponseEntity.ok(registrationRepository.findByConferenceId(conferenceId));
    }

    @PostMapping
    public ResponseEntity<?> createRegistration(@RequestBody Map<String, Object> body) {
        Long userId = Long.valueOf(body.get("userId").toString());
        Long conferenceId = Long.valueOf(body.get("conferenceId").toString());
        String category = body.getOrDefault("category", "DELEGATE").toString();
        Double amount = Double.valueOf(body.getOrDefault("amount", 299.0).toString());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new RuntimeException("Conference not found: " + conferenceId));

        String code = "DV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String qr = "QR-" + code;

        Registration registration = Registration.builder()
                .registrationCode(code)
                .user(user)
                .conference(conference)
                .category(category)
                .amount(amount)
                .currency("USD")
                .paymentStatus("SUCCESS")
                .registrationStatus("APPROVED")
                .qrCode(qr)
                .checkedIn(false)
                .build();

        Registration saved = registrationRepository.save(registration);

        // Publish real-time event to Admin Dashboard
        realtimeEventPublisher.publish(
                "NEW_REGISTRATION",
                "New Summit Registration",
                user.getFirstName() + " " + user.getLastName() + " registered for " + conference.getAcronym(),
                saved
        );

        return ResponseEntity.ok(saved);
    }

    @PostMapping("/check-in")
    public ResponseEntity<?> checkInParticipant(@RequestBody Map<String, String> body) {
        String qrOrCode = body.get("code");
        Registration reg = registrationRepository.findByRegistrationCode(qrOrCode)
                .or(() -> registrationRepository.findByQrCode(qrOrCode))
                .orElse(null);

        if (reg == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid Registration or QR Code"));
        }

        reg.setCheckedIn(true);
        reg.setCheckedInAt(Instant.now());
        Registration updated = registrationRepository.save(reg);

        realtimeEventPublisher.publish(
                "ATTENDANCE_CHECKED_IN",
                "Participant Checked In",
                reg.getUser().getFirstName() + " checked in for " + reg.getConference().getAcronym(),
                updated
        );

        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        Registration reg = registrationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registration not found"));
        reg.setRegistrationStatus(status);
        Registration saved = registrationRepository.save(reg);
        return ResponseEntity.ok(saved);
    }
}
