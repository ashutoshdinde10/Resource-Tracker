package com.allocation.tracker.service;

import com.allocation.tracker.entity.AuditHistory;
import com.allocation.tracker.entity.User;
import com.allocation.tracker.entity.UserProjectAllocation;
import com.allocation.tracker.repository.AuditHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuditHistoryService {
    
    @Autowired
    private AuditHistoryRepository auditHistoryRepository;
    
    public List<AuditHistory> getAllHistory() {
        return auditHistoryRepository.findAllByOrderByChangeDateDesc();
    }
    
    public void logUserChange(User user, String action, String oldValue, String newValue) {
        AuditHistory history = new AuditHistory();
        history.setEntityType("USER");
        history.setEntityId(user.getId());
        history.setAction(action);
        history.setChangeDate(LocalDateTime.now());
        history.setUserName(user.getName());
        history.setOldValue(oldValue);
        history.setNewValue(newValue);
        
        String details = buildUserChangeDetails(user, action);
        history.setChangeDetails(details);
        
        auditHistoryRepository.save(history);
    }
    
    public void logAllocationChange(UserProjectAllocation allocation, String action, String oldValue, String newValue) {
        AuditHistory history = new AuditHistory();
        history.setEntityType("ALLOCATION");
        history.setEntityId(allocation.getId());
        history.setAction(action);
        history.setChangeDate(LocalDateTime.now());
        history.setUserName(allocation.getUser() != null ? allocation.getUser().getName() : "Unknown");
        history.setProjectName(allocation.getProject() != null ? allocation.getProject().getName() : "Unknown");
        history.setSowNumber(allocation.getSowNumber());
        history.setAllocationPercentage(allocation.getAllocationPercentage());
        history.setTeamName(allocation.getTeamName());
        history.setOldValue(oldValue);
        history.setNewValue(newValue);
        
        String details = buildAllocationChangeDetails(allocation, action);
        history.setChangeDetails(details);
        
        auditHistoryRepository.save(history);
    }
    
    private String buildUserChangeDetails(User user, String action) {
        switch (action) {
            case "CREATED":
                return String.format("User '%s' created - Role: %s, Department: %s", 
                    user.getName(), user.getRole(), user.getDepartment());
            case "UPDATED":
                return String.format("User '%s' updated - Role: %s, Department: %s", 
                    user.getName(), user.getRole(), user.getDepartment());
            case "DELETED":
                return String.format("User '%s' deleted", user.getName());
            default:
                return action;
        }
    }
    
    private String buildAllocationChangeDetails(UserProjectAllocation allocation, String action) {
        switch (action) {
            case "CREATED":
                return String.format("Allocation created: %s assigned to %s (%.0f%%) - SOW: %s, Team: %s", 
                    allocation.getUser() != null ? allocation.getUser().getName() : "Unknown",
                    allocation.getProject() != null ? allocation.getProject().getName() : "Unknown",
                    allocation.getAllocationPercentage(),
                    allocation.getSowNumber() != null ? allocation.getSowNumber() : "N/A",
                    allocation.getTeamName() != null ? allocation.getTeamName() : "N/A");
            case "UPDATED":
                return String.format("Allocation updated: %s on %s (%.0f%%) - SOW: %s, Team: %s", 
                    allocation.getUser() != null ? allocation.getUser().getName() : "Unknown",
                    allocation.getProject() != null ? allocation.getProject().getName() : "Unknown",
                    allocation.getAllocationPercentage(),
                    allocation.getSowNumber() != null ? allocation.getSowNumber() : "N/A",
                    allocation.getTeamName() != null ? allocation.getTeamName() : "N/A");
            case "DELETED":
                return String.format("Allocation deleted: %s from %s", 
                    allocation.getUser() != null ? allocation.getUser().getName() : "Unknown",
                    allocation.getProject() != null ? allocation.getProject().getName() : "Unknown");
            default:
                return action;
        }
    }
}

