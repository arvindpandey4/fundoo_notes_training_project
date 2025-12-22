# FundooNotes Application

This is the backend implementation for the FundooNotes application.

## Status
✅ **REVIEW DONE**

## Features Implemented
The following functionalities have been implemented and reviewed:

### User Management
- **Register User**: Create a new user account.
- **Login User**: Authenticate user and generate JWT token.
- **Get Profile**: Retrieve logged-in user's details (Protected Route).
- **Update Profile**: Modify user information (Protected Route).
- **Delete User**: Remove user account (Protected Route).

## Technologies
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for Authentication

## Setup
1. Install dependencies: `npm install`
2. Set up `.env` file with `MONGO_URI` and `JWT_SECRET`.
3. Run the server: `npm start`
