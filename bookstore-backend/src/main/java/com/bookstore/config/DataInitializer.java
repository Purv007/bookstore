package com.bookstore.config;

import com.bookstore.model.Book;
import com.bookstore.model.User;
import com.bookstore.repository.BookRepository;
import com.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create admin user
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@bookstore.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setRole(User.Role.ADMIN);
            userRepository.save(admin);
        }

        // Create test customer
        if (!userRepository.existsByUsername("customer")) {
            User customer = new User();
            customer.setUsername("customer");
            customer.setEmail("customer@bookstore.com");
            customer.setPassword(passwordEncoder.encode("customer123"));
            customer.setFirstName("John");
            customer.setLastName("Doe");
            customer.setRole(User.Role.CUSTOMER);
            customer.setAddress("123 Main St");
            customer.setPhone("123-456-7890");
            userRepository.save(customer);
        }

        // Create sample books
        if (bookRepository.count() == 0) {
            createSampleBooks();
        }
    }

    private void createSampleBooks() {
        String[] titles = {
            "The Great Gatsby", "To Kill a Mockingbird", "1984", "Pride and Prejudice",
            "The Catcher in the Rye", "Lord of the Rings", "Harry Potter", "The Hobbit",
            "Animal Farm", "Brave New World", "The Chronicles of Narnia", "Moby Dick"
        };
        String[] authors = {
            "F. Scott Fitzgerald", "Harper Lee", "George Orwell", "Jane Austen",
            "J.D. Salinger", "J.R.R. Tolkien", "J.K. Rowling", "J.R.R. Tolkien",
            "George Orwell", "Aldous Huxley", "C.S. Lewis", "Herman Melville"
        };
        String[] genres = {
            "Fiction", "Fiction", "Dystopian", "Romance",
            "Fiction", "Fantasy", "Fantasy", "Fantasy",
            "Dystopian", "Dystopian", "Fantasy", "Adventure"
        };
        String[] descriptions = {
            "A classic American novel about the Jazz Age.",
            "A powerful story about racial injustice.",
            "A dystopian novel about totalitarianism.",
            "A romantic novel of manners.",
            "A controversial coming-of-age story.",
            "An epic fantasy adventure.",
            "A magical fantasy series.",
            "A fantasy adventure novel.",
            "A political allegory.",
            "A dystopian social science fiction.",
            "A fantasy series for children.",
            "A maritime adventure novel."
        };
        String[] images = {
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400"
        };

        for (int i = 0; i < titles.length; i++) {
            Book book = new Book();
            book.setTitle(titles[i]);
            book.setAuthor(authors[i]);
            book.setGenre(genres[i]);
            book.setIsbn("978-0-123456-7" + String.format("%02d", i + 1));
            book.setPrice(new BigDecimal(10 + (i * 2) + ".99"));
            book.setDescription(descriptions[i]);
            book.setStock(50 + (i * 10));
            book.setImageUrl(images[i]);
            bookRepository.save(book);
        }
    }
}
