package com.dvglobal.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "sponsors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sponsor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_name", nullable = false, length = 255)
    private String companyName;

    @Column(name = "logo_url", length = 512)
    private String logoUrl;

    @Column(name = "website_url", length = 512)
    private String websiteUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 30)
    @Builder.Default
    private String level = "PARTNER"; // PLATINUM, GOLD, SILVER, BRONZE, PARTNER, MEDIA_PARTNER

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conference_id")
    private Conference conference;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;
}
