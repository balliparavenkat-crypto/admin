package com.dvglobal.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "certificates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Certificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "certificate_type", nullable = false, length = 50)
    private String certificateType; // PARTICIPATION, PRESENTATION, REVIEWER, SPEAKER

    @Column(name = "certificate_hash", nullable = false, unique = true, length = 100)
    private String certificateHash; // used for verification QR code

    @Column(name = "signature_url", length = 512)
    private String signatureUrl;

    @Column(name = "pdf_url", length = 512)
    private String pdfUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conference_id", nullable = false)
    private Conference conference;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paper_id")
    private Paper paper; // nullable, only for presentation certificates

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;
}
