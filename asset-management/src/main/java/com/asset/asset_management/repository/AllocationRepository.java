package com.asset.asset_management.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.asset.asset_management.entity.Allocation;
import com.asset.asset_management.entity.Asset;
import com.asset.asset_management.entity.User;

public interface AllocationRepository extends JpaRepository<Allocation, Long> {
    List<Allocation> findByUser(User user);
    List<Allocation> findByAsset(Asset asset);
    List<Allocation> findByReturned(Boolean returned);
    Optional<Allocation> findByAssetAndReturned(Asset asset, Boolean returned);
    boolean existsByAsset(Asset asset);
}