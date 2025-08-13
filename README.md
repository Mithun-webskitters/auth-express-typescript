# Express TypeScript Authentication System

A robust REST API authentication system built with Express.js and TypeScript, featuring JWT-based authentication with access and refresh tokens.

## Features

- 🔐 Secure user authentication
- 🎯 TypeScript for type safety
- 🔄 JWT access and refresh token system
- 📝 User registration and login
- 👤 User profile management
- 🛡️ Password hashing with bcrypt
- ✅ Input validation
- 🔒 Protected routes
- 🌐 CORS support
- 🛡️ Security headers with Helmet

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd auth-system-express-typescript
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Available Scripts

- Development server:

```bash
npm run dev
```

- Build the project:

```bash
npm run build
```

- Start production server:

```bash
npm start
```

- Clean build files:

```bash
npm run clean
```

## API Endpoints

### Auth Routes

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile (protected)

### Health Check

- `GET /health` - Check API status

## Authentication Flow

1. User registers or logs in
2. Server provides access token and refresh token
3. Access token is used for protected routes
4. Refresh token is used to obtain new access tokens
5. Tokens can be revoked on logout

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Input validation and sanitization
- Protected routes middleware
- HTTP security headers
- CORS configuration

## Project Structure

```
src/
├── app.ts              # Application entry point
├── config/             # Configuration files
├── controllers/        # Route controllers
├── middleware/         # Custom middleware
├── models/            # Database models
├── routes/            # Route definitions
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
