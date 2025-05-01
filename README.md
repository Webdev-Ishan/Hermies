Hermies - Backend Projects
Welcome to the Hermies repository! This repository contains the backend implementations for various projects, including a pet adoption platform, real-time chat application, and other related services. Below is an overview of the projects and their features.

1. Hermies - Pet Adoption Platform
   Description
   Hermies is a backend service for a pet adoption platform that helps users find their perfect pet companion. It includes features like user authentication, pet posting, AI-powered recommendations, and adoption management.

Features
User Authentication:

Register, login, and logout functionality.
Secure password hashing using bcrypt.
JWT-based authentication for secure API access.
Pet Posting:

Users can create, update, and delete posts for pets available for adoption.
Cloudinary integration for uploading and managing pet images.
AI-Powered Recommendations:

Integrated with Google Gemini AI to provide personalized pet recommendations based on user preferences.
AI assists users in making informed and compassionate adoption decisions.
Adoption Management:

Tracks adoption applications and statuses (e.g., Available, Adopted, Pending).
Tech Stack
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT
AI Integration: Google Gemini AI
Image Management: Cloudinary
Email Notifications: Nodemailer

2. AI-Powered Assistance
   Description
   An AI-powered backend service integrated with Google Gemini AI to provide intelligent responses and recommendations. This service is used in the pet adoption platform to assist users in making better adoption decisions.

Features
AI Recommendations:

Personalized pet recommendations based on user preferences.
Behavioral insights and care tips for pets.
Adoption Guidance:

Answers user queries about the adoption process.
Provides compatibility analysis between users and pets.
Emotional Support:

Offers empathetic responses to users during the adoption process.
Tech Stack
AI Integration: Google Gemini AI
Backend: Node.js, Express.js 3. Email Notification Service
Description
A backend service for sending email notifications to users. This service is used in the pet adoption platform to notify users about account registration, adoption updates, and other events.

Features
SMTP Integration:

Configured with Nodemailer for sending emails.
Uses Brevo (formerly Sendinblue) as the SMTP provider.
Email Templates:

Predefined templates for account registration and adoption updates.
Tech Stack
Backend: Node.js, Express.js
Email Service: Nodemailer, Brevo SMTP
Project Structure
Getting Started
Prerequisites
Node.js (v16 or higher)
MongoDB (local or cloud instance)
Cloudinary account for image management
Google Cloud account for Gemini AI integration
Brevo (Sendinblue) account for email notifications
Installation
Clone the repository:

Install dependencies:

Set up the .env file:
npm startnpm installgit clone https://github.com/your-username/hermies.git
cd hermies/BackendBackend/
├── .env # Environment variables
├── .gitignore # Git ignore file
├── app.js # Main application entry point
├── Config/ # Configuration files
│ ├── cloudinary.js # Cloudinary configuration
│ ├── mongoDb.js # MongoDB connection
│ └── nodemailer.config.js # Nodemailer configuration
├── Controller/ # API controllers
│ ├── ai.controller.js # AI-related endpoints
│ ├── auth.controller.js # Authentication endpoints
│ └── user.controller.js # User-related endpoints
├── Middleware/ # Middleware functions
│ ├── auth.midlleware.js # Authentication middleware
│ ├── multer.js # File upload middleware
│ └── user.middleware.js # User-related middleware
├── Models/ # Database models
│ ├── post.model.js # Post schema
│ └── user.Model.js # User schema
├── Routes/ # API routes
│ ├── ai.routes.js # AI-related routes
│ ├── auth.Routes.js # Authentication routes
│ └── user.Routes.js # User-related routes
├── Services/ # Service files
│ └── ai.service.js # AI service integration
├── package.json # Project dependencies
└── README.md # Project documentation
DB_PASSWORD="your_mongodb_password"
DB_USERNAME="your_mongodb_username"
MONGODB_URL="your_mongodb_connection_string"
JWT_SECRET="your_jwt_secret"
SMTP_USER="your_smtp_user"
SMTP_PASSWORD="your_smtp_password"
SENDER_EMAIL="your_sender_email"
CLOUDINARY_SECRET="your_cloudinary_secret"
CLOUDINARY_KEY="your_cloudinary_key"
CLOUDINARY_NAME="your_cloudinary_name"
GEMINI_KEY="your_google_genai_api_key"

Start the server:

API Endpoints
Authentication
POST /api/auth/register: Register a new user.
POST /api/auth/login: Login a user.
GET /api/auth/profile: Get user profile.
POST /api/auth/logout: Logout a user.
User
POST /api/user/createPost: Create a new pet post.
POST /api/user/deletePost: Delete a pet post.
AI
POST /api/ai/response: Get AI-powered recommendations.
Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

License
This project is licensed under the MIT License.
