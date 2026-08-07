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

    @Column(name = "start_date", nullable = false)
    private Instant startDate;

    @Column(name = "end_date", nullable = false)
    private Instant endDate;

    @Column(name = "venue_name", length = 255)
    private String venueName;

    @Column(name = "venue_address", columnDefinition = "TEXT")
    private String venueAddress;

    @Column(name = "city", length = 100)
    private String city;

    @Column(name = "country", length = 100)
    private String country;

    @Column(nullable = false, length = 30)
    @Builder.Default
    private String status = "DRAFT"; // DRAFT, UPCOMING, ACTIVE, COMPLETED

    @Column(name = "registration_fee_author")
    private Double registrationFeeAuthor;

    @Column(name = "registration_fee_listener")
    private Double registrationFeeListener;

    @Column(name = "currency", length = 10)
    @Builder.Default
    private String currency = "USD";

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
