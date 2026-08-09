package com.dvglobal.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "announcements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Announcement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conference_id")
    private Conference conference;

    @Column(name = "publish_date")
    private Instant publishDate;

    @Column(name = "expiry_date")
    private Instant expiryDate;

    @Column(nullable = false, length = 30)
    @Builder.Default
    private String status = "PUBLISHED"; // DRAFT, PUBLISHED, SCHEDULED, EXPIRED

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;
}
