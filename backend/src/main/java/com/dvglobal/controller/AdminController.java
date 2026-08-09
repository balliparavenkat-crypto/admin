package com.dvglobal.controller;

import com.dvglobal.entity.*;
import com.dvglobal.repository.*;
import com.dvglobal.service.RealtimeEventPublisher;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminController {

    private final RealtimeEventPublisher realtimeEventPublisher;
    private final ConferenceRepository conferenceRepository;
    private final RegistrationRepository registrationRepository;
    private final PaperRepository paperRepository;
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final CertificateRepository certificateRepository;
    private final AuditLogRepository auditLogRepository;
    private final WebsiteContentRepository websiteContentRepository;
    private final ReviewRepository reviewRepository;

    public AdminController(RealtimeEventPublisher realtimeEventPublisher,
                           ConferenceRepository conferenceRepository,
                           RegistrationRepository registrationRepository,
                           PaperRepository paperRepository,
                           PaymentRepository paymentRepository,
                           UserRepository userRepository,
                           CertificateRepository certificateRepository,
                           AuditLogRepository auditLogRepository,
                           WebsiteContentRepository websiteContentRepository,
                           ReviewRepository reviewRepository) {
        this.realtimeEventPublisher = realtimeEventPublisher;
        this.conferenceRepository = conferenceRepository;
        this.registrationRepository = registrationRepository;
        this.paperRepository = paperRepository;
        this.paymentRepository = paymentRepository;
        this.userRepository = userRepository;
        this.certificateRepository = certificateRepository;
        this.auditLogRepository = auditLogRepository;
        this.websiteContentRepository = websiteContentRepository;
        this.reviewRepository = reviewRepository;
    }

    // 1. Real-time Event Stream (SSE)
    @GetMapping(value = "/events/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamEvents() {
        return realtimeEventPublisher.subscribe();
    }

    // 2. Executive Dashboard Stats
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        List<Conference> conferences = conferenceRepository.findAll();
        List<Registration> registrations = registrationRepository.findAll();
        List<Paper> papers = paperRepository.findAll();
        List<Payment> payments = paymentRepository.findAll();
        List<User> users = userRepository.findAll();
        List<Certificate> certificates = certificateRepository.findAll();

        double totalRevenue = payments.stream()
                .filter(p -> "SUCCESS".equalsIgnoreCase(p.getStatus()) || "COMPLETED".equalsIgnoreCase(p.getStatus()))
                .mapToDouble(Payment::getAmount)
                .sum();

        long pendingReviews = papers.stream().filter(p -> "UNDER_REVIEW".equalsIgnoreCase(p.getStatus())).count();
        long acceptedPapers = papers.stream().filter(p -> "ACCEPTED".equalsIgnoreCase(p.getStatus())).count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalSummits", conferences.size());
        stats.put("liveSummits", conferences.stream().filter(c -> "ACTIVE".equalsIgnoreCase(c.getStatus()) || "LIVE".equalsIgnoreCase(c.getStatus())).count());
        stats.put("totalRegistrations", registrations.size());
        stats.put("totalUsers", users.size());
        stats.put("totalPapers", papers.size());
        stats.put("pendingReviews", pendingReviews);
        stats.put("acceptedPapers", acceptedPapers);
        stats.put("totalRevenue", totalRevenue);
        stats.put("successfulPayments", payments.stream().filter(p -> "SUCCESS".equalsIgnoreCase(p.getStatus()) || "COMPLETED".equalsIgnoreCase(p.getStatus())).count());
        stats.put("certificatesIssued", certificates.size());
        stats.put("todayCheckIns", registrationRepository.countByCheckedInTrue());

        return ResponseEntity.ok(stats);
    }

    // 3. Comprehensive Analytics Endpoint
    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        List<Registration> registrations = registrationRepository.findAll();
        List<Paper> papers = paperRepository.findAll();
        List<Payment> payments = paymentRepository.findAll();

        // Registration timeline analytics
        Map<String, Long> paperStatusDistribution = papers.stream()
                .collect(Collectors.groupingBy(Paper::getStatus, Collectors.counting()));

        Map<String, Long> countryDistribution = registrations.stream()
                .filter(r -> r.getUser() != null && r.getUser().getCountry() != null)
                .collect(Collectors.groupingBy(r -> r.getUser().getCountry(), Collectors.counting()));

        Map<String, Object> analytics = new HashMap<>();
        analytics.put("paperStatus", paperStatusDistribution);
        analytics.put("countryDistribution", countryDistribution);
        analytics.put("totalPaymentsCount", payments.size());
        analytics.put("totalRegistrationsCount", registrations.size());

        return ResponseEntity.ok(analytics);
    }

    // 4. Recent System Audit Trail & Events
    @GetMapping("/audit-logs")
    public ResponseEntity<List<AuditLog>> getAuditLogs() {
        return ResponseEntity.ok(auditLogRepository.findAll());
    }

    // 5. Website Content CMS JSON
    @GetMapping("/website-content/{sectionKey}")
    public ResponseEntity<WebsiteContent> getWebsiteContent(@PathVariable String sectionKey) {
        return websiteContentRepository.findBySectionKey(sectionKey)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.ok(WebsiteContent.builder().sectionKey(sectionKey).contentJson("{}").build()));
    }

    @PutMapping("/website-content/{sectionKey}")
    public ResponseEntity<WebsiteContent> updateWebsiteContent(@PathVariable String sectionKey, @RequestBody Map<String, String> body) {
        String json = body.getOrDefault("contentJson", "{}");
        WebsiteContent content = websiteContentRepository.findBySectionKey(sectionKey)
                .orElseGet(() -> WebsiteContent.builder().sectionKey(sectionKey).build());
        content.setContentJson(json);
        WebsiteContent saved = websiteContentRepository.save(content);

        realtimeEventPublisher.publish("WEBSITE_UPDATED", "CMS Content Updated", "Section " + sectionKey + " updated", saved);
        return ResponseEntity.ok(saved);
    }
}
