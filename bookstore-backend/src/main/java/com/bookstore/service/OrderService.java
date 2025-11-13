package com.bookstore.service;

import com.bookstore.dto.BookDTO;
import com.bookstore.dto.CreateOrderRequest;
import com.bookstore.dto.OrderDTO;
import com.bookstore.dto.OrderItemDTO;
import com.bookstore.model.*;
import com.bookstore.repository.BookRepository;
import com.bookstore.repository.OrderRepository;
import com.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<OrderDTO> getOrdersByUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return orderRepository.findByUserOrderByCreatedAtDesc(user).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public OrderDTO getOrderById(Long id, String username) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        if (!order.getUser().getId().equals(user.getId()) && !user.getRole().equals(User.Role.ADMIN)) {
            throw new RuntimeException("Access denied");
        }

        return convertToDTO(order);
    }

    public OrderDTO createOrder(CreateOrderRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress(request.getShippingAddress());
        order.setPaymentMethod(request.getPaymentMethod());
        order.setStatus(Order.OrderStatus.PENDING);
        order.setPaymentStatus(Order.PaymentStatus.PENDING);

        BigDecimal totalPrice = BigDecimal.ZERO;

        for (var itemRequest : request.getItems()) {
            Book book = bookRepository.findById(itemRequest.getBookId())
                    .orElseThrow(() -> new RuntimeException("Book not found with id: " + itemRequest.getBookId()));

            if (book.getStock() < itemRequest.getQuantity()) {
                throw new RuntimeException("Insufficient stock for book: " + book.getTitle());
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setBook(book);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPrice(book.getPrice());

            order.getOrderItems().add(orderItem);
            totalPrice = totalPrice.add(orderItem.getSubtotal());

            book.setStock(book.getStock() - itemRequest.getQuantity());
            bookRepository.save(book);
        }

        order.setTotalPrice(totalPrice);
        order = orderRepository.save(order);

        return convertToDTO(order);
    }

    public OrderDTO updateOrderStatus(Long id, Order.OrderStatus status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        order.setStatus(status);
        order = orderRepository.save(order);

        return convertToDTO(order);
    }

    public OrderDTO updatePaymentStatus(Long id, Order.PaymentStatus paymentStatus) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        order.setPaymentStatus(paymentStatus);
        if (paymentStatus == Order.PaymentStatus.PAID) {
            order.setStatus(Order.OrderStatus.PROCESSING);
        }
        order = orderRepository.save(order);

        return convertToDTO(order);
    }

    private OrderDTO convertToDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setUserId(order.getUser().getId());
        dto.setUsername(order.getUser().getUsername());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setStatus(order.getStatus());
        dto.setPaymentStatus(order.getPaymentStatus());
        dto.setShippingAddress(order.getShippingAddress());
        dto.setPaymentMethod(order.getPaymentMethod());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setUpdatedAt(order.getUpdatedAt());

        List<OrderItemDTO> itemDTOs = order.getOrderItems().stream()
                .map(item -> {
                    OrderItemDTO itemDTO = new OrderItemDTO();
                    itemDTO.setId(item.getId());
                    itemDTO.setQuantity(item.getQuantity());
                    itemDTO.setPrice(item.getPrice());
                    itemDTO.setSubtotal(item.getSubtotal());

                    BookDTO bookDTO = new BookDTO();
                    bookDTO.setId(item.getBook().getId());
                    bookDTO.setTitle(item.getBook().getTitle());
                    bookDTO.setAuthor(item.getBook().getAuthor());
                    bookDTO.setImageUrl(item.getBook().getImageUrl());
                    bookDTO.setPrice(item.getBook().getPrice());

                    itemDTO.setBook(bookDTO);
                    return itemDTO;
                })
                .collect(Collectors.toList());

        dto.setOrderItems(itemDTOs);
        return dto;
    }
}
