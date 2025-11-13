package com.bookstore.controller;

import com.bookstore.repository.OrderRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin", description = "Admin dashboard APIs")
public class AdminController {
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/stats")
    @Operation(summary = "Get admin dashboard statistics")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        
        LocalDateTime last30Days = LocalDateTime.now().minusDays(30);
        Double revenue = orderRepository.getTotalRevenueAfterDate(last30Days);
        
        stats.put("totalRevenue", revenue != null ? revenue : 0.0);
        stats.put("totalOrders", orderRepository.count());
        stats.put("recentOrders", orderRepository.findOrdersAfterDate(last30Days).size());
        
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/revenue")
    @Operation(summary = "Get revenue data for charts")
    public ResponseEntity<Map<String, Object>> getRevenueData(@RequestParam(defaultValue = "30") int days) {
        Map<String, Object> data = new HashMap<>();
        LocalDateTime startDate = LocalDateTime.now().minusDays(days);
        Double revenue = orderRepository.getTotalRevenueAfterDate(startDate);
        
        data.put("revenue", revenue != null ? revenue : 0.0);
        data.put("period", days + " days");
        
        return ResponseEntity.ok(data);
    }
}
