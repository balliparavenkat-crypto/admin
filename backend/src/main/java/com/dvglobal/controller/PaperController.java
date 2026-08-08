package com.dvglobal.controller;

import com.dvglobal.entity.Paper;
import com.dvglobal.service.PaperService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/papers")
public class PaperController {

    private final PaperService paperService;

    public PaperController(PaperService paperService) {
        this.paperService = paperService;
    }

    @PostMapping
    @PreAuthorize("hasRole('AUTHOR') or hasRole('SPEAKER') or hasRole('CONFERENCE_CHAIR')")
    public ResponseEntity<Paper> submitPaper(@RequestBody Paper paper, 
                                             @RequestParam Long trackId, 
                                             Principal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(paperService.submitPaper(paper, trackId, principal.getName()));
    }

    @GetMapping("/my-submissions")
    @PreAuthorize("authenticated")
    public ResponseEntity<List<Paper>> getMySubmissions(Authentication authentication) {
        return ResponseEntity.ok(paperService.getPapersBySubmitterEmail(authentication.getName()));
    }

    @GetMapping("/conference/{conferenceId}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'CONFERENCE_CHAIR')")
    public ResponseEntity<List<Paper>> getPapersByConference(@PathVariable Long conferenceId) {
        return ResponseEntity.ok(paperService.getPapersByConference(conferenceId));
    }

    @GetMapping("/{id}")
    @PreAuthorize("authenticated")
    public ResponseEntity<Paper> getPaperById(@PathVariable Long id) {
        return ResponseEntity.ok(paperService.getPaperById(id));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'CONFERENCE_CHAIR')")
    public ResponseEntity<Paper> updatePaperStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(paperService.updatePaperStatus(id, status));
    }

    @PutMapping("/{id}/doi")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'CONFERENCE_CHAIR')")
    public ResponseEntity<Paper> assignDoi(@PathVariable Long id, @RequestParam String doi) {
        return ResponseEntity.ok(paperService.assignDoi(id, doi));
    }
}
