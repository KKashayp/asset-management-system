package com.asset.asset_management.DTO;

import com.asset.asset_management.enums.AssetStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class AssetDTO {

    private Long id;
    private String assetCode;
    private String name;
    private String type;
    private String category;
    private String brand;
    private String serialNumber;
    private String vendor;
    private String location;
    private String assetCondition;
    private LocalDate purchaseDate;
    private LocalDate warrantyExpiryDate;
    private AssetStatus status;
    private LocalDateTime createdAt;

    public AssetDTO() {
    }

    public AssetDTO(Long id, String assetCode, String name, String type, String category,
                    String brand, String serialNumber, String vendor, String location,
                    String assetCondition, LocalDate purchaseDate, LocalDate warrantyExpiryDate,
                    AssetStatus status, LocalDateTime createdAt) {
        this.id = id;
        this.assetCode = assetCode;
        this.name = name;
        this.type = type;
        this.category = category;
        this.brand = brand;
        this.serialNumber = serialNumber;
        this.vendor = vendor;
        this.location = location;
        this.assetCondition = assetCondition;
        this.purchaseDate = purchaseDate;
        this.warrantyExpiryDate = warrantyExpiryDate;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getAssetCode() {
        return assetCode;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public String getCategory() {
        return category;
    }

    public String getBrand() {
        return brand;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public String getVendor() {
        return vendor;
    }

    public String getLocation() {
        return location;
    }

    public String getAssetCondition() {
        return assetCondition;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public LocalDate getWarrantyExpiryDate() {
        return warrantyExpiryDate;
    }

    public AssetStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAssetCode(String assetCode) {
        this.assetCode = assetCode;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public void setVendor(String vendor) {
        this.vendor = vendor;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setAssetCondition(String assetCondition) {
        this.assetCondition = assetCondition;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public void setWarrantyExpiryDate(LocalDate warrantyExpiryDate) {
        this.warrantyExpiryDate = warrantyExpiryDate;
    }

    public void setStatus(AssetStatus status) {
        this.status = status;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}