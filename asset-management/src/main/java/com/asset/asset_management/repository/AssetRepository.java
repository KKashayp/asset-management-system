package com.asset.asset_management.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.asset.asset_management.entity.Asset;

public interface AssetRepository extends JpaRepository<Asset, Long> {
    Optional<Asset> findByAssetCode(String assetCode);
    Optional<Asset> findBySerialNumber(String serialNumber);
    boolean existsByAssetCode(String assetCode);
    boolean existsBySerialNumber(String serialNumber);
}