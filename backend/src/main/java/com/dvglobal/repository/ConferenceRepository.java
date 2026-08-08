package com.dvglobal.repository;

import com.dvglobal.entity.Conference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConferenceRepository extends JpaRepository<Conference, Long> {
    Optional<Conference> findByAcronym(String acronym);
    boolean existsByAcronym(String acronym);
}
