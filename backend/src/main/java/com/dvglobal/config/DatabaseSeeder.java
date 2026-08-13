package com.dvglobal.config;

import com.dvglobal.entity.*;
import com.dvglobal.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final RegistrationRepository registrationRepository;
    private final SponsorRepository sponsorRepository;
    private final AnnouncementRepository announcementRepository;
    private final AuditLogRepository auditLogRepository;
    private final WebsiteContentRepository websiteContentRepository;
    private final PaymentRepository paymentRepository;

    public DatabaseSeeder(UserRepository userRepository, RoleRepository roleRepository,
                          ConferenceRepository conferenceRepository, TrackRepository trackRepository,
                          SpeakerRepository speakerRepository, SessionRepository sessionRepository,
                          PasswordEncoder passwordEncoder, RegistrationRepository registrationRepository,
                          SponsorRepository sponsorRepository, AnnouncementRepository announcementRepository,
                          AuditLogRepository auditLogRepository, WebsiteContentRepository websiteContentRepository,
                          PaymentRepository paymentRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.conferenceRepository = conferenceRepository;
        this.trackRepository = trackRepository;
        this.speakerRepository = speakerRepository;
        this.sessionRepository = sessionRepository;
        this.passwordEncoder = passwordEncoder;
        this.registrationRepository = registrationRepository;
        this.sponsorRepository = sponsorRepository;
        this.announcementRepository = announcementRepository;
        this.auditLogRepository = auditLogRepository;
        this.websiteContentRepository = websiteContentRepository;
        this.paymentRepository = paymentRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed Roles
        for (RoleName roleName : RoleName.values()) {
            if (roleRepository.findByName(roleName).isEmpty()) {
                roleRepository.save(Role.builder().name(roleName).build());
            }
        }

        // 2. Seed Users if not present
        if (userRepository.findByEmail("admin@dvglobal.com").isEmpty()) {
            Role adminRole = roleRepository.findByName(RoleName.SUPER_ADMIN).orElseThrow();
            User admin = User.builder()
                    .firstName("D&V")
                    .lastName("Admin")
                    .email("admin@dvglobal.com")
                    .passwordHash(passwordEncoder.encode("Admin123!"))
                    .institution("D&V Global Summit")
                    .country("USA")
                    .phone("+1234567890")
                    .roles(new HashSet<>(Collections.singletonList(adminRole)))
                    .verified(true)
                    .build();
            userRepository.save(admin);
        }

        if (userRepository.findByEmail("chair@dvglobal.com").isEmpty()) {
            Role chairRole = roleRepository.findByName(RoleName.CONFERENCE_CHAIR).orElseThrow();
            User chair = User.builder()
                    .firstName("Conference")
                    .lastName("Chair")
                    .email("chair@dvglobal.com")
                    .passwordHash(passwordEncoder.encode("Chair123!"))
                    .institution("Stanford University")
                    .country("USA")
                    .phone("+1987654321")
                    .roles(new HashSet<>(Collections.singletonList(chairRole)))
                    .verified(true)
                    .build();
            userRepository.save(chair);
        }

        if (userRepository.findByEmail("reviewer@dvglobal.com").isEmpty()) {
            Role reviewerRole = roleRepository.findByName(RoleName.REVIEWER).orElseThrow();
            User reviewer = User.builder()
                    .firstName("Academic")
                    .lastName("Reviewer")
                    .email("reviewer@dvglobal.com")
                    .passwordHash(passwordEncoder.encode("Reviewer123!"))
                    .institution("MIT")
                    .country("USA")
                    .phone("+1122334455")
                    .roles(new HashSet<>(Collections.singletonList(reviewerRole)))
                    .verified(true)
                    .build();
            userRepository.save(reviewer);
        }

        if (userRepository.findByEmail("author@dvglobal.com").isEmpty()) {
            Role authorRole = roleRepository.findByName(RoleName.AUTHOR).orElseThrow();
            User author = User.builder()
                    .firstName("John")
                    .lastName("Doe")
                    .email("author@dvglobal.com")
                    .passwordHash(passwordEncoder.encode("Author123!"))
                    .institution("Harvard University")
                    .country("USA")
                    .phone("+1555666777")
                    .roles(new HashSet<>(Collections.singletonList(authorRole)))
                    .verified(true)
                    .build();
            userRepository.save(author);
        }

        // 3. Seed Conferences if not present
        if (conferenceRepository.findAll().isEmpty()) {
            Conference conf = Conference.builder()
                    .title("D&V Global Summit 2026: Advances in Artificial Intelligence")
                    .acronym("DVGS2026")
                    .description("The premier global conference bringing together leading researchers, practitioners, and industry experts to discuss the latest breakthroughs in Deep Learning, Large Language Models, and Generative AI systems.")
                    .startDate(Instant.now().plus(60, ChronoUnit.DAYS))
                    .endDate(Instant.now().plus(63, ChronoUnit.DAYS))
                    .venueName("Grand Palace Convention Center")
                    .venueAddress("100 Summit Boulevard, Suite 500")
                    .city("San Francisco")
                    .country("United States")
                    .status("ACTIVE")
                    .registrationFeeAuthor(499.00)
                    .registrationFeeListener(299.00)
                    .currency("USD")
                    .build();

            conf = conferenceRepository.save(conf);

            // Seed Tracks
            Track track1 = Track.builder().name("Natural Language Processing & LLMs").description("Topics related to GPTs, translation, transformers, and reasoning.").conference(conf).build();
            Track track2 = Track.builder().name("Computer Vision & Robotics").description("Topics related to object detection, generative video, and locomotion.").conference(conf).build();
            Track track3 = Track.builder().name("AI Safety & Alignment").description("Topics related to reinforcement learning from human feedback and cybersecurity.").conference(conf).build();
            trackRepository.saveAll(List.of(track1, track2, track3));

            // Seed Speakers
            Speaker speaker1 = Speaker.builder()
                    .name("Dr. Christopher Manning")
                    .email("manning@dvglobal.com")
                    .designation("Professor of Computer Science")
                    .institution("Stanford University")
                    .bio("Christopher Manning is a world-renowned leader in NLP, deep learning, and structural linguistics.")
                    .imageUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200")
                    .conference(conf)
                    .build();
            Speaker speaker2 = Speaker.builder()
                    .name("Dr. Fei-Fei Li")
                    .email("feifeili@dvglobal.com")
                    .designation("Co-Director of HAI")
                    .institution("Stanford University")
                    .bio("Fei-Fei Li is a pioneer in computer vision and creator of ImageNet, transforming AI fields globally.")
                    .imageUrl("https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200")
                    .conference(conf)
                    .build();
            speakerRepository.saveAll(List.of(speaker1, speaker2));

            // Seed Sessions
            Session session1 = Session.builder()
                    .title("Keynote: The Future of Large Language Models")
                    .description("Opening keynote speech by Dr. Christopher Manning focusing on scaling laws and multi-agent systems.")
                    .startTime(conf.getStartDate().plus(9, ChronoUnit.HOURS))
                    .endTime(conf.getStartDate().plus(10, ChronoUnit.HOURS).plus(30, ChronoUnit.MINUTES))
                    .location("Auditorium A")
                    .conference(conf)
                    .build();

            Session session2 = Session.builder()
                    .title("Panel Discussion: Ethics and Safety in Next-Gen AI Systems")
                    .description("Distinguished panel discussion featuring industry leaders and academic researchers.")
                    .startTime(conf.getStartDate().plus(11, ChronoUnit.HOURS))
                    .endTime(conf.getStartDate().plus(12, ChronoUnit.HOURS).plus(30, ChronoUnit.MINUTES))
                    .location("Auditorium B")
                    .conference(conf)
                    .build();

            sessionRepository.saveAll(List.of(session1, session2));

            // Seed Registrations
            User author = userRepository.findByEmail("author@dvglobal.com").orElse(null);
            if (author != null) {
                Registration reg1 = Registration.builder()
                        .registrationCode("DV-REG-1001")
                        .user(author)
                        .conference(conf)
                        .category("AUTHOR")
                        .amount(499.00)
                        .currency("USD")
                        .paymentStatus("SUCCESS")
                        .registrationStatus("APPROVED")
                        .qrCode("QR-DV-REG-1001")
                        .checkedIn(true)
                        .checkedInAt(Instant.now().minus(2, ChronoUnit.HOURS))
                        .build();
                registrationRepository.save(reg1);

                Payment pay1 = Payment.builder()
                        .amount(499.00)
                        .currency("USD")
                        .status("SUCCESS")
                        .paymentMethod("RAZORPAY")
                        .transactionId("txn_1029384756")
                        .user(author)
                        .conference(conf)
                        .build();
                paymentRepository.save(pay1);
            }

            // Seed Sponsors
            Sponsor sponsor1 = Sponsor.builder()
                    .companyName("NVIDIA AI Research")
                    .logoUrl("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&h=120&fit=crop")
                    .websiteUrl("https://nvidia.com")
                    .description("Global Leader in Accelerated Computing")
                    .level("PLATINUM")
                    .conference(conf)
                    .build();
            sponsorRepository.save(sponsor1);

            // Seed Announcements
            Announcement ann1 = Announcement.builder()
                    .title("Paper Submission Deadline Extended!")
                    .message("The paper submission deadline for DVGS2026 has been extended by 2 weeks.")
                    .conference(conf)
                    .publishDate(Instant.now())
                    .status("PUBLISHED")
                    .build();
            announcementRepository.save(ann1);

            // Seed Audit Log
            AuditLog log1 = AuditLog.builder()
                    .userEmail("admin@dvglobal.com")
                    .action("CREATED_SUMMIT")
                    .details("Admin created summit D&V Global Summit 2026")
                    .timestamp(Instant.now().minus(5, ChronoUnit.HOURS))
                    .build();
            auditLogRepository.save(log1);
        }
    }
}
