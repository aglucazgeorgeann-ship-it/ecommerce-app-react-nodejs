# My eStore: Full-Stack E-commerce Application

You can view the deployed application here:
* **Frontend (React):** [https://ecommerce645.netlify.app/](https://ecommerce645.netlify.app/)
* **Backend (Node.js API):** [https://ecommerce-app-react-nodejs-1.onrender.com](https://ecommerce-app-react-nodejs-1.onrender.com)
<!-- Para sa overview ng iyong app, pwede kang maglagay ng isa o dalawang pangunahing screenshot dito -->
<!-- screenshot-1.jpg ay main products page -->
![My eStore: Products Page](https://raw.githubusercontent.com/aglucazgeorgeann-ship-it/ecommerce-app-react-nodejs/refs/heads/main/ecommerce-app-screenshot-1.jpg)

## 🖼️ Screenshots / Demo

<!-- Dito natin ilalagay ang lahat ng screenshots -->
![Products Page](https://raw.githubusercontent.com/aglucazgeorgeann-ship-it/ecommerce-app-react-nodejs/refs/heads/main/ecommerce-app-screenshot-1.jpg)
![Product Detail Page](https://github.com/aglucazgeorgeann-ship-it/ecommerce-app-react-nodejs/blob/main/Screenshot%202025-08-10%20150126.jpg?raw=true)
![Admin Panel](https://raw.githubusercontent.com/aglucazgeorgeann-ship-it/ecommerce-app-react-nodejs/refs/heads/main/Screenshot%202025-08-10%20150109.jpg)

---

# My eStore: Full-Stack E-commerce Application

<!-- Actual Screenshot ng iyong App -->
![My eStore: Products Page](https://raw.githubusercontent.com/aglucazgeorgeann-ship-it/ecommerce-app-react-nodejs/refs/heads/main/ecommerce-app-screenshot-1.jpg)

A comprehensive full-stack e-commerce application built to demonstrate modern web development practices. This project features a React.js frontend for an intuitive user experience and a Node.js/Express backend with SQLite for robust data management.

## ✨ Features

* **Product Listing:** Browse through a wide range of products on the main page.
* **Product Details:** View detailed information for each product on a dedicated page.
* **Shopping Cart:**
    * Add products to the cart from both product listings and detail pages.
    * Real-time cart item count displayed in the navigation bar.
    * View all items in the cart, including quantities and subtotals.
    * Remove individual items or clear the entire cart.
* **Checkout Process:**
    * A simple checkout form to collect customer shipping information.
    * Order summary display before placing the order.
    * (Simulated) Order placement and cart clearing upon successful checkout.
* **Admin Panel (Product Management):**
    * A dedicated interface for administrators to manage products.
    * **Create:** Add new products to the inventory with name, price, description, and image URL.
    * **Read:** View all existing products in a structured table.
    * **Update:** Edit existing product details (name, price, description, image URL).
    * **Delete:** Remove products from the inventory.
* **Responsive Design:** Optimized for various screen sizes using Tailwind CSS.
* **Data Persistence:** Product data is persisted in SQLite. Cart data is persisted in browser's Local Storage.

## 🚀 Technologies Used

**Frontend (React.js)**
* **React:** A JavaScript library for building user interfaces.
* **React Router DOM:** For declarative routing within the application.
* **Axios:** A promise-based HTTP client for making API requests.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development and responsive design.
* **React Context API:** For global state management (specifically for the shopping cart).

**Backend (Node.js & Express.js)**
* **Node.js:** JavaScript runtime environment.
* **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
* **SQLite3:** A lightweight, file-based relational database.
* **CORS:** Middleware to enable Cross-Origin Resource Sharing.
* **Nodemon:** A tool that helps develop Node.js based applications by automatically restarting the node application when file changes are detected.

**Development Tools**
* **Vite:** A fast build tool for frontend development.
* **Concurrently:** A tool to run multiple commands concurrently (used to run both frontend and backend servers with one command).
* **Git:** Version control system.
* **GitHub:** For source code hosting and collaboration.

## ⚙️ How to Run Locally

Follow these steps to set up and run the project on your local machine.

### Prerequisites

* Node.js (LTS version recommended)
* npm (Node Package Manager)

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/aglucazgeorgeann-ship-it/ecommerce-app-react-nodejs.git](https://github.com/aglucazgeorgeann-ship-it/ecommerce-app-react-nodejs.git)
    cd ecommerce-app-react-nodejs
    ```

2.  **Install Root Dependencies:**
    This will install `concurrently`.
    ```bash
    npm install
    ```

3.  **Install Backend Dependencies:**
    Navigate to the `backend` folder and install its dependencies.
    ```bash
    cd backend
    npm install
    cd .. # Go back to the root directory
    ```

4.  **Install Frontend Dependencies:**
    Navigate to the `frontend` folder and install its dependencies.
    ```bash
    cd frontend
    npm install
    cd .. # Go back to the root directory
    ```

### Running the Application

After installing all dependencies, you can start both the backend and frontend servers with a single command from the root directory.

1.  **Start Both Servers Concurrently:**
    From the root directory (`ecommerce-app-react-nodejs/`), run:
    ```bash
    npm run dev
    ```
    This command uses `concurrently` to start the backend (on `http://localhost:3001`) and the frontend (usually on `http://localhost:5173/`, `5174/`, etc., check your terminal for the exact port).

2.  **Access the Application:**
    Open your web browser and navigate to the frontend URL displayed in your terminal (e.g., `http://localhost:5174/`).

## 🚀 Live Application

You can view the deployed application here:
* **Frontend (React):** [https://ecommerce-app-react-nodejs-frontend.onrender.com](https://ecommerce-app-react-nodejs-frontend.onrender.com) <!-- Halimbawa lang ito, palitan mo ng ACTUAL Netlify URL mo -->
* **Backend (Node.js API):** [https://ecommerce-app-react-nodejs-1.onrender.com](https://ecommerce-app-react-nodejs-1.onrender.com)

## 🖼️ Screenshots / Demo

<!-- Dito natin ilalagay ang lahat ng screenshots -->
![Products Page](https://raw.githubusercontent.com/aglucazgeorgeann-ship-it/ecommerce-app-react-nodejs/refs/heads/main/ecommerce-app-screenshot-1.jpg)
![Product Detail Page](https://github.com/aglucazgeorgeann-ship-it/ecommerce-app-react-nodejs/blob/main/Screenshot%202025-08-10%20150126.jpg?raw=true)
![Admin Panel](https://raw.githubusercontent.com/aglucazgeorgeann-ship-it/ecommerce-app-react-nodejs/refs/heads/main/Screenshot%202025-08-10%20150109.jpg)

---



## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file (if you add one) for details.

