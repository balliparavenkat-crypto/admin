package com.dvglobal.service;

import com.dvglobal.entity.SystemSetting;
import com.dvglobal.repository.SettingsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SettingsService {

    private final SettingsRepository settingsRepository;

    public SettingsService(SettingsRepository settingsRepository) {
        this.settingsRepository = settingsRepository;
    }

    public List<SystemSetting> getAllSettings() {
        return settingsRepository.findAll();
    }

    public List<SystemSetting> getByCategory(String category) {
        return settingsRepository.findByCategory(category.toUpperCase());
    }

    public Map<String, String> getSettingsAsMap() {
        List<SystemSetting> settings = settingsRepository.findAll();
        Map<String, String> map = new HashMap<>();
        for (SystemSetting setting : settings) {
            map.put(setting.getKey(), setting.getValue());
        }
        return map;
    }

    @Transactional
    public void updateBulkSettings(Map<String, String> settingsMap, String category) {
        for (Map.Entry<String, String> entry : settingsMap.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();

            SystemSetting setting = settingsRepository.findByKey(key)
                    .orElseGet(() -> SystemSetting.builder()
                            .key(key)
                            .category(category != null ? category.toUpperCase() : "GENERAL")
                            .isSecret(key.toLowerCase().contains("secret") || key.toLowerCase().contains("password"))
                            .build());

            setting.setValue(value);
            if (category != null) {
                setting.setCategory(category.toUpperCase());
            }
            settingsRepository.save(setting);
        }
    }
}
