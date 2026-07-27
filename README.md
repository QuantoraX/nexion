# Nexion Solutions — Modern Digital Agency & Full-Stack Platform

Nexion Solutions is a premium, remote-first software development and digital product engineering agency based in Colombo, Sri Lanka. This repository houses the full-stack codebase for our official company website and administrative management platform, engineered for lightning-fast loading speeds, responsiveness, dynamic backend API services, and premium modern aesthetics.

---

## ✨ Key Features & Experience

- **Visual Continuity & Premium Dark Theme:** Incorporates high-resolution background overlays, dark-themed canvas backgrounds, and consistent typography using variable-weight Google Fonts.
- **Dynamic Case Studies & Portfolio:** Categorized project filters (SaaS, Mobile App, E-Commerce, AI / ML) mapped to full-length detailed case studies highlighting client challenges, technical specifications, and key features delivered.
- **Nexion Insights Blog & CMS:** A clean, modern typography-based article system with dynamic backend REST API integration for managing and serving blog posts.
- **Budget-Interactive Contact Form & Inquiry System:** A conversion-optimized layout featuring custom project budget range selection, requirements checkboxes, and backend mailer notification integration.
- **AI-Powered Live Chatbot:** Integrated OpenRouter AI assistant providing real-time agency inquiry responses.
- **Admin Control Panel:** Secured JWT authentication portal for managing blog articles, portfolio showcases, testimonials, and client inquiries.
- **Cloud Media Storage & Management:** Automated Cloudinary integration with local fallback support for asset uploads.
- **Vercel Serverless Architecture:** Optimized for serverless edge deployment on Vercel with database connection pooling and zero-downtime scalability.

---

## 🛠️ Technology Stack

### Frontend (`client/`)
- **Core Framework:** React 18 & Vite (TypeScript)
- **Styling Engine:** Tailwind CSS v4
- **Animation Suite:** Framer Motion (v11)
- **Scroll Engineering:** Lenis (Smooth scroll wrapper)
- **Routing Engine:** React Router DOM (v6)
- **Icon Assets:** Lucide React

### Backend (`server/`)
- **Runtime & Framework:** Node.js & Express.js
- **Database & ODM:** MongoDB Atlas & Mongoose
- **Authentication:** JWT (JSON Web Tokens) & BcryptJS
- **Media Engine:** Cloudinary API & Multer
- **Email Dispatcher:** Nodemailer
- **AI Integration:** OpenRouter API
- **Serverless Engine:** `@vercel/node`

---

## 📂 Codebase Directory Layout

```text
nexion/
├── client/                  # Frontend Vite + React SPA Application
│   ├── public/              # Static assets (Favicons, background patterns)
│   ├── src/
│   │   ├── assets/          # Compressed brand icons and illustration assets
│   │   ├── components/      # Shared layout UI (Navbar, Footer, Smooth Scroll)
│   │   ├── data/            # Localized static data schemas & fallback contents
│   │   ├── pages/           # Page views (Home, About, Services, Portfolio, Blog, Contact, Admin)
│   │   ├── sections/        # Modular page layout sections
│   │   ├── App.tsx          # Main React router routes registration
│   │   └── main.tsx         # Application entry point
│   ├── vercel.json          # SPA rewrite rules for frontend routing
│   └── package.json         # Frontend dependencies configuration
│
├── server/                  # Backend Express REST API Server
│   ├── config/              # Database (db.js) & Cloudinary (cloudinary.js) configs
│   ├── controllers/         # API Route Handlers (Auth, Blogs, Portfolio, Inquiries, Chat, etc.)
│   ├── middleware/          # JWT Verification & File Upload Middlewares
│   ├── models/              # Mongoose Data Schemas (User, Blog, Portfolio, Inquiry, etc.)
│   ├── routes/              # Express API Routes (/api/auth, /api/blogs, /api/portfolio, etc.)
│   ├── seeders/             # Database seeding scripts
│   ├── api/index.js         # Vercel serverless function entrypoint
│   ├── vercel.json          # Vercel serverless build & rewrite rules
│   ├── server.js            # Main Express server app configuration
│   └── package.json         # Backend dependencies configuration
│
└── README.md                # Project documentation
```

---

## 🚀 Local Development Setup

To run both the Frontend and Backend locally, follow these steps:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org) (v18+) and [MongoDB](https://www.mongodb.com) (or MongoDB Atlas URI) ready.

### 1. Backend Setup (`server`)

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Setup environment variables (.env file inside server/)
# Create a .env file with:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret

# Start backend dev server with Nodemailer/Nodemon
npm run dev
```
The API server will run on [http://localhost:5000](http://localhost:5000).

### 2. Frontend Setup (`client`)

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Run Vite dev server
npm run dev
```
The web application will open on [http://localhost:5173](http://localhost:5173).

---

## 🌐 Production Deployment on Vercel

This repository is optimized for dual Vercel deployment (separate Frontend & Backend projects).

### 1. Backend Server Deployment (`server`)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New" ➔ "Project"**.
2. Select your GitHub repository.
3. Set **Root Directory** to `server`.
4. Configure **Environment Variables** in Vercel settings:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `OPENROUTER_API_KEY`
   - `EMAIL_USER` & `EMAIL_PASS`
   - `ADMIN_EMAIL` & `ADMIN_PASSWORD`
5. Deploy! Vercel automatically uses `server/vercel.json` (`@vercel/node`) to serve all API routes at `https://your-backend.vercel.app/api/...`.

### 2. Frontend Client Deployment (`client`)

1. In Vercel, create a new project importing the same GitHub repository.
2. Set **Root Directory** to `client`.
3. Add Environment Variable:
   - `VITE_API_URL=https://your-backend.vercel.app/api`
4. Deploy! `client/vercel.json` handles SPA routing to prevent 404s on page reloads.
