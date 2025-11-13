package com.bookstore.service;

import com.bookstore.dto.BookDTO;
import com.bookstore.model.Book;
import com.bookstore.repository.BookRepository;
import com.bookstore.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    // ==========================
    //   NO PAGINATION METHODS
    // ==========================

    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<BookDTO> searchAllBooks(String query) {
        return bookRepository.searchBooks(query)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<BookDTO> getAllBooksByGenre(String genre) {
        return bookRepository.findByGenre(genre)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<BookDTO> getInStockBooks() {
        return bookRepository.findInStockBooks()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
        return convertToDTO(book);
    }

    public BookDTO createBook(BookDTO bookDTO) {
        if (bookRepository.findByIsbn(bookDTO.getIsbn()).isPresent()) {
            throw new RuntimeException("Book with ISBN " + bookDTO.getIsbn() + " already exists");
        }

        Book book = convertToEntity(bookDTO);
        return convertToDTO(bookRepository.save(book));
    }

    public BookDTO updateBook(Long id, BookDTO bookDTO) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));

        book.setTitle(bookDTO.getTitle());
        book.setAuthor(bookDTO.getAuthor());
        book.setGenre(bookDTO.getGenre());
        book.setIsbn(bookDTO.getIsbn());
        book.setPrice(bookDTO.getPrice());
        book.setDescription(bookDTO.getDescription());
        book.setStock(bookDTO.getStock());
        book.setImageUrl(bookDTO.getImageUrl());

        return convertToDTO(bookRepository.save(book));
    }

    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("Book not found with id: " + id);
        }
        bookRepository.deleteById(id);
    }

    public List<String> getAllGenres() {
        return bookRepository.findAllGenres();
    }

    // ==========================
    //     DTO MAPPING
    // ==========================

    private BookDTO convertToDTO(Book book) {
        BookDTO dto = new BookDTO();

        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setAuthor(book.getAuthor());
        dto.setGenre(book.getGenre());
        dto.setIsbn(book.getIsbn());
        dto.setPrice(book.getPrice());
        dto.setDescription(book.getDescription());
        dto.setStock(book.getStock());
        dto.setImageUrl(book.getImageUrl());
        dto.setCreatedAt(book.getCreatedAt());

        // Ratings
        Double avgRating = reviewRepository.getAverageRatingByBook(book);
        Integer totalReviews = reviewRepository.getTotalReviewsByBook(book);

        dto.setAverageRating(avgRating != null ? avgRating : 0.0);
        dto.setTotalReviews(totalReviews != null ? totalReviews : 0);

        return dto;
    }

    private Book convertToEntity(BookDTO dto) {
        Book book = new Book();

        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setGenre(dto.getGenre());
        book.setIsbn(dto.getIsbn());
        book.setPrice(dto.getPrice());
        book.setDescription(dto.getDescription());
        book.setStock(dto.getStock() != null ? dto.getStock() : 0);
        book.setImageUrl(dto.getImageUrl());

        return book;
    }
}
