package com.dvglobal.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "conferences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Conference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, unique = true, length = 50)
    private String acronym;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "banner_url", columnDefinition = "TEXT")
    private String bannerUrl;

    @Column(name = "short_description", columnDefinition = "TEXT")
    private String shortDescription;

    @Column(name = "website_url", length = 255)
    private String websiteUrl;

    @Column(name = "start_date", nullable = false)
    private Instant startDate;

    @Column(name = "end_date", nullable = false)
    private Instant endDate;

    @Column(name = "start_time", length = 20)
    private String startTime;

    @Column(name = "end_time", length = 20)
    private String endTime;

    @Column(name = "timezone", length = 50)
    private String timezone;

    @Column(name = "venue_name", length = 255)
    private String venueName;

    @Column(name = "venue_address", columnDefinition = "TEXT")
    private String venueAddress;

    @Column(name = "city", length = 100)
    private String city;

    @Column(name = "state", length = 100)
    private String state;

    @Column(name = "country", length = 100)
    private String country;

    @Column(name = "country_code", length = 10)
    private String countryCode;

    @Column(name = "event_type", length = 50)
    private String eventType;

    @Column(nullable = false, length = 30)
    @Builder.Default
    private String status = "DRAFT"; // DRAFT, UPCOMING, ACTIVE, COMPLETED, ARCHIVED

    @Column(name = "registration_open_date")
    private Instant registrationOpenDate;

    @Column(name = "registration_close_date")
    private Instant registrationCloseDate;

    @Column(name = "early_bird_deadline")
    private Instant earlyBirdDeadline;

    @Column(name = "registration_fee_author")
    private Double registrationFeeAuthor;

    @Column(name = "registration_fee_listener")
    private Double registrationFeeListener;

    @Column(name = "registration_fee_student")
    private Double registrationFeeStudent;

    @Column(name = "currency", length = 10)
    @Builder.Default
    private String currency = "USD";

    @Column(name = "tax_rate")
    private Double taxRate;

    @Column(name = "submission_open_date")
    private Instant submissionOpenDate;

    @Column(name = "submission_deadline")
    private Instant submissionDeadline;

    @Column(name = "review_deadline")
    private Instant reviewDeadline;

    @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Track> tracks = new ArrayList<>();

    @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Session> sessions = new ArrayList<>();

    @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Speaker> speakers = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}
