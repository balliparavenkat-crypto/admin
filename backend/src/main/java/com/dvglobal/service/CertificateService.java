package com.dvglobal.service;

import com.dvglobal.entity.Certificate;
import com.dvglobal.entity.Conference;
import com.dvglobal.entity.Paper;
import com.dvglobal.entity.User;
import com.dvglobal.repository.CertificateRepository;
import com.dvglobal.repository.ConferenceRepository;
import com.dvglobal.repository.PaperRepository;
import com.dvglobal.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class CertificateService {

    private final CertificateRepository certificateRepository;
    private final ConferenceRepository conferenceRepository;
    private final UserRepository userRepository;
    private final PaperRepository paperRepository;

    public CertificateService(CertificateRepository certificateRepository, ConferenceRepository conferenceRepository,
                              UserRepository userRepository, PaperRepository paperRepository) {
        this.certificateRepository = certificateRepository;
        this.conferenceRepository = conferenceRepository;
        this.userRepository = userRepository;
        this.paperRepository = paperRepository;
    }

    public List<Certificate> getCertificatesByUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + email));
        return certificateRepository.findByUserId(user.getId());
    }

    public Certificate issueCertificate(String email, Long conferenceId, Long paperId, String certificateType) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + email));
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new IllegalArgumentException("Conference not found with ID: " + conferenceId));

        Paper paper = null;
        if (paperId != null) {
            paper = paperRepository.findById(paperId)
                    .orElseThrow(() -> new IllegalArgumentException("Paper not found with ID: " + paperId));
        }

        // Generate verification hash
        String verificationHash = UUID.randomUUID().toString();

        Certificate certificate = Certificate.builder()
                .certificateType(certificateType.toUpperCase())
                .certificateHash(verificationHash)
                .signatureUrl("/images/signatures/dv-global-chair.png")
                .pdfUrl("/api/certificates/download/" + verificationHash)
                .user(user)
                .conference(conference)
                .paper(paper)
                .build();

        return certificateRepository.save(certificate);
    }

    public Certificate verifyCertificate(String hash) {
        return certificateRepository.findByCertificateHash(hash)
                .orElseThrow(() -> new IllegalArgumentException("Certificate signature not valid or not found."));
    }
}
