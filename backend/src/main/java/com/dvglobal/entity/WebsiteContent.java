package com.dvglobal.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(name = "website_contents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WebsiteContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "section_key", nullable = false, unique = true, length = 100)
    private String sectionKey; // HERO, ABOUT, TESTIMONIALS, FAQS, GALLERY, FOOTER

    @Column(name = "content_json", nullable = false, columnDefinition = "TEXT")
    private String contentJson;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}
