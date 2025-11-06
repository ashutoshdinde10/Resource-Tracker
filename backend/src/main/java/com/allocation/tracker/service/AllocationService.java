package com.allocation.tracker.service;

import com.allocation.tracker.entity.Project;
import com.allocation.tracker.entity.User;
import com.allocation.tracker.entity.UserProjectAllocation;
import com.allocation.tracker.repository.AllocationRepository;
import com.allocation.tracker.repository.ProjectRepository;
import com.allocation.tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AllocationService {
    
    @Autowired
    private AllocationRepository allocationRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private AuditHistoryService auditHistoryService;
    
    public List<UserProjectAllocation> getAllAllocations() {
        return allocationRepository.findAll();
    }
    
    public Optional<UserProjectAllocation> getAllocationById(Long id) {
        return allocationRepository.findById(id);
    }
    
    public List<UserProjectAllocation> getAllocationsByUserId(Long userId) {
        return allocationRepository.findByUserId(userId);
    }
    
    public List<UserProjectAllocation> getAllocationsByProjectId(Long projectId) {
        return allocationRepository.findByProjectId(projectId);
    }
    
    public List<UserProjectAllocation> getActiveAllocations() {
        return allocationRepository.findByIsWorking(true);
    }
    
    public UserProjectAllocation createAllocation(UserProjectAllocation allocation) {
        // Validate user exists
        User user = userRepository.findById(allocation.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + allocation.getUser().getId()));
        
        // Validate project exists
        Project project = projectRepository.findById(allocation.getProject().getId())
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + allocation.getProject().getId()));
        
        allocation.setUser(user);
        allocation.setProject(project);
        
        UserProjectAllocation savedAllocation = allocationRepository.save(allocation);
        
        String newValue = String.format("%s on %s - %.0f%% (SOW: %s, Team: %s)", 
            user.getName(), project.getName(), savedAllocation.getAllocationPercentage(),
            savedAllocation.getSowNumber() != null ? savedAllocation.getSowNumber() : "N/A",
            savedAllocation.getTeamName() != null ? savedAllocation.getTeamName() : "N/A");
        auditHistoryService.logAllocationChange(savedAllocation, "CREATED", null, newValue);
        
        return savedAllocation;
    }
    
    public UserProjectAllocation updateAllocation(Long id, UserProjectAllocation allocationDetails) {
        UserProjectAllocation allocation = allocationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Allocation not found with id: " + id));
        
        String oldValue = String.format("%.0f%% (SOW: %s, Team: %s)", 
            allocation.getAllocationPercentage(),
            allocation.getSowNumber() != null ? allocation.getSowNumber() : "N/A",
            allocation.getTeamName() != null ? allocation.getTeamName() : "N/A");
        
        allocation.setAllocationPercentage(allocationDetails.getAllocationPercentage());
        allocation.setIsWorking(allocationDetails.getIsWorking());
        allocation.setAllocationStartDate(allocationDetails.getAllocationStartDate());
        allocation.setAllocationEndDate(allocationDetails.getAllocationEndDate());
        allocation.setSowNumber(allocationDetails.getSowNumber());
        allocation.setTeamName(allocationDetails.getTeamName());
        allocation.setRemarks(allocationDetails.getRemarks());
        
        UserProjectAllocation updatedAllocation = allocationRepository.save(allocation);
        
        String newValue = String.format("%.0f%% (SOW: %s, Team: %s)", 
            updatedAllocation.getAllocationPercentage(),
            updatedAllocation.getSowNumber() != null ? updatedAllocation.getSowNumber() : "N/A",
            updatedAllocation.getTeamName() != null ? updatedAllocation.getTeamName() : "N/A");
        auditHistoryService.logAllocationChange(updatedAllocation, "UPDATED", oldValue, newValue);
        
        return updatedAllocation;
    }
    
    public void deleteAllocation(Long id) {
        UserProjectAllocation allocation = allocationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Allocation not found with id: " + id));
        
        String oldValue = String.format("%s on %s - %d%%", 
            allocation.getUser() != null ? allocation.getUser().getName() : "Unknown",
            allocation.getProject() != null ? allocation.getProject().getName() : "Unknown",
            allocation.getAllocationPercentage());
        auditHistoryService.logAllocationChange(allocation, "DELETED", oldValue, null);
        
        allocationRepository.deleteById(id);
    }
}

