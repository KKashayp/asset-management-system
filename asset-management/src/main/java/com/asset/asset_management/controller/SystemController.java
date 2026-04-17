package com.asset.asset_management.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asset.asset_management.service.SystemService;

@RestController
@RequestMapping("/api/system")
@CrossOrigin("*")
public class SystemController {

    private final SystemService systemService;

    public SystemController(SystemService systemService) {
        this.systemService = systemService;
    }

    @DeleteMapping("/reset")
    public ResponseEntity<?> resetSystem() {
        systemService.resetSystemKeepAdmin();
        return ResponseEntity.ok(Map.of(
                "message", "System reset successful. Only admin remains."
        ));
    }
}