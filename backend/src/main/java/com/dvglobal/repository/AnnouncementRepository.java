package com.dvglobal.repository;

import com.dvglobal.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByConferenceId(Long conferenceId);
    List<Announcement> findByStatus(String status);
}
