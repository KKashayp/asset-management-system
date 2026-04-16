package com.asset.asset_management.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asset.asset_management.DTO.AllocationDTO;
import com.asset.asset_management.DTO.AllocationRequestDTO;
import com.asset.asset_management.service.AllocationService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/allocations")
public class AllocationController {

    private final AllocationService allocationService;

    public AllocationController(AllocationService allocationService) {
        this.allocationService = allocationService;
    }

    @PostMapping
    public AllocationDTO allocateAsset(@RequestBody AllocationRequestDTO requestDTO) {
        return allocationService.allocateAsset(requestDTO);
    }

    @GetMapping
    public List<AllocationDTO> getAllAllocations() {
        return allocationService.getAllAllocations();
    }

    @GetMapping("/{id}")
    public AllocationDTO getAllocationById(@PathVariable Long id) {
        return allocationService.getAllocationById(id);
    }

    @GetMapping("/active")
    public List<AllocationDTO> getActiveAllocations() {
        return allocationService.getActiveAllocations();
    }

    @GetMapping("/my")
    public List<AllocationDTO> getMyAllocations(Authentication authentication) {
        return allocationService.getAllocationsByUserEmail(authentication.getName());
    }

    @PutMapping("/return/{id}")
    public AllocationDTO returnAsset(@PathVariable Long id) {
        return allocationService.returnAsset(id);
    }
}