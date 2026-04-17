package com.asset.asset_management.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asset.asset_management.entity.User;
import com.asset.asset_management.repository.AllocationRepository;
import com.asset.asset_management.repository.AssetRepository;
import com.asset.asset_management.repository.UserRepository;

@Service
public class SystemService {

    private final AllocationRepository allocationRepository;
    private final AssetRepository assetRepository;
    private final UserRepository userRepository;

    public SystemService(AllocationRepository allocationRepository,
                         AssetRepository assetRepository,
                         UserRepository userRepository) {
        this.allocationRepository = allocationRepository;
        this.assetRepository = assetRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void resetSystemKeepAdmin() {
        allocationRepository.deleteAll();
        assetRepository.deleteAll();

        List<User> users = userRepository.findAll();
        for (User user : users) {
            if (!"admin@gmail.com".equalsIgnoreCase(user.getEmail())) {
                userRepository.delete(user);
            }
        }
    }
}