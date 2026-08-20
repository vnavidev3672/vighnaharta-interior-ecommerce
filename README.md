# Vighnaharta Interior E-Commerce

A full-stack, responsive e-commerce web application tailored for interior design retail, built using the MERN stack (MongoDB, Express.js, React.js, Node.js). 

##  Live Demo
Experience the live application here: [Vighnaharta Interior E-Commerce](https://vighnaharta-interior-ecommerce.onrender.com)

---

##  Key Features

* **User Authentication & Authorization:** Secure user registration and login powered by JSON Web Tokens (JWT) and bcrypt password hashing.
* **Product Catalog:** Dynamic browsing, filtering, and searching of interior design and furniture products.
* **State Management:** Predictable global state management using Redux Toolkit to handle carts, user data, and UI states seamlessly.
* **Shopping Cart System:** Real-time cart manipulation, item persistent storage, and smooth checkout preparation.
* **Responsive UI/UX:** Fully adaptive interface optimized for mobile, tablet, and desktop viewports.
* **Secure Backend API:** RESTful API architecture implementing strict MVC patterns and middleware validation.

---

##  Tech Stack

* **Frontend:** React.js, Redux Toolkit, React Router, Axios, CSS3 / Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose ODM
* **Authentication:** JSON Web Tokens (JWT)
* **Deployment:** Render

---

##  Project Structure

```text
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # API request handlers (Business Logic)
│   ├── middleware/      # Auth and error handling middlewares
│   ├── models/          # Mongoose schemas (User, Product, Order)
│   ├── routes/          # Express API route definitions
│   └── server.js        # Entry point for backend
│
└── frontend/
    ├── public/          # Static assets
    └── src/
        ├── components/  # Reusable UI elements (Navbar, Footer, ProductCard)
        ├── pages/       # Page components (Home, Cart, Login, ProductDetails)
        ├── store/       # Redux slices and store configuration
        └── App.js       # Main application routing and core logic
```

---

##  Installation & Local Setup

Follow these steps to run the project locally on your machine:

### Prerequisites
* Ensure you have [Node.js](https://nodejs.org/) installed.
* Ensure you have a running [MongoDB](https://www.mongodb.com/) database instance (Local or MongoDB Atlas).

### 1. Clone the Repository
```bash
git clone https://github.com/vnavidev3672/vighnaharta-interior-ecommerce.git
cd vighnaharta-interior-ecommerce
```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, configure environment variables, and start the server.
```bash
cd backend
npm install
```
Create a `.env` file in the root of your `backend/` folder and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
Start the development backend server:
```bash
npm run dev
# or
node server.js
```

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, install dependencies, and run the client application.
```bash
cd ../frontend
npm install
npm start
```
Your local application should now be active at `http://localhost:3000`.

---

##  Environment Variables
Your project relies on security configurations. Make sure to keep your keys safe and never commit your `.env` file to public repositories (include it in your `.gitignore`).

---

## 🛡️ License
This project is licensed under the MIT License.
