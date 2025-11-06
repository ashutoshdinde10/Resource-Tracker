package com.allocation.tracker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "user_project_allocations")
@Data
@NoArgsConstructor
public class UserProjectAllocation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;
    
    @Column(nullable = false)
    private Double allocationPercentage; // 0-100
    
    @Column(nullable = false)
    private Boolean isWorking; // true = currently working, false = not working
    
    private LocalDate allocationStartDate;
    
    private LocalDate allocationEndDate;
    
    private String sowNumber; // Statement of Work number
    
    private String teamName; // Team name within the project
    
    private String remarks;
}

