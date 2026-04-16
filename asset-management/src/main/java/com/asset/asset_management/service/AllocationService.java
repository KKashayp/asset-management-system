package com.asset.asset_management.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.asset.asset_management.DTO.AllocationDTO;
import com.asset.asset_management.DTO.AllocationRequestDTO;
import com.asset.asset_management.entity.Allocation;
import com.asset.asset_management.entity.Asset;
import com.asset.asset_management.entity.User;
import com.asset.asset_management.enums.AssetStatus;
import com.asset.asset_management.exception.ResourceNotFoundException;
import com.asset.asset_management.repository.AllocationRepository;
import com.asset.asset_management.repository.AssetRepository;
import com.asset.asset_management.repository.UserRepository;

@Service
public class AllocationService {

    private final AllocationRepository allocationRepository;
    private final AssetRepository assetRepository;
    private final UserRepository userRepository;

    public AllocationService(AllocationRepository allocationRepository,
                             AssetRepository assetRepository,
                             UserRepository userRepository) {
        this.allocationRepository = allocationRepository;
        this.assetRepository = assetRepository;
        this.userRepository = userRepository;
    }

    public AllocationDTO allocateAsset(AllocationRequestDTO requestDTO) {
        Asset asset = assetRepository.findById(requestDTO.getAssetId())
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with id: " + requestDTO.getAssetId()));

        User user = userRepository.findById(requestDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + requestDTO.getUserId()));

        User allocatedBy = null;
        if (requestDTO.getAllocatedById() != null) {
            allocatedBy = userRepository.findById(requestDTO.getAllocatedById())
                    .orElseThrow(() -> new ResourceNotFoundException("Allocated by user not found with id: " + requestDTO.getAllocatedById()));
        }

        if (asset.getStatus() != AssetStatus.AVAILABLE) {
            throw new RuntimeException("Asset is not available for allocation");
        }

        Allocation allocation = new Allocation();
        allocation.setAsset(asset);
        allocation.setUser(user);
        allocation.setAllocatedBy(allocatedBy);
        allocation.setAllocatedDate(LocalDateTime.now());
        allocation.setDueDate(requestDTO.getDueDate());
        allocation.setRemarks(requestDTO.getRemarks());
        allocation.setReturned(false);

        asset.setStatus(AssetStatus.ALLOCATED);
        assetRepository.save(asset);

        Allocation savedAllocation = allocationRepository.save(allocation);
        return mapToDTO(savedAllocation);
    }

    public List<AllocationDTO> getAllAllocations() {
        return allocationRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public AllocationDTO getAllocationById(Long id) {
        Allocation allocation = allocationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Allocation not found with id: " + id));
        return mapToDTO(allocation);
    }

    public List<AllocationDTO> getActiveAllocations() {
        return allocationRepository.findByReturned(false)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<AllocationDTO> getAllocationsByUserEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        return allocationRepository.findByUser(user)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public AllocationDTO returnAsset(Long allocationId) {
        Allocation allocation = allocationRepository.findById(allocationId)
                .orElseThrow(() -> new ResourceNotFoundException("Allocation not found with id: " + allocationId));

        if (Boolean.TRUE.equals(allocation.getReturned())) {
            throw new RuntimeException("Asset has already been returned");
        }

        allocation.setReturnDate(LocalDateTime.now());
        allocation.setReturned(true);

        Asset asset = allocation.getAsset();
        asset.setStatus(AssetStatus.AVAILABLE);
        assetRepository.save(asset);

        Allocation updatedAllocation = allocationRepository.save(allocation);
        return mapToDTO(updatedAllocation);
    }

    private AllocationDTO mapToDTO(Allocation allocation) {
        Long allocatedById = null;
        String allocatedByName = null;

        if (allocation.getAllocatedBy() != null) {
            allocatedById = allocation.getAllocatedBy().getId();
            allocatedByName = allocation.getAllocatedBy().getName();
        }

        return new AllocationDTO(
                allocation.getId(),
                allocation.getAsset().getId(),
                allocation.getAsset().getName(),
                allocation.getAsset().getAssetCode(),
                allocation.getUser().getId(),
                allocation.getUser().getName(),
                allocation.getUser().getEmail(),
                allocatedById,
                allocatedByName,
                allocation.getAllocatedDate(),
                allocation.getDueDate(),
                allocation.getReturnDate(),
                allocation.getRemarks(),
                allocation.getReturned()
        );
    }
}