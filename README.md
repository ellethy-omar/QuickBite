# Quick Bite

> A full-stack food ordering app with chatting feature, done with React Native (Expo) frontend and Node.js/Express backend.

---

## Table of Contents

- [About](#about)  
- [Features](#features)  
  - [User](#user)  
  - [Restaurant](#restaurant)  
  - [Driver](#driver)  
  - [Admin](#admin)  
- [Tech Stack](#tech-stack)   
- [Environment Variables](#environment-variables)  
- [API Endpoints](#api-endpoints)  
- [Contributing](#contributing)  

---

## About

Quick Bite is a mobile-first food ordering application. Customers can search restaurants, place orders, and chat with drivers. Restaurants manage menus and track orders. Drivers pick up orders, deliver them, and keep a log of their deliveries. Admins oversee the entire system—managing users, restaurants, and drivers.

---

## Features

### User
- **Authentication**: Sign up & log in  
- **Profile**: Name, phone, email, address, optional profile picture  
- **Browse**: Search restaurants and view menu items  
- **Ordering**: Select products, place orders, view real-time status (Preparing → Delivering → Done)  
- **Chat**: In-app chat with assigned driver  
- **Order History**: View past orders as invoices  

### Restaurant
- **Onboarding**: Restaurant registration & login to business dashboard  
- **Profile Management**: Edit business info (name, picture, description, rating)  
- **Menu Management**: CRUD operations on menu items (price, image, name, description)  
- **Order Tracking**: View current & past orders with driver info  
- **Availability**: Mark restaurant busy/unavailable or cancel orders  

### Driver
- **Authentication**: Log in to driver account  
- **Profile**: Edit name, picture, contact info (changes require admin approval)  
- **Order Pool**: See all available orders to accept  
- **Chat**: Communicate with users for delivery details  
- **Delivery History**: View previously delivered orders  

### Admin
- **Dashboard Access**: Secure admin login  
- **User Management**: View, manage, and ban users  
- **Restaurant Oversight**: View, delete, or suspend restaurants  
- **Driver Management**: Approve profile changes, assign new drivers, manage requests  

---

## Tech Stack

- **Frontend**  
  - React Native with Expo  
  - React Navigation  
  - Redux or Context API  
  - Axios for HTTP requests  

- **Backend**  
  - Node.js & Express  
  - MongoDB (or your choice of database)  
  - Mongoose  
  - JWT for authentication  
  - Ws (for real-time chat & order status updates)  

---

## Environment Variables

`PORT                      # Speicying the port number`

`JWT_SECRET                # Defining the JWT secret`

`MONGO_URI                 # DB URL`

`CLOUDINARY_API_KEY        # Cloudinary key`

`CLOUDINARY_API_SECRET     # Cloudinary secret for authorization`

`OPENAI_API_KEY            # To call the GPT chatbot`

`HUGGINGFACE_API_KEY       # To call HuggingFace AI bot`

`EMAIL                     # Email that sends forgot password requests/ verify email`

`EMAIL_PASS                # pass for previous mail`

`GROQ_API_KEY              # To call the Gorq chatBot.`

---

## API Endpoints

can be viewed after running the server the typing in the url "Localhost:4123/swagger"
a swagger page will be served containing the apis docuemtnation of over 80 apis.


