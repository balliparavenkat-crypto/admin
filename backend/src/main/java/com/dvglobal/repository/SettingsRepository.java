package com.dvglobal.repository;

import com.dvglobal.entity.SystemSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SettingsRepository extends JpaRepository<SystemSetting, Long> {
    List<SystemSetting> findByCategory(String category);
    Optional<SystemSetting> findByKey(String key);
}
