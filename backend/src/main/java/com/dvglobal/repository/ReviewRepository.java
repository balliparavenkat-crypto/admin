package com.dvglobal.repository;

import com.dvglobal.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByReviewerId(Long reviewerId);
    List<Review> findByPaperId(Long paperId);
    List<Review> findByReviewerIdAndCompleted(Long reviewerId, boolean completed);
}
