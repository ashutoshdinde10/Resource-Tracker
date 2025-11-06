package com.allocation.tracker.repository;

import com.allocation.tracker.entity.AuditHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AuditHistoryRepository extends JpaRepository<AuditHistory, Long> {
    List<AuditHistory> findAllByOrderByChangeDateDesc();
    List<AuditHistory> findByEntityTypeAndEntityIdOrderByChangeDateDesc(String entityType, Long entityId);
}

