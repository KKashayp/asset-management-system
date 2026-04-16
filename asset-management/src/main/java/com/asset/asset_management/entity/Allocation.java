package com.asset.asset_management.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "allocations")
public class Allocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "asset_id", nullable = false)
    private Asset asset;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "allocated_by_id")
    private User allocatedBy;

    @Column(nullable = false)
    private LocalDateTime allocatedDate;

    private LocalDateTime dueDate;
    private LocalDateTime returnDate;

    private String remarks;

    @Column(nullable = false)
    private Boolean returned;

    public Allocation() {
    }

    public Allocation(Long id, Asset asset, User user, User allocatedBy,
                      LocalDateTime allocatedDate, LocalDateTime dueDate,
                      LocalDateTime returnDate, String remarks, Boolean returned) {
        this.id = id;
        this.asset = asset;
        this.user = user;
        this.allocatedBy = allocatedBy;
        this.allocatedDate = allocatedDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
        this.remarks = remarks;
        this.returned = returned;
    }

    @PrePersist
    public void onAllocate() {
        if (this.allocatedDate == null) {
            this.allocatedDate = LocalDateTime.now();
        }
        if (this.returned == null) {
            this.returned = false;
        }
    }

    public Long getId() {
        return id;
    }

    public Asset getAsset() {
        return asset;
    }

    public User getUser() {
        return user;
    }

    public User getAllocatedBy() {
        return allocatedBy;
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

    public void setAsset(Asset asset) {
        this.asset = asset;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setAllocatedBy(User allocatedBy) {
        this.allocatedBy = allocatedBy;
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