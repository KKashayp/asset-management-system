package com.asset.asset_management.DTO;

import java.time.LocalDateTime;

public class AllocationRequestDTO {

    private Long assetId;
    private Long userId;
    private Long allocatedById;
    private LocalDateTime dueDate;
    private String remarks;

    public AllocationRequestDTO() {
    }

    public AllocationRequestDTO(Long assetId, Long userId, Long allocatedById,
                                LocalDateTime dueDate, String remarks) {
        this.assetId = assetId;
        this.userId = userId;
        this.allocatedById = allocatedById;
        this.dueDate = dueDate;
        this.remarks = remarks;
    }

    public Long getAssetId() {
        return assetId;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getAllocatedById() {
        return allocatedById;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setAssetId(Long assetId) {
        this.assetId = assetId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setAllocatedById(Long allocatedById) {
        this.allocatedById = allocatedById;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}