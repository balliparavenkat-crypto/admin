package com.dvglobal.repository;

import com.dvglobal.entity.Paper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaperRepository extends JpaRepository<Paper, Long> {
    List<Paper> findBySubmitterId(Long submitterId);
    List<Paper> findByTrackConferenceId(Long conferenceId);
    List<Paper> findByStatus(String status);
}
