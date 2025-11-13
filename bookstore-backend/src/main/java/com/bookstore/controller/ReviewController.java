package com.bookstore.controller;

import com.bookstore.dto.CreateReviewRequest;
import com.bookstore.dto.ReviewDTO;
import com.bookstore.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/reviews")
@Tag(name = "Reviews", description = "Review management APIs")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @GetMapping("/book/{bookId}")
    @Operation(summary = "Get all reviews for a book")
    public ResponseEntity<List<ReviewDTO>> getReviewsByBook(@PathVariable Long bookId) {
        return ResponseEntity.ok(reviewService.getReviewsByBook(bookId));
    }

    @PostMapping
    @Operation(summary = "Create a new review")
    public ResponseEntity<?> createReview(@Valid @RequestBody CreateReviewRequest request) {
        try {
            ReviewDTO review = reviewService.createReview(request, getCurrentUsername());
            return ResponseEntity.status(HttpStatus.CREATED).body(review);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a review")
    public ResponseEntity<?> updateReview(@PathVariable Long id, @Valid @RequestBody CreateReviewRequest request) {
        try {
            ReviewDTO review = reviewService.updateReview(id, request, getCurrentUsername());
            return ResponseEntity.ok(review);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a review")
    public ResponseEntity<?> deleteReview(@PathVariable Long id) {
        try {
            reviewService.deleteReview(id, getCurrentUsername());
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
