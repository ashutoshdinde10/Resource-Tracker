package com.allocation.tracker.controller;

import com.allocation.tracker.entity.AuditHistory;
import com.allocation.tracker.service.AuditHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "*")
public class AuditHistoryController {
    
    @Autowired
    private AuditHistoryService auditHistoryService;
    
    @GetMapping
    public List<AuditHistory> getAllHistory() {
        return auditHistoryService.getAllHistory();
    }
}

