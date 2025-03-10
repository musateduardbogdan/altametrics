# Altametrics Documentation

## Overview

This monorepo contains the frontend and backend for the application. The app is built using:

- **Frontend:** React (Vite) with React Query, Redux Toolkit, and React Router.
- **Backend:** NestJS with Prisma and PostgreSQL.
- **Authentication:** JWT-based authentication with cookies.
- **State Management:** Redux Toolkit for global state.
- **Data Fetching:** React Query for API calls.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **npm**

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/musateduardbogdan/altametrics.git
   cd altametrics
   ```

### Backend

2. Set up environment variables:
   - Copy `.env.example` to `.env` in the `server` directory.
   - Update the following variables in `.env`:
     - `DATABASE_URL=`
     - `DIRECT_URL=`
     - `JWT_SECRET=`
     - `ALLOWED_ORIGINS=`
3. Navigate to the `server` directory::
   ```sh
   cd server
   ```
4. Install dependencies:
   ```sh
   npm install
   ```
5. Run the Prisma seed script:
   ```sh
    npx prisma db seed
   ```
6. Start the backend server:
   ```sh
   npm run start:dev
   ```

### Frontend

7. Set up environment variables:
   - Copy `.env.example` to `.env` in the `client` directory.
   - Update the following variables in `.env`:
     - `VITE_API_URL=`
8. Navigate to the `client` directory:
   ```sh
   cd client
   ```
9. Install dependencies:
   ```sh
   npm install
   ```
10. Start the frontend server:
    ```sh
    npm run dev
    ```
11. Open the app in your browser at `http://localhost:5173`.

## API Endpoints

- **Auth:** `/auth/sign-in`, `/auth/sign-up`, `/auth/sign-out`
- **Invoices:** `/invoices`, `/invoices/:id`
- **Users:** `/users/profile`

### License

MIT License
