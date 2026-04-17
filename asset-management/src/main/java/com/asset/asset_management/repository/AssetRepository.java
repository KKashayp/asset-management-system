package com.asset.asset_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.asset.asset_management.entity.Asset;

public interface AssetRepository extends JpaRepository<Asset, Long> {

    boolean existsByAssetCode(String assetCode);

    boolean existsBySerialNumber(String serialNumber);
}