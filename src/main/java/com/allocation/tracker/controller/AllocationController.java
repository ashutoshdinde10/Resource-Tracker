package com.allocation.tracker.controller;

import com.allocation.tracker.entity.UserProjectAllocation;
import com.allocation.tracker.service.AllocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/allocations")
@CrossOrigin(origins = "*")
public class AllocationController {
    
    @Autowired
    private AllocationService allocationService;
    
    @GetMapping
    public ResponseEntity<List<UserProjectAllocation>> getAllAllocations() {
        return ResponseEntity.ok(allocationService.getAllAllocations());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserProjectAllocation> getAllocationById(@PathVariable Long id) {
        return allocationService.getAllocationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserProjectAllocation>> getAllocationsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(allocationService.getAllocationsByUserId(userId));
    }
    
    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<UserProjectAllocation>> getAllocationsByProjectId(@PathVariable Long projectId) {
        return ResponseEntity.ok(allocationService.getAllocationsByProjectId(projectId));
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<UserProjectAllocation>> getActiveAllocations() {
        return ResponseEntity.ok(allocationService.getActiveAllocations());
    }
    
    @PostMapping
    public ResponseEntity<UserProjectAllocation> createAllocation(@RequestBody UserProjectAllocation allocation) {
        try {
            UserProjectAllocation createdAllocation = allocationService.createAllocation(allocation);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAllocation);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<UserProjectAllocation> updateAllocation(@PathVariable Long id, @RequestBody UserProjectAllocation allocation) {
        try {
            UserProjectAllocation updatedAllocation = allocationService.updateAllocation(id, allocation);
            return ResponseEntity.ok(updatedAllocation);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAllocation(@PathVariable Long id) {
        allocationService.deleteAllocation(id);
        return ResponseEntity.noContent().build();
    }
}

