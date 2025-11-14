# 📚 Bookstore Management System

![Java](https://img.shields.io/badge/Java-17-blue?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen?logo=springboot)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-Build-yellow?logo=vite)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-success)

A complete full‑stack bookstore management system with a backend (Spring Boot) and frontend (React + Vite). This project includes authentication, book management, orders, reviews, and an admin dashboard.

---

## 📌 Table of Contents
- Features
- Tech Stack
- Prerequisites
- Quick Start
- Manual Setup
- Default Users
- Deployment
- Environment Variables
- API Endpoints
- Folder Structure
- Testing
- Troubleshooting
- License
- Support

---

## ✨ Features

### Backend
- JWT authentication with Spring Security  
- CRUD for books, orders, and reviews  
- Admin dashboard with analytics  
- Pagination, filtering, sorting  
- Swagger/OpenAPI documentation  

### Frontend
- React + Vite + TailwindCSS  
- Shopping cart, wishlist, checkout  
- Admin book & order management  
- Framer Motion animations  
- Recharts analytics  

---

## 🧰 Tech Stack

### Backend
- Java 17  
- Spring Boot 3.2  
- JPA / Hibernate  
- MySQL  
- Maven  

### Frontend
- React 18  
- Vite  
- TailwindCSS  
- Axios  
- React Router  
- Framer Motion  

---

## 📦 Prerequisites
- Java 17+  
- Node.js 18+  
- MySQL 8+  
- Maven  
- Docker (optional)

---

## 🚀 Quick Start

### Clone Repository
```bash
git clone https://github.com/Purv007/bookstore
cd bookstore
```

### Backend Setup
```bash
cd bookstore-backend
mvn spring-boot:run
```

### Frontend Setup
```bash
cd bookstore-frontend
npm install
npm run dev
```

---

## 🛠 Manual Local Setup

### Backend – application.properties
```
spring.datasource.url=jdbc:mysql://localhost:3306/bookstore_db
spring.datasource.username=root
spring.datasource.password=yourpassword
jwt.secret=your_secret_key
```

### Frontend – .env
```
VITE_API_BASE_URL=http://localhost:8080
```

---

## 👤 Default Users

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | admin123 |
| Customer | customer | customer123 |

---

## 🌍 Deployment

### Docker Compose
```bash
docker-compose up -d
```

### Vercel (Frontend)
```bash
vercel
```

### Render / Railway (Backend)
- Add MySQL variables  
- Add JWT secret  
- Add CORS origins  

---

## 🔐 Environment Variables

### Backend
- SPRING_DATASOURCE_URL  
- SPRING_DATASOURCE_USERNAME  
- SPRING_DATASOURCE_PASSWORD  
- JWT_SECRET  
- CORS_ORIGINS  

### Frontend
- VITE_API_BASE_URL  

---

## 📡 API Endpoints

### Authentication
- `POST /api/login`
- `POST /api/register`

### Books
- `GET /api/books`
- `POST /api/books` (Admin)
- `PUT /api/books/{id}`
- `DELETE /api/books/{id}`

### Orders
- `POST /api/orders`
- `GET /api/orders`

### Reviews
- `POST /api/reviews`
- `GET /api/reviews/book/{id}`

---

## 📁 Folder Structure

```
bookstore/
│
├── bookstore-backend/
│   ├── src/main/java/com/bookstore/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── exception/
│   │   ├── model/
│   │   ├── repository/
│   │   └── service/
│   ├── src/main/resources/
│   └── pom.xml
│
├── bookstore-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── docker-compose.yml
└── README.md
```

---

## 🧪 Testing

Run backend tests:
```bash
mvn test
```

---

## 🐞 Troubleshooting

| Problem | Solution |
|--------|----------|
| Backend not connecting to MySQL | Check credentials & port |
| CORS blocked | Update allowed origins |
| Frontend not loading | Fix VITE_API_BASE_URL |
| Ports 8080/5173 busy | Change ports in config |

---

## 📄 License
MIT License.

---

## 📬 Support
Open an issue on GitHub for help.

