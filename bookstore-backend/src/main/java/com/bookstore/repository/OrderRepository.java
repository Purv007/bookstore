package com.bookstore.repository;

import com.bookstore.model.Order;
import com.bookstore.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
    List<Order> findByUserOrderByCreatedAtDesc(User user);
    
    @Query("SELECT o FROM Order o WHERE o.createdAt >= :startDate")
    List<Order> findOrdersAfterDate(LocalDateTime startDate);
    
    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE o.paymentStatus = 'PAID' AND o.createdAt >= :startDate")
    Double getTotalRevenueAfterDate(LocalDateTime startDate);
}
