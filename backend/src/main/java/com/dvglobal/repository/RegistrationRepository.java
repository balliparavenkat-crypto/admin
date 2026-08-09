package com.dvglobal.repository;

import com.dvglobal.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByConferenceId(Long conferenceId);
    List<Registration> findByUserId(Long userId);
    Optional<Registration> findByRegistrationCode(String registrationCode);
    Optional<Registration> findByQrCode(String qrCode);
    long countByCheckedInTrue();
}
