# Pet Adoption Platform - Backend

This is the backend server for the Pet Adoption platform built with Node.js, Express, and MongoDB.

## Features

- User authentication (register/login)
- Pet management (CRUD operations)
- Adoption request system
- Review system
- Role-based access control (admin/user)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup

1. Clone the repository
2. Navigate to the server directory:
   ```bash
   cd server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/pet-adoption
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

## API Documentation

### Authentication

#### Register User
- **POST** `/api/users/register`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890",
    "address": "123 Main St"
  }
  ```

#### Login User
- **POST** `/api/users/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Pets

#### Get All Pets
- **GET** `/api/pets`
- **Headers**: `Authorization: Bearer <token>`

#### Get Single Pet
- **GET** `/api/pets/:id`
- **Headers**: `Authorization: Bearer <token>`

#### Create Pet (Admin only)
- **POST** `/api/pets`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "name": "Max",
    "age": 2,
    "breed": "Golden Retriever",
    "type": "Dog",
    "description": "Friendly and energetic",
    "imageUrl": "https://example.com/image.jpg",
    "gender": "Male",
    "vaccinated": true
  }
  ```

### Adoption Requests

#### Create Adoption Request
- **POST** `/api/adoptions/:petId`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "notes": "I would love to adopt this pet"
  }
  ```

#### Get Adoption Requests
- **GET** `/api/adoptions`
- **Headers**: `Authorization: Bearer <token>`

#### Update Adoption Request Status (Admin only)
- **PUT** `/api/adoptions/:id/status`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "status": "approved",
    "adminNotes": "Approved after home visit"
  }
  ```

### Reviews

#### Create Review
- **POST** `/api/reviews/:petId`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "rating": 5,
    "comment": "Great experience adopting this pet"
  }
  ```

#### Get Pet Reviews
- **GET** `/api/reviews/pet/:petId`
- **Headers**: `Authorization: Bearer <token>`

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Security

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Role-based access control for admin operations
- Input validation and sanitization
- CORS enabled
- Environment variables for sensitive data

## Development

To run the server in development mode with auto-reload:
```bash
npm run dev
```

## Production

To run the server in production mode:
```bash
npm start
``` 