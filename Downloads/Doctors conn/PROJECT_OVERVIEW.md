# 🩺 Medic - Doctor Appointment & Healthcare App
> **Project Overview & Technical Requirements Document**  
> **Created & Owned By:** Majid Ali  
> **GitHub Repository:** [https://github.com/malikmajid161/Medic-Doctor-Appointment-App](https://github.com/malikmajid161/Medic-Doctor-Appointment-App)

---

## 📌 Executive Summary

**Medic** is a modern, high-performance cross-platform healthcare application designed to connect patients directly with medical specialists. Built using **React 19**, **Vite**, **Capacitor 8**, and **Supabase**, the application offers a native-like mobile experience for Android and Web browsers. It features full dual-role support for both **Patients** and **Doctors**, real-time appointment request management, an intelligent doctor search engine, and instant session persistence.

---

## 🚀 Key Features & Capabilities

### 1. 👤 Patient Portal
* **Browse Specialties**: Explore medical categories including Cardiology, Dermatology, Neurology, Pediatrics, Gastroenterology, and General Practice.
* **Smart Doctor Search**: Instantly find doctors using multi-keyword fuzzy matching across doctor names, clinic locations, fee ranges, and ratings.
* **Doctor Profile Details**: View doctor experience, hospital affiliations, consultation fees, patient ratings, operating hours, and photo avatars.
* **Flexible Booking Flow**: Select between **In-person Visit** or **Video Consultation**, pick appointment dates, and select available time slots (`9:00 AM`, `9:30 AM`, etc.).
* **My Visits & Appointment History**: Track all scheduled visits in real-time with status indicators (`Pending`, `Accepted`, `Declined`, `Cancelled`) and digital pass tickets.

### 2. 👨‍⚕️ Doctor Portal & Dashboard
* **Doctor Registration**: Special registration workflow for healthcare professionals to specify their specialty, clinic/hospital, experience, consultation fee, and upload a profile photo.
* **Live Doctor Dashboard**: Automatically renders when logging in as a Doctor role.
* **Real-time Request Controls**: View incoming booking requests from patients and instantly **[Accept]** or **[Decline]** requests, which updates across all patient devices.
* **Profile Management**: Update consultation rates, practice hours, and clinic location at any time.

### 3. 🔍 Intelligent Multi-Keyword Search Engine
* **Case-Insensitive Token Search**: Search using single or multiple keywords in any order (e.g., `"Sarah Karachi"`, `"Skin 2000"`, `"Heart Shaukat"`).
* **Interactive Filter Chips**: One-tap filtering by specialty, top-rated doctors (`⭐ 4.8+`), and fee ranges (`Under Rs. 2,000`, `Rs. 2,000 - 3,000`, `Above Rs. 3,000`).
* **Live Online Status Dots**: Glowing green indicator lights (`#10b981`) highlighting doctors available for booking today.

### 4. 🎨 Modern Mobile UI/UX & Micro-Animations
* **Native Mobile Full-Screen Layout**: Automatically adapts on smartphones and APK builds to fill 100% of the display with 0 borders and full edge-to-edge support.
* **Touch Animations**: Smooth spring scale feedback on buttons, date selector pills, active tab bar pop effects, and slide-up modal transitions.
* **Custom Medical Favicon**: Custom vector SVG app icon featuring a glowing heart, doctor cross, and vital EKG pulse wave.

---

## 🔑 Pre-Configured Test Credentials (For 2-Phone Testing)

You can log in on **Phone A** as a Patient and on **Phone B** as a Doctor to test real-time booking interactions simultaneously:

| Role | Name | Email | Password |
|---|---|---|---|
| 👤 **Patient** | Zunaira Mughal | `patient@medic.com` | `password123` |
| 👨‍⚕️ **Doctor (Cardiologist)** | Dr. Ahmed Ali | `dr.ahmed@medic.com` | `password123` |
| 👩‍⚕️ **Doctor (Dermatologist)** | Dr. Sarah Khan | `dr.sarah@medic.com` | `password123` |
| 👨‍⚕️ **Doctor (Neurologist)** | Dr. Muhammad Hassan | `dr.hassan@medic.com` | `password123` |
| 👩‍⚕️ **Doctor (Pediatrician)** | Dr. Ayesha Malik | `dr.ayesha@medic.com` | `password123` |

> 💡 **Quick Feature:** In the login screen, tap any card in the **"Quick Demo Logins (1-Tap Test)"** bar to auto-fill credentials without typing!

---

## 🛠️ Technology Stack Architecture

* **Frontend**: React 19, Vite 8, Lucide React Icons
* **Styling & Design**: Vanilla CSS System (Plus Jakarta Sans font, HSL color tokens, Glassmorphism, Micro-animations)
* **Backend & Database**: Supabase Auth + Supabase Real-time Database (`appointments` table)
* **Mobile Engine**: Capacitor 8 (Android Studio APK build support)
* **CI/CD & Hosting**: GitHub Actions + GitHub Pages (`.github/workflows/deploy.yml`)

---

## 📱 How to Build the Android APK

1. Clone repository:
   ```bash
   git clone https://github.com/malikmajid161/Medic-Doctor-Appointment-App.git
   cd Medic-Doctor-Appointment-App
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build production web bundle:
   ```bash
   npm run build
   ```
4. Sync assets to Capacitor Android project:
   ```bash
   npx cap sync
   ```
5. Open in Android Studio to build APK:
   ```bash
   npx cap open android
   ```
