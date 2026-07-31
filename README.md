# Product Management Application

A Full Stack Product Management Application developed using **React.js**, **Node.js**, **Express.js**, and **MongoDB**.

This application allows users to manage product categories, sub-categories, products with multiple variants, wishlist, search, filtering, and pagination.

---

# Features

## Authentication
- User Signup
- User Login

## Category Management
- Add Category
- Display Categories

## Sub Category Management
- Add Sub Category
- Display Sub Categories
- Filter Products by Sub Category

## Product Management
- Add Product
- Edit Product
- Display Products
- Product Image Upload
- Multiple Product Variants

Each product supports multiple variants with:
- RAM
- Price
- Quantity

## Wishlist
- Add Product to Wishlist
- Remove Product from Wishlist
- View Wishlist

## Search
- Search Products by Product Name

## Pagination
- Product Listing Pagination

---

# Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- CSS

## Backend

- Node.js
- Express.js
- JWT Authentication

## Database

- MongoDB
- Mongoose

---

# Project Structure

```
Product_Management/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/fathimathhafseenaa/product_management
```

Move into the project folder.

```bash
cd product_management
```

---

# Backend Setup

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start Backend Server

```bash
npm start
```

Backend will run on

```
http://localhost:5000
```

---

# Frontend Setup

Open another terminal.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run Frontend

```bash
npm run dev
```

Frontend will run on

```
http://localhost:5173
```

---

# Functionalities

✔ User Signup

✔ User Login

✔ Add Category

✔ Add Sub Category

✔ Add Product

✔ Edit Product

✔ Multiple Product Variants

✔ Wishlist

✔ Search Products

✔ Filter by Sub Category

✔ Pagination

✔ Responsive User Interface

---

# API Modules

- Authentication
- Categories
- Sub Categories
- Products
- Wishlist

---

# Environment Variables

Backend `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# Future Improvements

- Delete Product
- Delete Category
- Product Sorting
- User Profile
- Product Reviews
- Order Management

---

# Author

**Fathimath Hafseena**

---

# Notes

- This project follows the MVC Architecture.
- Backend is developed using Express.js.
- MongoDB is used as the database.
- Product images are stored inside the uploads folder.
- Multiple product variants are supported.
