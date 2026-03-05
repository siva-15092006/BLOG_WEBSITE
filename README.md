# Blog Website

A full-stack blog application built with React, Redux, Express, and MongoDB.

## Features

- **User Authentication** - Sign up, sign in, JWT-based authentication
- **Blog Posts** - Create, read, update, and delete blog posts
- **User Profiles** - View and manage user profiles
- **Email Verification** - Account verification via email
- **Password Recovery** - Forgot password functionality
- **Form Validation** - Robust client-side form validation

## Tech Stack

### Frontend
- React 16
- Redux (state management)
- React Router (navigation)
- Redux Form (form handling)
- Axios (HTTP client)
- Webpack 5 (bundling)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens) for authentication
- Postmark/SendGrid for transactional emails

## Project Structure

```
├── bin/                  # Server entry point
├── public/               # Static files and React app
│   ├── src/
│   │   ├── actions/      # Redux actions
│   │   ├── components/   # React components
│   │   ├── containers/   # Connected components
│   │   ├── pages/        # Page components
│   │   ├── reducers/     # Redux reducers
│   │   └── store/        # Redux store configuration
│   └── style/            # CSS styles
├── routes/               # Express API routes
├── utils/                # Utility functions
└── views/                # Server-side views
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [Postmark](https://postmarkapp.com/) account (for email functionality)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/siva-15092006/BLOG_WEBSITE.git
   cd BLOG_WEBSITE
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Windows (PowerShell)
   $env:JWT_SECRET="your-secret-key"
   $env:POSTMARK_API_TOKEN="your-postmark-token"
   $env:FROM_EMAIL="your-verified-email@example.com"
   $env:NODE_ENV="development"

   # Linux/macOS
   export JWT_SECRET=your-secret-key
   export POSTMARK_API_TOKEN=your-postmark-token
   export FROM_EMAIL=your-verified-email@example.com
   export NODE_ENV=development
   ```

## Running the Application

### Development Mode

You need **two terminal windows**:

**Terminal 1 - Start the Express server:**
```bash
npm start
```

**Terminal 2 - Start webpack dev server:**
```bash
npm run dev
```

Open your browser at `http://localhost:8080`

> **Note:** `localhost:3000` serves the production build. During development, always use `localhost:8080`.

### Production Mode

1. Build the React app:
   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Open your browser at `http://localhost:3000`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the Express server |
| `npm run dev` | Start webpack dev server with hot reload |
| `npm run build` | Build production bundle |

## API Routes

- `POST /api/users/signup` - Register new user
- `POST /api/users/signin` - User login
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get single post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

## License

This project is private.

## Author

Siva Kumar Raju




