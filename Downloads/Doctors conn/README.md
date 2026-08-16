# 🩺 Medic — Full Doctor Appointment & Healthcare Platform

A high-performance, cross-platform React & Capacitor healthcare application designed and built by **Majid Ali**.

![Medic App Logo](public/favicon.svg)

## 📌 Project Overview
**Medic** is an end-to-end healthcare ecosystem connecting **Patients** and **Doctors**. Built with **React 19**, **Vite**, **Capacitor 8**, and **Supabase**, the app delivers a true native mobile experience for Android and Web. It features full dual-role support (Patient & Doctor), real-time appointment request management, an intelligent multi-keyword doctor search engine, and instant session persistence.

---

## 🌟 Key Features

### 👤 Patient Ecosystem
- **Smart Doctor Search Engine**: Fast, tokenized multi-keyword case-insensitive doctor search matching doctor name, hospital, city, and fee range.
- **Interactive Specialty Chips**: One-tap filtering by Cardiology, Dermatology, Neurology, Pediatrics, Gastroenterology, and General Practice.
- **Specialist Profiles & Fee Range Filters**: Filter doctors by Top Rated (`⭐ 4.8+`), fee tiers (`Under Rs. 2,000`, `Rs. 2,000 - 3,000`, `Above Rs. 3,000`), and live online availability.
- **Flexible Appointment Booking**: Choose between **In-Person Visit** and **Video Call**, select dates on interactive date pills, and pick time slots (`09:00 AM`, `09:30 AM`).
- **My Visits & Digital Pass Tickets**: Track past and upcoming visits with status indicators (`Pending`, `Accepted`, `Declined`, `Cancelled`) and digital pass tickets.

### 👨‍⚕️ Doctor Ecosystem
- **Doctor Registration & Profiles**: Healthcare professionals can sign up, list their practice specialty, hospital affiliation, consultation rate, and upload a profile photo.
- **Real-Time Doctor Dashboard**: Instant notification feed of patient booking requests with 1-tap **[Accept]** or **[Decline]** controls.
- **Practice Analytics**: Live summary of pending requests, accepted appointments, and patient statistics.

---

## 🔑 Quick Demo Credentials (1-Tap Test on 2 Phones)

You can log in on **Phone A** as a Patient and **Phone B** as a Doctor to test real-time booking interactions:

| Role | Doctor / Patient Name | Email | Password |
|---|---|---|---|
| 👤 **Patient** | Zunaira Mughal | `patient@medic.com` | `password123` |
| 👨‍⚕️ **Doctor (Cardiologist)** | Dr. Ahmed Ali | `dr.ahmed@medic.com` | `password123` |
| 👩‍⚕️ **Doctor (Dermatologist)** | Dr. Sarah Khan | `dr.sarah@medic.com` | `password123` |
| 👨‍⚕️ **Doctor (Neurologist)** | Dr. Muhammad Hassan | `dr.hassan@medic.com` | `password123` |
| 👩‍⚕️ **Doctor (Pediatrician)** | Dr. Ayesha Malik | `dr.ayesha@medic.com` | `password123` |

> 💡 **Quick Feature:** In the login screen, tap any chip in the **"Quick Demo Logins (1-Tap Test)"** bar to auto-fill credentials instantly!

---

## 🛠️ Technology Stack
- **Frontend Framework**: React 19 + Vite 8
- **Design System**: Vanilla CSS with modern Glassmorphism, HSL custom color tokens, and micro-animations
- **Icons**: Lucide React Icons
- **Backend & Database**: Supabase Auth + Supabase Realtime Database (`appointments` table)
- **Mobile Engine**: Capacitor 8 (Android Studio APK build support)
- **CI/CD & Deployment**: GitHub Actions + GitHub Pages (`.github/workflows/deploy.yml`)

---

## 🚀 How to Run & Build Locally

```bash
# 1. Clone repository
git clone https://github.com/malikmajid161/medic.git
cd medic

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build production bundle
npm run build

# 5. Sync web build to Android project
npx cap sync

# 6. Open in Android Studio
npx cap open android
```

---

## 👨‍💻 Author & Owner
**Majid Ali**  
- **GitHub Profile**: [https://github.com/malikmajid161](https://github.com/malikmajid161)  
- **Official Repository**: [https://github.com/malikmajid161/medic](https://github.com/malikmajid161/medic)
