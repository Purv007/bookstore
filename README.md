# 📚 Bookstore Management System

![Java](https://img.shields.io/badge/Java-17-blue?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen?logo=springboot)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)
![License](https://img.shields.io/badge/License-MIT-green)

A production-style, full-stack bookstore platform built with **Spring Boot + React**.  
It includes secure JWT authentication, role-based access, catalog browsing with search/filtering, order lifecycle management, reviews, and an admin analytics dashboard.

---

## 🚀 Key Features

### Customer Experience
- User registration and login with JWT authentication
- Browse books with pagination, keyword search, genre filter, and sorting
- View book details and submit/edit/delete reviews
- Cart and checkout flow with order creation and payment status updates
- Profile and order history views

### Admin Experience
- Create, update, and delete books
- View all orders and update order/payment statuses
- Access dashboard KPIs (`/api/admin/stats`) and revenue analytics (`/api/admin/revenue`)

### Platform & Engineering
- Spring Security with stateless JWT auth filter
- Layered backend architecture (controller → service → repository)
- OpenAPI/Swagger UI enabled for API exploration
- Seed data initializer for quick local onboarding
- Dockerized full stack with MySQL, backend, and frontend services

---

## 🏗️ System Architecture

```text
+------------------------+        +-----------------------------+        +----------------------+
| React Frontend (Vite) | -----> | Spring Boot REST API       | -----> | MySQL 8 Database     |
| - Catalog/UI           |  HTTP  | - Auth, Books, Orders,     |  JPA   | - Users              |
| - Cart/Checkout        |        |   Reviews, Admin Analytics |        | - Books              |
| - Admin Dashboard      | <----- | - JWT + Role Authorization | <----- | - Orders/OrderItems  |
+------------------------+  JSON  +-----------------------------+        | - Reviews            |
                                                                          +----------------------+
```

---

## 🧰 Tech Stack

| Layer | Technologies |
|------|--------------|
| Frontend | React 18, Vite 5, React Router, Axios, TailwindCSS, Framer Motion, Recharts |
| Backend | Java 17, Spring Boot 3.2, Spring Security, Spring Data JPA, Hibernate, JWT (jjwt) |
| Database | MySQL 8 |
| API Docs | springdoc-openapi (Swagger UI) |
| DevOps | Docker, Docker Compose |

---

## 📂 Project Structure

bookstore/
├── bookstore-backend/
│   ├── src/main/java/com/bookstore/
│   │   ├── config/          # Swagger config, startup seed data
│   │   ├── controller/      # REST controllers
│   │   ├── dto/             # Request/response DTOs
│   │   ├── exception/       # Global exception handling
│   │   ├── model/           # JPA entities
│   │   ├── repository/      # Data access layer
│   │   ├── security/        # JWT filter/provider/security config
│   │   └── service/         # Business logic
│   ├── src/main/resources/  # application properties
│   ├── Dockerfile
│   └── pom.xml
├── bookstore-frontend/
│   ├── src/
│   │   ├── api/             # Axios instance
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # Auth/cart/theme state
│   │   ├── pages/           # Route-level pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Prerequisites

- Java 17+
- Maven 3.6+
- Node.js 18+
- npm 9+
- MySQL 8+ (if not using Docker)
- Docker + Docker Compose (recommended)

---

## 🐳 Quick Start (Docker Compose)

From the repository root:

```bash
docker-compose up --build
```

Services:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8080`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- MySQL: `localhost:3306`

Default Docker credentials/config:
- MySQL DB: `bookstore_db`
- MySQL user: `root`
- MySQL password: `rootpassword`

---

## 💻 Local Development Setup (Without Docker)

### 1) Backend

```bash
cd bookstore-backend
mvn clean install
mvn spring-boot:run
```

Update `bookstore-backend/src/main/resources/application.properties` for your local DB if needed.

### 2) Frontend

```bash

cd bookstore-frontend
npm install
npm run dev
```

If required, set API base URL in frontend environment config:

```bash
VITE_API_BASE_URL=http://localhost:8080
```

---

## 🔐 Authentication & Roles

The system supports role-based access:
- `ROLE_USER` for regular customers
- `ROLE_ADMIN` for admin-only operations

JWT token is returned on login and used by the frontend for authenticated API calls.

### Seeded Demo Accounts
| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| Customer | `customer` | `customer123` |

---

## 📡 API Overview

### Auth
- `POST /api/register`
- `POST /api/login`

### Books
- `GET /api/books`

- `GET /api/books/genres`
- `GET /api/books/{id}`
- `POST /api/books` *(Admin)*
- `PUT /api/books/{id}` *(Admin)*
- `DELETE /api/books/{id}` *(Admin)*

### Orders

- `GET /api/orders`
- `GET /api/orders/all` *(Admin)*
- `GET /api/orders/{id}`
- `POST /api/orders`
- `PUT /api/orders/{id}/status` *(Admin)*
- `PUT /api/orders/{id}/payment-status` *(Admin)*

### Reviews
- `GET /api/reviews/book/{bookId}`
- `POST /api/reviews`
- `PUT /api/reviews/{id}`
- `DELETE /api/reviews/{id}`

### Admin Analytics
- `GET /api/admin/stats`
- `GET /api/admin/revenue`

---

## 🧪 Validation & Quality Checks

Backend:
```bash
cd bookstore-backend
mvn test
```

Frontend:
```bash
cd bookstore-frontend
npm run lint
npm run build
```

---

## 🌍 Deployment Notes

- Use `application-prod.properties` for production profile settings.
- Externalize secrets through environment variables (`SPRING_DATASOURCE_*`, `JWT_SECRET`, `APP_CORS_ALLOWED_ORIGINS`).
- Build production frontend using `npm run build` and serve static assets via CDN/reverse proxy.
- Run backend behind HTTPS-enabled ingress/load balancer.

---

## 🛠 Troubleshooting

| Issue | Suggested Fix |
|------|----------------|
| Backend cannot connect to DB | Verify DB host/port/credentials and datasource URL |
| 401 Unauthorized errors | Ensure JWT token is present and unexpired |
| CORS errors in browser | Update `APP_CORS_ALLOWED_ORIGINS` |
| Frontend API calls failing | Verify `VITE_API_BASE_URL` and backend availability |
| Docker startup race conditions | Confirm MySQL healthcheck passes before backend starts |

---

## 📄 License

This project is licensed under the **MIT License**.

## 👨‍💻 Author

**Purv Patel**  
📧 patelpurv908@gmail.com  
🔗 [GitHub](https://github.com/Purv007) | [LinkedIn](https://www.linkedin.com/in/purv-patel-b31a84280/)
