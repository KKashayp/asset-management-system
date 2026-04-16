package com.asset.asset_management.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.asset.asset_management.DTO.AssetDTO;
import com.asset.asset_management.entity.Asset;
import com.asset.asset_management.enums.AssetStatus;
import com.asset.asset_management.exception.ResourceNotFoundException;
import com.asset.asset_management.repository.AllocationRepository;
import com.asset.asset_management.repository.AssetRepository;

@Service
public class AssetService {

    private final AssetRepository assetRepository;
    private final AllocationRepository allocationRepository;

    public AssetService(AssetRepository assetRepository,
                        AllocationRepository allocationRepository) {
        this.assetRepository = assetRepository;
        this.allocationRepository = allocationRepository;
    }

    public List<AssetDTO> getAllAssets() {
        return assetRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public AssetDTO getAssetById(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with id: " + id));
        return mapToDTO(asset);
    }

    public AssetDTO createAsset(Asset asset) {
        if (assetRepository.existsByAssetCode(asset.getAssetCode())) {
            throw new RuntimeException("Asset code already exists");
        }

        if (asset.getSerialNumber() != null && !asset.getSerialNumber().isBlank()
                && assetRepository.existsBySerialNumber(asset.getSerialNumber())) {
            throw new RuntimeException("Serial number already exists");
        }

        if (asset.getStatus() == null) {
            asset.setStatus(AssetStatus.AVAILABLE);
        }

        Asset savedAsset = assetRepository.save(asset);
        return mapToDTO(savedAsset);
    }

    public AssetDTO updateAsset(Long id, Asset updatedAsset) {
        Asset existingAsset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with id: " + id));

        if (!existingAsset.getAssetCode().equals(updatedAsset.getAssetCode())
                && assetRepository.existsByAssetCode(updatedAsset.getAssetCode())) {
            throw new RuntimeException("Asset code already exists");
        }

        String newSerial = updatedAsset.getSerialNumber();
        String oldSerial = existingAsset.getSerialNumber();

        if (newSerial != null && !newSerial.isBlank()) {
            if (oldSerial == null || !oldSerial.equals(newSerial)) {
                if (assetRepository.existsBySerialNumber(newSerial)) {
                    throw new RuntimeException("Serial number already exists");
                }
            }
        }

        existingAsset.setAssetCode(updatedAsset.getAssetCode());
        existingAsset.setName(updatedAsset.getName());
        existingAsset.setType(updatedAsset.getType());
        existingAsset.setCategory(updatedAsset.getCategory());
        existingAsset.setBrand(updatedAsset.getBrand());
        existingAsset.setSerialNumber(updatedAsset.getSerialNumber());
        existingAsset.setVendor(updatedAsset.getVendor());
        existingAsset.setLocation(updatedAsset.getLocation());
        existingAsset.setAssetCondition(updatedAsset.getAssetCondition());
        existingAsset.setPurchaseDate(updatedAsset.getPurchaseDate());
        existingAsset.setWarrantyExpiryDate(updatedAsset.getWarrantyExpiryDate());
        existingAsset.setStatus(updatedAsset.getStatus());

        Asset savedAsset = assetRepository.save(existingAsset);
        return mapToDTO(savedAsset);
    }

    public AssetDTO retireAsset(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with id: " + id));

        if (asset.getStatus() == AssetStatus.ALLOCATED) {
            throw new RuntimeException("Allocated asset cannot be retired. Return it first.");
        }

        asset.setStatus(AssetStatus.RETIRED);
        Asset savedAsset = assetRepository.save(asset);
        return mapToDTO(savedAsset);
    }

    public void deleteAsset(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with id: " + id));

        if (allocationRepository.existsByAsset(asset)) {
            throw new RuntimeException("Cannot delete asset because allocation history exists. Mark it as RETIRED instead.");
        }

        assetRepository.delete(asset);
    }

    private AssetDTO mapToDTO(Asset asset) {
        return new AssetDTO(
                asset.getId(),
                asset.getAssetCode(),
                asset.getName(),
                asset.getType(),
                asset.getCategory(),
                asset.getBrand(),
                asset.getSerialNumber(),
                asset.getVendor(),
                asset.getLocation(),
                asset.getAssetCondition(),
                asset.getPurchaseDate(),
                asset.getWarrantyExpiryDate(),
                asset.getStatus(),
                asset.getCreatedAt()
        );
    }
}