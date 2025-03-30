## URL Shortener

A simple URL shortener built with **Node.js, Express, PostgreSQL, and React**.

## Features
- Shorten long URLs into unique short links.
- Store and retrieve URLs using PostgreSQL.
- Redirect short URLs to their original long URLs.
- Simple frontend to create and display shortened links.

## Tech Stack
- **Backend:** Node.js, Express.js, PostgreSQL
- **Frontend:** React.js
- **Database:** PostgreSQL

## Setup Guide

### Prerequisites
- Node.js installed
- PostgreSQL installed and running

### Database Setup
1. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE urlShortener;
   ```
2. Update database credentials in `index.js` (backend file):
   ```js
   const pool = new Pool({
     user: "your_username",
     host: "localhost",
     database: "urlShortener",
     password: "your_password",
     port: 5432,
   });
   ```
3. The table will be automatically created when the server starts.

### Backend Setup
1. Install dependencies:
   ```bash
   npm install express pg shortid cors
   ```
2. Start the server:
   ```bash
   node index.js
   ```

### Frontend Setup
1. Install dependencies:
   ```bash
   npm install axios
   ```
2. Add `LinkShortener` component in your React app.

### API Endpoints
#### 1. Shorten URL
- **Endpoint:** `POST /shorten`
- **Request Body:**
  ```json
  {
    "longUrl": "https://example.com"
  }
  ```
- **Response:**
  ```json
  {
    "shortUrl": "abc123"
  }
  ```

#### 2. Redirect to Original URL
- **Endpoint:** `GET /:shortUrl`
- **Example:** `GET /abc123` → Redirects to `https://example.com`

## Running the Application
1. Start PostgreSQL and ensure the database is running.
2. Start the backend server.
3. Run the frontend React app.
4. Open the frontend in a browser and test URL shortening.

## License
This project is open-source and available under the MIT License.

---
Developed by Naveen Kumar 🚀


