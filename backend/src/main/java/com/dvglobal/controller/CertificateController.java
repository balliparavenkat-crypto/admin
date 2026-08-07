package com.dvglobal.controller;

import com.dvglobal.entity.Certificate;
import com.dvglobal.service.CertificateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificates")
public class CertificateController {

    private final CertificateService certificateService;

    public CertificateController(CertificateService certificateService) {
        this.certificateService = certificateService;
    }

    @PostMapping("/issue")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'CONFERENCE_CHAIR')")
    public ResponseEntity<Certificate> issueCertificate(@RequestParam String email,
                                                        @RequestParam Long conferenceId,
                                                        @RequestParam(required = false) Long paperId,
                                                        @RequestParam String certificateType) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(certificateService.issueCertificate(email, conferenceId, paperId, certificateType));
    }

    @GetMapping("/my-certificates")
    @PreAuthorize("authenticated")
    public ResponseEntity<List<Certificate>> getMyCertificates(Authentication authentication) {
        return ResponseEntity.ok(certificateService.getCertificatesByUser(authentication.getName()));
    }

    @GetMapping("/verify/{hash}")
    public ResponseEntity<Certificate> verifyCertificate(@PathVariable String hash) {
        return ResponseEntity.ok(certificateService.verifyCertificate(hash));
    }
}
