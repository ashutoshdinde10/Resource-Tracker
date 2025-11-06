package com.allocation.tracker.service;

import com.allocation.tracker.entity.User;
import com.allocation.tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AuditHistoryService auditHistoryService;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    public User createUser(User user) {
        User savedUser = userRepository.save(user);
        auditHistoryService.logUserChange(savedUser, "CREATED", null, 
            String.format("%s (%s)", savedUser.getName(), savedUser.getEmail()));
        return savedUser;
    }
    
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        
        String oldValue = String.format("%s - %s (%s)", user.getName(), user.getRole(), user.getDepartment());
        
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setDepartment(userDetails.getDepartment());
        user.setRole(userDetails.getRole());
        
        User updatedUser = userRepository.save(user);
        
        String newValue = String.format("%s - %s (%s)", updatedUser.getName(), updatedUser.getRole(), updatedUser.getDepartment());
        auditHistoryService.logUserChange(updatedUser, "UPDATED", oldValue, newValue);
        
        return updatedUser;
    }
    
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        String oldValue = String.format("%s (%s)", user.getName(), user.getEmail());
        auditHistoryService.logUserChange(user, "DELETED", oldValue, null);
        userRepository.deleteById(id);
    }
}

