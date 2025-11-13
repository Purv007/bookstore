package com.bookstore.repository;

import com.bookstore.model.Book;
import com.bookstore.model.Review;
import com.bookstore.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByBook(Book book);
    List<Review> findByBookOrderByCreatedAtDesc(Book book);
    Optional<Review> findByUserAndBook(User user, Book book);
    boolean existsByUserAndBook(User user, Book book);
    
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.book = :book")
    Double getAverageRatingByBook(@Param("book") Book book);
    
    @Query("SELECT COUNT(r) FROM Review r WHERE r.book = :book")
    Integer getTotalReviewsByBook(@Param("book") Book book);
}
