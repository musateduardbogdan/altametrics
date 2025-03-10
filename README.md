# Altametrics Documentation

## Overview

This monorepo contains the frontend and backend for the application. The app is built using:

- **Frontend:** React (Vite) with React Query, Redux Toolkit, and React Router.
- **Backend:** NestJS with Prisma and PostgreSQL.
- **Authentication:** JWT-based authentication with cookies.
- **State Management:** Redux Toolkit for global state.
- **Data Fetching:** React Query for API calls.


## Prerequisites

Ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **npm**

## Setup

### Backend

1. Set up environment variables:
   - Copy `.env.example` to `.env` in the `server` directory.
   - Update the following variables in `.env`:
     - `DATABASE_URL=`
     - `DIRECT_URL=`
     - `JWT_SECRET=`
     - `ALLOWED_ORIGINS=`
2. Navigate to the `server` directory::
   ```sh
   cd server
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Run the Prisma seed script:
   ```sh
    npx prisma db seed
   ```
5. Start the backend server:
   ```sh
   npm run start:dev
   ```

### Frontend

6. Set up environment variables:
   - Copy `.env.example` to `.env` in the `client` directory.
   - Update the following variables in `.env`:
     - `VITE_API_URL=`
7. Navigate to the `client` directory:
   ```sh
   cd client
   ```
8. Install dependencies:
   ```sh
   npm install
   ```
9. Start the frontend server:
    ```sh
    npm run dev
    ```
10. Open the app in your browser at `http://localhost:5173`.

## API Endpoints

- **Auth:** `/auth/sign-in`, `/auth/sign-up`, `/auth/sign-out`
- **Invoices:** `/invoices`, `/invoices/:id`
- **Users:** `/users/profile`

### License

MIT License
