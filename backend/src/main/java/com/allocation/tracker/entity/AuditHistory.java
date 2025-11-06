package com.allocation.tracker.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_history")
@Data
@NoArgsConstructor
public class AuditHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String entityType; // USER, ALLOCATION, PROJECT
    
    @Column(nullable = false)
    private Long entityId;
    
    @Column(nullable = false)
    private String action; // CREATED, UPDATED, DELETED
    
    @Column(nullable = false)
    private LocalDateTime changeDate;
    
    private String userName;
    private String projectName;
    private String sowNumber;
    private Double allocationPercentage;
    private String teamName;
    
    @Column(length = 1000)
    private String changeDetails; // JSON or text describing what changed
    
    private String changedBy; // Who made the change (for future auth)
    
    @Column(length = 500)
    private String oldValue;
    
    @Column(length = 500)
    private String newValue;
}

