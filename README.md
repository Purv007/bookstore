# Bookstore Management System

A complete, production-ready full-stack bookstore management system with backend (Spring Boot) and frontend (React + Vite).

## Features

### Backend
- **User Authentication**: JWT-based authentication with BCrypt password hashing
- **Book Management**: Full CRUD operations with search, pagination, and filtering
- **Order Management**: Complete order lifecycle management
- **Review System**: User reviews and ratings for books
- **Admin Dashboard**: Analytics and management tools
- **API Documentation**: Swagger/OpenAPI integration

### Frontend
- **Responsive Design**: Mobile, tablet, and desktop support
- **Dark Mode**: Toggle between light and dark themes
- **Animations**: Smooth transitions using Framer Motion
- **Shopping Cart**: Add, update, and manage cart items
- **Checkout**: Complete order placement flow
- **Admin Dashboard**: Book and order management with analytics
- **Reviews**: User reviews and ratings with star system

## Tech Stack

### Backend
- Java 17+
- Spring Boot 3.2.0
- Spring Security
- JWT Authentication
- MySQL 8.0
- JPA/Hibernate
- Swagger/OpenAPI

### Frontend
- React 18
- Vite
- TailwindCSS
- Axios
- React Router
- Framer Motion
- Recharts
- React Hot Toast

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- Node.js 18+ and npm
- MySQL 8.0+ installed locally
- Docker and Docker Compose (optional, for containerized setup - see docker-compose.yml)

## 🚀 Quick Start

**New to this project? Start here:** [START_HERE.md](START_HERE.md)

### Local Development

See [COMPLETE_LOCAL_SETUP.md](COMPLETE_LOCAL_SETUP.md) for complete step-by-step guide.

**Quick Steps:**
1. Install MySQL locally (or use Docker)
2. Create `.env` file in `bookstore-frontend` folder: `VITE_API_BASE_URL=http://localhost:8080`
3. Start backend: `cd bookstore-backend && mvn spring-boot:run`
4. Start frontend: `cd bookstore-frontend && npm run dev`
5. Open: http://localhost:5173

### Production Deployment

See [COMPLETE_DEPLOYMENT_GUIDE.md](COMPLETE_DEPLOYMENT_GUIDE.md) for complete deployment guide.

**Quick Steps:**
1. Push code to GitHub
2. Create cloud MySQL (Railway/PlanetScale)
3. Deploy backend to Render
4. Deploy frontend to Vercel
5. Update CORS settings

## Optional: Docker Compose Setup

If you prefer using Docker, you can use docker-compose:

1. Clone the repository:
```bash
git clone <repository-url>
cd cursor_bookstore
```

2. Start all services:
```bash
docker-compose up -d
```

3. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html

## Manual Setup (Recommended)

### Backend Setup

1. Navigate to backend directory:
```bash
cd bookstore-backend
```

2. **Default credentials work for local MySQL:**
   - Username: `root`
   - Password: `rootpassword`
   - Database: `bookstore_db` (created automatically)
   
   If your MySQL has different credentials, update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bookstore_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Build and run:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will be available at `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd bookstore-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
```

4. Run development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Default Users

- **Admin**: 
  - Username: `admin`
  - Password: `admin123`

- **Customer**: 
  - Username: `customer`
  - Password: `customer123`

## Deployment

### Backend Deployment (Render/Railway)

1. Push your code to GitHub
2. Connect your repository to Render/Railway
3. Set environment variables:
   - `SPRING_DATASOURCE_URL`: Your MySQL connection URL
   - `SPRING_DATASOURCE_USERNAME`: MySQL username
   - `SPRING_DATASOURCE_PASSWORD`: MySQL password
   - `JWT_SECRET`: A strong secret key (minimum 256 bits)
   - `CORS_ORIGINS`: Your frontend URL (e.g., https://your-app.vercel.app)

4. Deploy

### Frontend Deployment (Vercel)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Navigate to frontend directory:
```bash
cd bookstore-frontend
```

3. Deploy:
```bash
vercel
```

4. Set environment variables in Vercel dashboard:
   - `VITE_API_BASE_URL`: Your backend API URL
   - `VITE_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key (if using Stripe)

### Database Deployment (Railway/PlanetScale)

1. Create a MySQL database on Railway or PlanetScale
2. Get the connection URL
3. Update backend environment variables with the new database URL

## Environment Variables

### Backend
- `SPRING_DATASOURCE_URL`: MySQL connection URL
- `SPRING_DATASOURCE_USERNAME`: MySQL username
- `SPRING_DATASOURCE_PASSWORD`: MySQL password
- `JWT_SECRET`: JWT secret key (minimum 256 bits)
- `CORS_ORIGINS`: Allowed CORS origins (comma-separated)

### Frontend
- `VITE_API_BASE_URL`: Backend API URL
- `VITE_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key (optional)

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user

### Books
- `GET /api/books` - Get all books (with pagination, search, filter)
- `GET /api/books/{id}` - Get book by ID
- `GET /api/books/genres` - Get all genres
- `POST /api/books` - Create book (Admin only)
- `PUT /api/books/{id}` - Update book (Admin only)
- `DELETE /api/books/{id}` - Delete book (Admin only)

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/all` - Get all orders (Admin only)
- `GET /api/orders/{id}` - Get order by ID
- `POST /api/orders` - Create order
- `PUT /api/orders/{id}/status` - Update order status (Admin only)

### Reviews
- `GET /api/reviews/book/{bookId}` - Get reviews for a book
- `POST /api/reviews` - Create review
- `PUT /api/reviews/{id}` - Update review
- `DELETE /api/reviews/{id}` - Delete review

### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/revenue` - Get revenue data

## Project Structure

```
cursor_bookstore/
├── bookstore-backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/bookstore/
│   │   │   │   ├── config/
│   │   │   │   ├── controller/
│   │   │   │   ├── dto/
│   │   │   │   ├── exception/
│   │   │   │   ├── model/
│   │   │   │   ├── repository/
│   │   │   │   ├── security/
│   │   │   │   └── service/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── Dockerfile
├── bookstore-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```

## Testing

### Backend Tests
```bash
cd bookstore-backend
mvn test
```

### API Testing
Use Swagger UI at `http://localhost:8080/swagger-ui.html` or import the API into Postman.

## Troubleshooting

### Backend won't start
- Check MySQL is running
- Verify database credentials in `application.properties`
- Check port 8080 is not in use

### Frontend won't connect to backend
- Verify `VITE_API_BASE_URL` in `.env` file
- Check CORS settings in backend
- Ensure backend is running

### Database connection errors
- Verify MySQL is running
- Check connection URL format
- Ensure database exists or `createDatabaseIfNotExist=true` is set

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.
#   b o o k s t o r e  
 