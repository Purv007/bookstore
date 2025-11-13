package com.bookstore.dto;

import com.bookstore.model.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private Long id;
    private Long userId;
    private String username;
    private List<OrderItemDTO> orderItems = new ArrayList<>();
    private BigDecimal totalPrice;
    private Order.OrderStatus status;
    private Order.PaymentStatus paymentStatus;
    private String shippingAddress;
    private String paymentMethod;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
