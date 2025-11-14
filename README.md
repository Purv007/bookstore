📚 BookStore - Full Stack Online Book Shopping Platform

A complete eCommerce-style BookStore web app where users can browse books, manage cart, checkout, place orders, write reviews, and admins can manage books, orders, and revenue analytics.

Built with React + Vite, TailwindCSS, Spring Boot, MySQL, and deployed using Vercel + Render + Clever Cloud.

🚀 Key Features
👤 User Features

Browse books with search and genre filters

View book details, stock, and reviews

Add to cart / update / remove items

Checkout + place orders

View own order history

Add reviews and ratings

Secure JWT-based authentication

🧑‍💼 Admin Features

Add, edit, delete books

Manage book stock

View all user orders

Update order statuses (Pending → Delivered)

Dashboard analytics

Revenue charts (Recharts)

🏗️ System Architecture
+---------------------+       +------------------------+        +----------------------------+
|     React Frontend  | ----> |  Spring Boot Backend   | -----> |  MySQL (Clever Cloud)      |
| (Vercel Deployment) |       | (Render Deployment)     |       |  Database Storage          |
+---------------------+       +------------------------+        +----------------------------+
         |                                |                               |
         |                                v                               v
         |                         Authentication (JWT)            Book & Order Data
         |                                
         v
   Beautiful UI + Cart + Reviews

🧩 Tech Stack
Layer	Technology
Frontend	React, Vite, TailwindCSS, Axios, Lucide Icons, Framer Motion
Backend	Spring Boot, Spring Security, JWT Auth, JPA, Hibernate
Database	MySQL (Clever Cloud)
Deployment	Vercel (Frontend) + Render (Backend)
Charts	Recharts for Admin Revenue Chart
Formatting & Components	Custom UI components
🔧 Environment Variables Setup
🟦 Frontend (.env)
VITE_API_BASE_URL=https://your-backend.onrender.com

🟩 Backend (Render Environment Variables)
KEY	VALUE
SPRING_DATASOURCE_URL	jdbc:mysql://…
SPRING_DATASOURCE_USERNAME	DB username
SPRING_DATASOURCE_PASSWORD	DB password
JWT_SECRET	Your secret key
CORS_ORIGINS	https://your-frontend.vercel.app

SPRING_JPA_HIBERNATE_DDL_AUTO	update

Example:

CORS_ORIGINS=https://bookstore-gules-ten.vercel.app
SPRING_DATASOURCE_URL=jdbc:mysql://bmcxpdncr2dtrqj5kzcf-mysql.services.clever-cloud.com:3306/bmcxpdncr2dtrqj5kzcf
SPRING_DATASOURCE_USERNAME=uwgdgcpgwp4uvklj
SPRING_DATASOURCE_PASSWORD=S05nvg9goTDFwZ2O9vVf
JWT_SECRET=your-secret
SPRING_JPA_HIBERNATE_DDL_AUTO=update

🧱 Project Structure
bookstore/
│
├── bookstore-backend/
│   ├── src/main/java/com/bookstore/...
│   ├── src/main/resources/application.properties
│   ├── pom.xml
│   └── Dockerfile (optional)
│
└── bookstore-frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── context/
    │   ├── App.jsx
    │   └── main.jsx
    ├── public/
    ├── package.json
    └── vite.config.js

💻 Local Setup
1️⃣ Clone Repo
git clone https://github.com/<your-username>/bookstore.git
cd bookstore

2️⃣ Backend Setup
Install dependencies:
cd bookstore-backend
mvn clean install

Run backend:
mvn spring-boot:run

API available at:

http://localhost:8080


Swagger:

http://localhost:8080/swagger-ui.html

3️⃣ Frontend Setup
Install packages
cd bookstore-frontend
npm install

Start development server
npm run dev


App runs at:

http://localhost:5173

🌍 Deployment Guide
🚀 Backend Deployment (Render)

Push backend code to GitHub

Create a Render Web Service

Add environment variables

Build command:

mvn clean install


Start command:

java -jar target/*.jar


Deploy

🎨 Frontend Deployment (Vercel)

Push frontend to GitHub

Import project in Vercel

Add:

VITE_API_BASE_URL=https://your-backend.onrender.com


Deploy

🛢 Database Setup (Clever Cloud)

Create MySQL instance

Copy host, username, password into Render

No manual configuration needed

🔐 Admin Login in Swagger
Step 1 — Login
POST /api/login
{
  "username": "admin",
  "password": "admin"
}

Step 2 — Copy the token
Step 3 — Click Authorize

Paste:

Bearer <token>

🖼️ Screenshots (Add to repo)
🏠 Home Page

(Insert image)

📘 Book Details Page

(Insert image)

🧺 Cart UI

(Insert image)

💳 Checkout

(Insert image)

🧑‍💼 Admin Dashboard

(Insert image)

📊 Sample API Responses
Get Books
[
  {
    "id": 1,
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "price": 19.99,
    "stock": 10
  }
]

Order Response
{
  "id": 1,
  "totalPrice": 47.98,
  "paymentStatus": "PAID"
}

🧠 Future Enhancements

Add wishlist

Payment gateway integration

Email notifications

Admin charts with more metrics

User profile editing

👨‍💻 Author

Purv Patel
📧 patelpurv908@gmail.com

🔗 GitHub: https://github.com/Purv007

🔗 LinkedIn: https://linkedin.com/in/purv-patel-b31a84280

📜 License

Licensed under the MIT License.