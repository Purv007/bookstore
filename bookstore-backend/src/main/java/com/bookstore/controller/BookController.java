package com.bookstore.controller;

import com.bookstore.dto.BookDTO;
import com.bookstore.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/books")
@Tag(name = "Books", description = "Book management APIs")
public class BookController {

    @Autowired
    private BookService bookService;

    // ==========================
    //     NO PAGINATION
    // ==========================
    @GetMapping
    @Operation(summary = "Get all books (no pagination)")
    public ResponseEntity<List<BookDTO>> getAllBooks(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String genre) {

        if (search != null && !search.isEmpty()) {
            return ResponseEntity.ok(bookService.searchAllBooks(search));
        } else if (genre != null && !genre.isEmpty()) {
            return ResponseEntity.ok(bookService.getAllBooksByGenre(genre));
        } else {
            return ResponseEntity.ok(bookService.getAllBooks());
        }
    }

    @GetMapping("/genres")
    @Operation(summary = "Get all genres")
    public ResponseEntity<List<String>> getAllGenres() {
        return ResponseEntity.ok(bookService.getAllGenres());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get book by ID")
    public ResponseEntity<BookDTO> getBookById(@PathVariable Long id) {
        try {
            BookDTO book = bookService.getBookById(id);
            return ResponseEntity.ok(book);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new book (Admin only)")
    public ResponseEntity<?> createBook(@Valid @RequestBody BookDTO bookDTO) {
        try {
            BookDTO createdBook = bookService.createBook(bookDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdBook);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update a book (Admin only)")
    public ResponseEntity<?> updateBook(@PathVariable Long id, @Valid @RequestBody BookDTO bookDTO) {
        try {
            BookDTO updatedBook = bookService.updateBook(id, bookDTO);
            return ResponseEntity.ok(updatedBook);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a book (Admin only)")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        try {
            bookService.deleteBook(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
