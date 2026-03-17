# Online Examination System

A full-stack web application that simulates a real-world online exam platform with features like auto-save, resume functionality, timer-based submission, and detailed result analysis.

---

## 🔥 Key Features

* ⏳ Timer-based Exams with automatic submission
* 💾 Auto-save & Resume (even after refresh or tab close)
* 📊 Result Analysis with correct answer review
* 🔢 Question Navigation Panel (jump between questions)
* 🔄 Resume Detection Prompt on dashboard
* 🚫 Prevent Reattempt after submission
* 👤 User Dashboard with session handling

---

## 🧠 Highlights

* Implemented state persistence using localStorage
* Handled edge cases like refresh, time expiry, and partial progress
* Designed UI similar to real exam platforms
* Built modular frontend + REST API backend architecture

---

## 🛠 Tech Stack

* Frontend: React (Vite)
* Backend: Spring Boot
* Database: MySQL
* State Management: React Hooks
* Persistence: LocalStorage

---

## 📂 Project Structure

frontend/   → React application
backend/    → Spring Boot REST APIs

---

## ▶️ How to Run

### Backend

cd backend
mvn spring-boot:run

### Frontend

cd frontend
npm install
npm run dev

---

## 📈 Future Improvements

* Move persistence to backend (multi-device support)
* Add JWT authentication
* Admin panel for creating exams
* Analytics dashboard for performance tracking
