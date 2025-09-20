# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

 **KrishiMitra**, the **tech stack** is lightweight, modern, and chosen for **speed, simplicity, and mobile-first access**. Here’s the breakdown:

---

## 🌐 Frontend (Web Application)

* **HTML + Tailwind CSS** → for structure and styling (responsive, mobile-first UI).
* **JavaScript (Vanilla JS)** → handles UI logic, API calls, and Firebase integration.
* **Single-Page Application (SPA)** → implemented in one `.html` file for hackathon speed.

---

## 🔥 Backend / Cloud Services

* **Firebase Authentication** → Anonymous sign-in & Custom Token auth for secure access.
* **Firebase Firestore (NoSQL Database)** →

  * Real-time storage of **market prices**, **schemes**, **weather alerts**, **supplier info**, and **community posts**.
  * Private collections for **user tasks**, **soil history**, etc.
  * Real-time updates using `onSnapshot`.
* **Firebase Hosting** (optional) → to deploy the app quickly.

---

## 🤖 AI / API Integration

* **Gemini API (gemini-2.5-flash-preview-05-20 model)** →

  * For **crop disease detection** using inline image data.
  * Returns `cropName`, `diagnosis`, `symptoms`, `treatment`.

---

## 📡 Additional Integrations

* **Weather API (or mock Firestore data)** → to provide hyper-local forecasts and alerts.
* **Optional: Speech-to-Text / Text-to-Speech APIs** → for voice interaction in future versions.

---

## 🛠 Development Tools

* **CDN-based Libraries** (no complex setup):

  * Tailwind CSS → `cdn.jsdelivr`
  * Firebase JS SDK v11.6.1 → direct `<script>` import
* **GitHub / GitHub Pages** → version control & free hosting (if Firebase Hosting not used).

---

## 🚀 Why This Stack Works for Farmers

* **Lightweight** → Runs on low-end Android phones with just a browser.
* **No Installation Needed** → Just a link to open in browser.
* **Real-time Updates** → Firestore ensures instant sync for prices, schemes, and forum posts.
* **Scalable** → Can grow into a full PWA (Progressive Web App) later.

---

👉 So in short:
**Frontend:** HTML + Tailwind CSS + JavaScript
**Backend:** Firebase Authentication + Firestore
**AI:** Gemini API
**Extras:** Weather API, Voice APIs (future)

