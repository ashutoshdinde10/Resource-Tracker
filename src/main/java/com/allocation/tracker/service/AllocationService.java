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
        
        return allocationRepository.save(allocation);
    }
    
    public UserProjectAllocation updateAllocation(Long id, UserProjectAllocation allocationDetails) {
        UserProjectAllocation allocation = allocationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Allocation not found with id: " + id));
        
        allocation.setAllocationPercentage(allocationDetails.getAllocationPercentage());
        allocation.setIsWorking(allocationDetails.getIsWorking());
        allocation.setAllocationStartDate(allocationDetails.getAllocationStartDate());
        allocation.setAllocationEndDate(allocationDetails.getAllocationEndDate());
        allocation.setRemarks(allocationDetails.getRemarks());
        
        return allocationRepository.save(allocation);
    }
    
    public void deleteAllocation(Long id) {
        allocationRepository.deleteById(id);
    }
}

