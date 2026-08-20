# 🏡 StayNest

A modern full-stack property rental platform built with the MERN stack.

StayNest is a responsive property rental web application where users can discover and explore beautiful stays, search properties, view detailed property information, and interact with a modern Airbnb-inspired interface.

---

## 🚀 Features

### 🏠 Property Discovery
- Browse available properties
- Modern responsive property cards
- Property images
- Property ratings
- Location and pricing information
- Number of guests
- Property categories

### 🔎 Search & Filtering
- Search properties by keywords
- Filter by city
- Filter by category
- Filter by minimum price
- Filter by maximum price
- Filter by number of guests

### 🏡 Property Details
Users can view:
- Property title
- Description
- Location
- City
- Country
- Price per night
- Rating
- Number of reviews
- Property images
- Category
- Guests
- Bedrooms
- Beds
- Bathrooms
- Amenities

### 🔐 Authentication
- User registration
- User login
- JWT authentication
- Protected backend routes
- Password hashing with bcryptjs

### 👤 Host Features
- Authenticated users can create properties
- Properties are associated with their host
- Protected property creation API

### ❤️ Wishlist
- Wishlist interface
- Wishlist functionality planned for persistent backend integration

### 📱 Responsive Design
The application is designed for:
- Mobile
- Tablet
- Laptop
- Desktop

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Cookie Parser
- CORS
- dotenv

### Database
- MongoDB Atlas

### Tools
- VS Code
- Git
- GitHub
- Postman
- MongoDB Atlas

---

## 📂 Project Structure

```text
StayNest/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── PropertyCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Explore.jsx
│   │   │   ├── PropertyDetails.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── propertyController.js
│   │   └── ...
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Property.js
│   │   ├── User.js
│   │   └── ...
│   │
│   ├── routes/
│   │   ├── propertyRoutes.js
│   │   └── ...
│   │
│   ├── utils/
│   │   └── ...
│   │
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md

⚙️ Installation
1. Clone the repository
git clone https://github.com/YOUR_USERNAME/StayNest.git
2. Move into the project
cd StayNest
3. Install frontend dependencies
cd client
npm install
4. Install backend dependencies

Open another terminal:

cd server
npm install
🔐 Environment Variables

Create a .env file inside the server folder.

PORT=5000


MONGO_URI=your_mongodb_connection_string


JWT_SECRET=your_jwt_secret

IMPORTANT: Never upload your .env file to GitHub.

Use .env.example as a template.

Example:

PORT=5000


MONGO_URI=your_mongodb_connection_string


JWT_SECRET=your_jwt_secret
▶️ Running the Project
Start Backend

From the server folder:

npm run dev

Backend:

http://localhost:5000

Expected output:

Server running on port 5000
MongoDB Connected
Start Frontend

Open another terminal:

cd client
npm run dev

Vite will provide a local URL similar to:

http://localhost:5173

Open the URL in your browser.

🔌 API Endpoints
Get All Properties
GET /api/properties

Returns all available properties.

Get Single Property
GET /api/properties/:id

Example:

GET /api/properties/PROPERTY_ID

Returns detailed information about a specific property.

Create Property
POST /api/properties

This endpoint is protected and requires authentication.

🔎 Property Search & Filtering
Search by City
GET /api/properties?city=Goa
Search by Category
GET /api/properties?category=Villa
Filter by Price
GET /api/properties?minPrice=2000&maxPrice=5000
Filter by Guests
GET /api/properties?guests=4
Search by Keyword
GET /api/properties?search=mountain
Combine Filters
GET /api/properties?city=Goa&minPrice=2000&maxPrice=5000&guests=4
🗄️ Database

StayNest uses MongoDB Atlas as the cloud database.

Mongoose is used for:

Database connection
Schema definition
Data validation
CRUD operations
MongoDB queries
Document relationships
Main Collections
Users
Properties
🧩 Backend Architecture

StayNest follows a controller-based REST API architecture.

Client Request
      ↓
    Route
      ↓
 Middleware
      ↓
 Controller
      ↓
 Mongoose Model
      ↓
   MongoDB
      ↓
 JSON Response

Example:

GET /api/properties
        ↓
propertyRoutes.js
        ↓
getProperties()
        ↓
Property.find()
        ↓
MongoDB
        ↓
JSON Response
🔐 Authentication Flow

Authentication uses JWT-based authentication.

User
 ↓
Login / Register
 ↓
Backend
 ↓
Validate Credentials
 ↓
Generate JWT
 ↓
Authentication
 ↓
Protected API

Protected routes use authentication middleware to verify the logged-in user.

🧪 API Testing

Postman is used to test the backend REST APIs.

Example:
GET http://localhost:5000/api/properties

The API can be tested using:

GET requests
POST requests
Query parameters
Request body
Authentication
🎨 UI Design

StayNest uses a clean and modern property-rental inspired design.

Design Goals
Clean interface
Modern typography
Large property images
Rounded cards
Responsive layouts
Smooth hover effects
Mobile-friendly navigation
Simple user experience
Primary UI Color
#E07A5F

📸 Screenshots

Screenshots will be added after completing the major UI sections.

Home Page

Coming soon.

Explore Page

Coming soon.

Property Details

Coming soon.

Login / Register

Coming soon.

🚀 Roadmap
 Complete authentication UI
 Persistent wishlist
 Booking system
 Date availability
 Booking history
 Host dashboard
 User profile
 Property reviews
 Property image upload
 Cloud image storage
 Advanced search
 Map integration
 Payment integration
 Admin dashboard
 Property management dashboard
 Email notifications
 Deployment


📈 Learning Outcomes

This project demonstrates practical knowledge of:

React component architecture
React Router
REST API development
Axios API integration
Node.js
Express.js
MongoDB
Mongoose
JWT authentication
Middleware
CRUD operations
API testing
Tailwind CSS
Responsive web design
Git and GitHub
Full-stack application architecture

🎯 Project Goal

The goal of StayNest is to build a production-style MERN application rather than a simple CRUD project.

The application combines:

React
+
REST API
+
Authentication
+
MongoDB
+
Responsive UI
+
Real-world Features

👩‍💻 Author
Kritika
B.Tech Computer Science Engineering

Interested in:

Full Stack Development
MERN Stack
Data Structures & Algorithms
Software Development
⭐ Support

If you found this project useful, consider giving the repository a star ⭐

📄 License

This project is created for educational and portfolio purposes.



**Important:** before pushing, replace `YOUR_USERNAME` with your GitHub username, and make sure your real `.env` is in `.gitignore`.