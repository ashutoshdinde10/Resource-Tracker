package com.allocation.tracker.repository;

import com.allocation.tracker.entity.UserProjectAllocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AllocationRepository extends JpaRepository<UserProjectAllocation, Long> {
    
    List<UserProjectAllocation> findByUserId(Long userId);
    
    List<UserProjectAllocation> findByProjectId(Long projectId);
    
    List<UserProjectAllocation> findByIsWorking(Boolean isWorking);
    
    @Query("SELECT a FROM UserProjectAllocation a WHERE a.user.id = :userId AND a.isWorking = true")
    List<UserProjectAllocation> findActiveAllocationsByUserId(Long userId);
}

