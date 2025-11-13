# Bookstore Backend

Spring Boot REST API for Bookstore Management System.

## Features

- User Authentication (JWT)
- Book CRUD Operations
- Order Management
- Review System
- Admin Dashboard
- Swagger API Documentation

## Tech Stack

- Java 17+
- Spring Boot 3.2.0
- Spring Security
- JWT Authentication
- MySQL
- JPA/Hibernate
- Swagger/OpenAPI

## Setup

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+ (or Docker)

### Local Development

1. Start MySQL using Docker:
```bash
docker run -d --name bookstore-mysql -e MYSQL_ROOT_PASSWORD=rootpassword -e MYSQL_DATABASE=bookstore_db -p 3306:3306 mysql:8.0
```

2. Update `application.properties` with your database credentials if needed.

3. Build and run:
```bash
mvn clean install
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

### Swagger Documentation

Access Swagger UI at: `http://localhost:8080/swagger-ui.html`

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user

### Books
- `GET /api/books` - Get all books (with pagination, search, filter)
- `GET /api/books/{id}` - Get book by ID
- `POST /api/books` - Create book (Admin only)
- `PUT /api/books/{id}` - Update book (Admin only)
- `DELETE /api/books/{id}` - Delete book (Admin only)

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/{id}` - Get order by ID
- `POST /api/orders` - Create order
- `PUT /api/orders/{id}/status` - Update order status (Admin only)

### Reviews
- `GET /api/reviews/book/{bookId}` - Get reviews for a book
- `POST /api/reviews` - Create review
- `PUT /api/reviews/{id}` - Update review
- `DELETE /api/reviews/{id}` - Delete review

## Default Users

- **Admin**: username: `admin`, password: `admin123`
- **Customer**: username: `customer`, password: `customer123`

## Environment Variables

For production deployment, set these environment variables:

- `SPRING_DATASOURCE_URL` - MySQL connection URL
- `SPRING_DATASOURCE_USERNAME` - MySQL username
- `SPRING_DATASOURCE_PASSWORD` - MySQL password
- `JWT_SECRET` - JWT secret key (minimum 256 bits)
- `CORS_ORIGINS` - Allowed CORS origins (comma-separated)
