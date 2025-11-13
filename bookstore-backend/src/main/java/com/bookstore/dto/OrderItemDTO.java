package com.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {
    private Long id;
    private BookDTO book;
    private Integer quantity;
    private BigDecimal price;
    private BigDecimal subtotal;
}
