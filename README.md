# 🍔 Lucky Burger — Frontend

**Lucky Burger Frontend** is a **simplified demo** of a full-scale food ordering web application.  
It replicates core features from previous production work, adapted and reduced for portfolio purposes.

## 🚀 Features

- **React + TypeScript** SPA  
- **React Router v6** for client-side routing  
- **Context API** for authentication and order management  
- **Protected Routes** for admin dashboard access  
- **Responsive UI** with Tailwind CSS  
- Menu filtering by category  
- Cart management with item quantity updates  
- Integration with the Lucky Burger Backend API

## 📦 Tech Stack

- **Frontend:** React, TypeScript, React Router v6, Axios  
- **State Management:** React Context API  
- **Styling:** Tailwind CSS  
- **Build Tooling:** Vite (or CRA, depending on the build)  

## 📂 Pages & Routes

| Path                   | Access   | Description |
|------------------------|----------|-------------|
| `/`                    | Public   | Home page |
| `/menu`                | Public   | Menu listing with category filters |
| `/cart`                | Public   | Shopping cart |
| `/order`               | Public   | Order confirmation |
| `/login`               | Public   | Admin login |
| `/admin-dashboard/*`   | Private  | Admin dashboard with protected access |

## 🔄 Data Flow

- Menu data is fetched from the backend API (`/api/menu`) via Axios.  
- Orders and cart state are managed through **OrderContext**.  
- Authentication state is handled by **AuthContext**.  
- Admin routes are secured with the `ProtectedRoute` component.

