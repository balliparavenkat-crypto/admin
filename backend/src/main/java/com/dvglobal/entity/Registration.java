package com.dvglobal.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(name = "registrations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "registration_code", nullable = false, unique = true, length = 50)
    private String registrationCode;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "conference_id", nullable = false)
    private Conference conference;

    @Column(nullable = false, length = 50)
    private String category; // DELEGATE, AUTHOR, STUDENT, SPEAKER, LISTENER, VIRTUAL

    @Column(nullable = false)
    private Double amount;

    @Column(length = 10)
    @Builder.Default
    private String currency = "USD";

    @Column(name = "payment_status", nullable = false, length = 30)
    @Builder.Default
    private String paymentStatus = "PENDING"; // PENDING, SUCCESS, FAILED, REFUNDED

    @Column(name = "registration_status", nullable = false, length = 30)
    @Builder.Default
    private String registrationStatus = "APPROVED"; // PENDING, APPROVED, REJECTED, CANCELLED

    @Column(name = "qr_code", length = 255)
    private String qrCode;

    @Column(name = "checked_in", nullable = false)
    @Builder.Default
    private boolean checkedIn = false;

    @Column(name = "checked_in_at")
    private Instant checkedInAt;

    @Column(name = "checked_out_at")
    private Instant checkedOutAt;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}
