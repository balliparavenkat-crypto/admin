package com.dvglobal.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "media_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MediaItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "file_name", nullable = false, length = 255)
    private String fileName;

    @Column(name = "file_url", nullable = false, length = 512)
    private String fileUrl;

    @Column(name = "file_type", length = 50)
    private String fileType; // image/png, application/pdf, etc.

    @Column(length = 50)
    private String category; // LOGO, BANNER, SPEAKER, SPONSOR, CERTIFICATE, DOCUMENT

    @Column(name = "size_bytes")
    private Long sizeBytes;

    @Column(name = "uploaded_by", length = 100)
    private String uploadedBy;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;
}
