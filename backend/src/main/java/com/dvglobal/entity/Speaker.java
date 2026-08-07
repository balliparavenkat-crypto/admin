package com.dvglobal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "speakers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Speaker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 255)
    private String email;

    @Column(length = 255)
    private String designation;

    @Column(length = 255)
    private String institution;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "image_url", length = 512)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conference_id", nullable = false)
    @JsonIgnore
    private Conference conference;
}
