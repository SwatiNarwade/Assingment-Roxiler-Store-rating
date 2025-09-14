📌 Tech Stack

Backend: ExpressJs / Loopback / NestJs
Database: PostgreSQL / MySQL
Frontend: ReactJs


📌 Requirements

Web app for store ratings (1–5).
Single login system with role-based access.
Roles: System Administrator, Normal User, Store Owner.


📌 Functionalities by Role
🔹 System Administrator
   Add new stores, normal users, and admin users.
    Dashboard showing:
             Total users
             Total stores
             Total ratings submitted
   Can view and filter:
          Stores (Name, Email, Address, Rating) 
          Users (Name, Email, Address, Role, Rating if Store Owner)
  Add new users with (Name, Email, Password, Address).
  Logout.
  
🔹 Normal User
     Signup + Login.
     Signup fields: Name, Email, Address, Password.
     Update password.
     View list of stores.
     Search stores (by Name & Address).

Store listing shows:
     Store Name
     Address
     Overall Rating
     User’s submitted rating
     Option to submit / update rating

Submit ratings (1–5).
Logout.


🔹 Store Owner
    Login.
    Update password.
    Dashboard:
         List of users who rated their store
         Average rating of store
    Logout.


📌 Form Validations
Name: 20–60 chars
Address: Max 400 chars
Password: 8–16 chars, ≥1 uppercase + ≥1 special char
Email: Standard email validation
