package com.bookstore.service;

import com.bookstore.dto.CreateReviewRequest;
import com.bookstore.dto.ReviewDTO;
import com.bookstore.model.Book;
import com.bookstore.model.Review;
import com.bookstore.model.User;
import com.bookstore.repository.BookRepository;
import com.bookstore.repository.ReviewRepository;
import com.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    public List<ReviewDTO> getReviewsByBook(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + bookId));
        return reviewRepository.findByBookOrderByCreatedAtDesc(book).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ReviewDTO createReview(CreateReviewRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + request.getBookId()));

        if (reviewRepository.existsByUserAndBook(user, book)) {
            throw new RuntimeException("You have already reviewed this book");
        }

        Review review = new Review();
        review.setUser(user);
        review.setBook(book);
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        review = reviewRepository.save(review);
        return convertToDTO(review);
    }

    public ReviewDTO updateReview(Long id, CreateReviewRequest request, String username) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        if (!review.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You can only update your own reviews");
        }

        review.setRating(request.getRating());
        review.setComment(request.getComment());

        review = reviewRepository.save(review);
        return convertToDTO(review);
    }

    public void deleteReview(Long id, String username) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        if (!review.getUser().getId().equals(user.getId()) && !user.getRole().equals(User.Role.ADMIN)) {
            throw new RuntimeException("Access denied");
        }

        reviewRepository.delete(review);
    }

    private ReviewDTO convertToDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setUserId(review.getUser().getId());
        dto.setUsername(review.getUser().getUsername());
        dto.setBookId(review.getBook().getId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setCreatedAt(review.getCreatedAt());
        dto.setUpdatedAt(review.getUpdatedAt());
        return dto;
    }
}
