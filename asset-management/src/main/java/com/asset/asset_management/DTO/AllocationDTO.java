package com.asset.asset_management.DTO;

import java.time.LocalDateTime;

public class AllocationDTO {

    private Long id;

    private Long assetId;
    private String assetName;
    private String assetCode;

    private Long userId;
    private String userName;
    private String userEmail;

    private Long allocatedById;
    private String allocatedByName;

    private LocalDateTime allocatedDate;
    private LocalDateTime dueDate;
    private LocalDateTime returnDate;

    private String remarks;
    private Boolean returned;

    public AllocationDTO() {
    }

    public AllocationDTO(Long id, Long assetId, String assetName, String assetCode,
                         Long userId, String userName, String userEmail,
                         Long allocatedById, String allocatedByName,
                         LocalDateTime allocatedDate, LocalDateTime dueDate,
                         LocalDateTime returnDate, String remarks, Boolean returned) {
        this.id = id;
        this.assetId = assetId;
        this.assetName = assetName;
        this.assetCode = assetCode;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.allocatedById = allocatedById;
        this.allocatedByName = allocatedByName;
        this.allocatedDate = allocatedDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
        this.remarks = remarks;
        this.returned = returned;
    }

    public Long getId() {
        return id;
    }

    public Long getAssetId() {
        return assetId;
    }

    public String getAssetName() {
        return assetName;
    }

    public String getAssetCode() {
        return assetCode;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public Long getAllocatedById() {
        return allocatedById;
    }

    public String getAllocatedByName() {
        return allocatedByName;
    }

    public LocalDateTime getAllocatedDate() {
        return allocatedDate;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public LocalDateTime getReturnDate() {
        return returnDate;
    }

    public String getRemarks() {
        return remarks;
    }

    public Boolean getReturned() {
        return returned;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAssetId(Long assetId) {
        this.assetId = assetId;
    }

    public void setAssetName(String assetName) {
        this.assetName = assetName;
    }

    public void setAssetCode(String assetCode) {
        this.assetCode = assetCode;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setAllocatedById(Long allocatedById) {
        this.allocatedById = allocatedById;
    }

    public void setAllocatedByName(String allocatedByName) {
        this.allocatedByName = allocatedByName;
    }

    public void setAllocatedDate(LocalDateTime allocatedDate) {
        this.allocatedDate = allocatedDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public void setReturnDate(LocalDateTime returnDate) {
        this.returnDate = returnDate;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public void setReturned(Boolean returned) {
        this.returned = returned;
    }
}