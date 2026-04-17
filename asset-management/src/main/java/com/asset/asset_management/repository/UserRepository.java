package com.asset.asset_management.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.asset.asset_management.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}