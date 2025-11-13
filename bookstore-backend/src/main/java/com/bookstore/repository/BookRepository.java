package com.bookstore.repository;

import com.bookstore.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    Optional<Book> findByIsbn(String isbn);

    // Search WITHOUT pagination
    @Query("SELECT b FROM Book b WHERE " +
           "LOWER(b.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(b.author) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Book> searchBooks(String query);

    // Genre filtering WITHOUT pagination
    List<Book> findByGenre(String genre);

    // All genres
    @Query("SELECT DISTINCT b.genre FROM Book b")
    List<String> findAllGenres();

    // In-stock books (NO pagination)
    @Query("SELECT b FROM Book b WHERE b.stock > 0")
    List<Book> findInStockBooks();
}
