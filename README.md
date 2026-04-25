# 🏦 Nexus Bank Management System

A full-stack, secure, digital banking platform. Built with a robust Spring Boot backend and a modern React frontend, this application provides a complete digital banking lifecycle including self-service registration, real-time ledger tracking, and an administrative oversight portal.

## ✨ Features

- **Dynamic Auto-Generation:** Secure 4-digit PINs and unique Account Numbers are auto-generated and safely assigned upon registration.
- **Full Transaction Lifecycle:** Instantly process and record deposits, withdrawals, and inter-account peer-to-peer transfers.
- **Smart Global Ledger:** The system automatically tracks counterparty logic (`To: Account` vs `From: Account`) across a system-wide unified ledger.
- **Secure Admin Portal:** Database-backed authentication for bank administrators to view all global transactions and the entire customer directory.
- **Premium UI/UX:** A bespoke "Nordic Earth" design language utilizing sleek glassmorphism, fluid micro-animations, and a responsive component architecture.

## 📸 Screenshots

### Modern Registration & Success Flow
![Registration Success](assets/success_ui.png)
*Beautiful inline credential generation replacing traditional browser alerts.*

### Customer Dashboard
![Customer Dashboard](assets/dashboard.png)
*Real-time balance, user details, and smart transaction history.*

### Admin Oversight Portal
![Admin Portal](assets/admin.png)
*Secure administrative access to global customer and ledger data.*

## 🛠️ Technology Stack

**Frontend:**
- React (Vite)
- Vanilla CSS with Glassmorphism Principles
- Axios & Lucide-React Icons

**Backend:**
- Java 17 / Spring Boot
- Spring Data JPA
- Hibernate ORM
- MySQL Database

## 🚀 Getting Started

### Prerequisites
- JDK 17+
- Node.js (v18+)
- MySQL Server

### 1. Database Setup
1. Create a MySQL schema named `bank_management_system`.
2. The `application.properties` uses `spring.jpa.hibernate.ddl-auto=update` to automatically build your schema upon initial run.
3. Use the built-in seed script to generate sample data by navigating to:
   `http://localhost:8080/api/admin/seed-kerala`

### 2. Backend (Spring Boot)
```bash
cd Bank_Management_System
mvn clean install
mvn spring-boot:run
```
*The backend server will start on port 8080.*

### 3. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
*The React application will start on port 5173.*
