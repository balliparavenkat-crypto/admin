package com.dvglobal.controller;

import com.dvglobal.entity.Review;
import com.dvglobal.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/assign")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'CONFERENCE_CHAIR')")
    public ResponseEntity<Review> assignReviewer(@RequestParam Long paperId, @RequestParam Long reviewerId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.assignReviewer(paperId, reviewerId));
    }

    @GetMapping("/assigned-papers")
    @PreAuthorize("hasRole('REVIEWER') or hasRole('CONFERENCE_CHAIR')")
    public ResponseEntity<List<Review>> getMyAssignedPapers(Authentication authentication) {
        return ResponseEntity.ok(reviewService.getReviewsByReviewer(authentication.getName()));
    }

    @GetMapping("/paper/{paperId}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'CONFERENCE_CHAIR')")
    public ResponseEntity<List<Review>> getReviewsForPaper(@PathVariable Long paperId) {
        return ResponseEntity.ok(reviewService.getReviewsForPaper(paperId));
    }

    @PostMapping("/{id}/submit")
    @PreAuthorize("hasRole('REVIEWER') or hasRole('CONFERENCE_CHAIR')")
    public ResponseEntity<Review> submitReview(@PathVariable Long id,
                                               @RequestParam Integer score,
                                               @RequestParam String commentsForAuthor,
                                               @RequestParam String commentsForChair,
                                               @RequestParam String recommendation) {
        return ResponseEntity.ok(reviewService.submitReview(id, score, commentsForAuthor, commentsForChair, recommendation));
    }
}
