package com.bookstore.controller;

import com.bookstore.dto.CreateOrderRequest;
import com.bookstore.dto.OrderDTO;
import com.bookstore.model.Order;
import com.bookstore.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/orders")
@Tag(name = "Orders", description = "Order management APIs")
public class OrderController {
    @Autowired
    private OrderService orderService;

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @GetMapping
    @Operation(summary = "Get all orders (Admin) or user's orders (Customer)")
    public ResponseEntity<List<OrderDTO>> getOrders() {
        List<OrderDTO> orders = orderService.getOrdersByUser(getCurrentUsername());
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all orders (Admin only)")
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get order by ID")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        try {
            OrderDTO order = orderService.getOrderById(id, getCurrentUsername());
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    @Operation(summary = "Create a new order")
    public ResponseEntity<?> createOrder(@Valid @RequestBody CreateOrderRequest request) {
        try {
            OrderDTO order = orderService.createOrder(request, getCurrentUsername());
            return ResponseEntity.status(HttpStatus.CREATED).body(order);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update order status (Admin only)")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestParam Order.OrderStatus status) {
        try {
            OrderDTO order = orderService.updateOrderStatus(id, status);
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/payment-status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update payment status (Admin only)")
    public ResponseEntity<?> updatePaymentStatus(@PathVariable Long id, @RequestParam Order.PaymentStatus paymentStatus) {
        try {
            OrderDTO order = orderService.updatePaymentStatus(id, paymentStatus);
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
