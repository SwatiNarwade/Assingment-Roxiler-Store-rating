# Roxiler-Systems-Assignment-StoreRating

A full-stack web application for store ratings built for the FullStack Intern Coding Challenge.

---

## 🧩 Tech Stack

### 🔹 Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication
- CryptoJS (Password hashing)

### 🔹 Frontend
- React.js
- Tailwind CSS
- Recharts
- React Icons
- React Toastify

---

## 🔐 Features by User Role

### 🛠️ System Administrator
- Add stores and users (normal/admin)
- View dashboard: total users, stores, and ratings
- View and filter lists of users and stores
- View user and store details

### 👤 Normal User
- Register and login
- View list of stores
- Submit and edit ratings (1–5 stars)
- Search stores by name or address

### 🏪 Store Owner
- Login to dashboard
- View average rating of their store
- See which users rated their store

---

## ✅ Form Validations
- **Name:** 20–60 characters
- **Address:** Max 400 characters
- **Password:** 8–16 chars, at least 1 uppercase and 1 special character
- **Email:** Valid email format

---

## 📌 How to Run the Project

### 1. Clone the repository
```bash
git clone https://github.com/your-username/Roxiler-Systems-Assignment-StoreRating.git


2. Setup Backend
bash
Copy
Edit
cd backend
npm install
npm start


3. Setup Frontend
bash
Copy
Edit
cd ../frontend
npm install
npm start


Folder Structure
pgsql
Copy
Edit
Assignment_Roxiler
├── backend/
├── frontend/
├── database/