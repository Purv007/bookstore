package com.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDTO {
    private Long id;
    private String title;
    private String author;
    private String genre;
    private String isbn;
    private BigDecimal price;
    private String description;
    private Integer stock;
    private String imageUrl;
    private LocalDateTime createdAt;
    private Double averageRating;
    private Integer totalReviews;
}
