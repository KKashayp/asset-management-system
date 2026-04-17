package com.asset.asset_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.asset.asset_management.entity.Allocation;
import com.asset.asset_management.entity.Asset;
import com.asset.asset_management.entity.User;

public interface AllocationRepository extends JpaRepository<Allocation, Long> {

    boolean existsByAsset(Asset asset);

    List<Allocation> findByReturned(boolean returned);

    List<Allocation> findByUser(User user);
}