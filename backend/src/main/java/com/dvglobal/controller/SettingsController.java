package com.dvglobal.controller;

import com.dvglobal.entity.SystemSetting;
import com.dvglobal.service.SettingsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "*")
public class SettingsController {

    private final SettingsService settingsService;

    public SettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    @GetMapping
    public ResponseEntity<List<SystemSetting>> getAllSettings() {
        return ResponseEntity.ok(settingsService.getAllSettings());
    }

    @GetMapping("/map")
    public ResponseEntity<Map<String, String>> getSettingsMap() {
        return ResponseEntity.ok(settingsService.getSettingsAsMap());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<SystemSetting>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(settingsService.getByCategory(category));
    }

    @PostMapping("/bulk")
    public ResponseEntity<Map<String, String>> updateBulkSettings(
            @RequestBody Map<String, String> settingsMap,
            @RequestParam(required = false, defaultValue = "GENERAL") String category) {
        settingsService.updateBulkSettings(settingsMap, category);
        return ResponseEntity.ok(Map.of("message", "Settings updated successfully", "count", String.valueOf(settingsMap.size())));
    }
}
