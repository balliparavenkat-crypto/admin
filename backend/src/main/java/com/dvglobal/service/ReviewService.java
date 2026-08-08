package com.dvglobal.service;

import com.dvglobal.entity.Paper;
import com.dvglobal.entity.Review;
import com.dvglobal.entity.User;
import com.dvglobal.entity.RoleName;
import com.dvglobal.repository.PaperRepository;
import com.dvglobal.repository.ReviewRepository;
import com.dvglobal.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final PaperRepository paperRepository;
    private final UserRepository userRepository;

    public ReviewService(ReviewRepository reviewRepository, PaperRepository paperRepository,
                         UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.paperRepository = paperRepository;
        this.userRepository = userRepository;
    }

    public Review assignReviewer(Long paperId, Long reviewerId) {
        Paper paper = paperRepository.findById(paperId)
                .orElseThrow(() -> new IllegalArgumentException("Paper not found with ID: " + paperId));
        User reviewer = userRepository.findById(reviewerId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + reviewerId));

        // Validate reviewer has the REVIEWER role
        boolean isReviewer = reviewer.getRoles().stream()
                .anyMatch(role -> role.getName() == RoleName.REVIEWER || role.getName() == RoleName.CONFERENCE_CHAIR);

        if (!isReviewer) {
            throw new IllegalArgumentException("User does not have REVIEWER or CHAIR permissions.");
        }

        // Check if already assigned
        boolean alreadyAssigned = reviewRepository.findByPaperId(paperId).stream()
                .anyMatch(r -> r.getReviewer().getId().equals(reviewerId));

        if (alreadyAssigned) {
            throw new IllegalArgumentException("Reviewer is already assigned to this paper.");
        }

        Review review = Review.builder()
                .paper(paper)
                .reviewer(reviewer)
                .completed(false)
                .build();

        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByReviewer(String email) {
        User reviewer = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Reviewer not found: " + email));
        return reviewRepository.findByReviewerId(reviewer.getId());
    }

    public List<Review> getReviewsForPaper(Long paperId) {
        return reviewRepository.findByPaperId(paperId);
    }

    public Review submitReview(Long reviewId, Integer score, String commentsForAuthor, String commentsForChair, String recommendation) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("Review assignment not found: " + reviewId));

        if (score < 1 || score > 10) {
            throw new IllegalArgumentException("Score must be between 1 and 10.");
        }

        review.setScore(score);
        review.setCommentsForAuthor(commentsForAuthor);
        review.setCommentsForChair(commentsForChair);
        review.setRecommendation(recommendation);
        review.setCompleted(true);

        Review saved = reviewRepository.save(review);

        // Check if all reviews for this paper are completed to automatically move status to UNDER_REVIEW
        Paper paper = review.getPaper();
        if ("SUBMITTED".equals(paper.getStatus())) {
            paper.setStatus("UNDER_REVIEW");
            paperRepository.save(paper);
        }

        return saved;
    }
}
