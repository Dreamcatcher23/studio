# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

Here’s a polished **Project Description** draft for **KrishiMitra** that you can use in your hackathon submission 👇

---

# 🌾 Project Description – KrishiMitra

**KrishiMitra** is a farmer-first, mobile-friendly web application that acts as a **digital companion for rural farmers**, helping them tackle everyday agricultural challenges with the power of **AI, real-time data, and community support**. The app is designed to be simple, intuitive, and accessible even in areas with **low internet connectivity**.

---

## ✅ Features & Functionality

1. **📸 Crop Disease Detection (AI-Powered)**

   * Farmers upload a photo of their crop.
   * Gemini AI analyzes the image and provides:

     * Crop name
     * Diagnosis (disease/pest)
     * Symptoms
     * Suggested treatment plan (tailored for Bengaluru’s monsoon season).

2. **💰 Market Price Information**

   * Real-time crop price database, searchable by crop, market, or location.
   * Helps farmers decide where and when to sell for maximum profit.

3. **🏛 Government Schemes & Policies**

   * Searchable database of schemes relevant to crops and regions.
   * Step-by-step guides for applying, eligibility checks, and deadline reminders.

4. **☁️ Weather Forecasts & Alerts**

   * Daily and weekly forecasts for farmers’ locations.
   * Severe weather alerts (rainstorms, droughts, heatwaves).
   * Crop advisories based on weather conditions.

5. **🌍 Soil Health & Fertilizer Advisory**

   * Farmers can enter soil test data (pH, NPK).
   * App recommends the right fertilizer usage.
   * Soil history is stored for long-term monitoring.

6. **📅 Farm Task Planner & Crop Calendar**

   * Farmers can add and track tasks (sowing, fertilizing, spraying, harvesting).
   * Calendar view with reminders for timely action.

7. **👥 Community Forum & Advisory Chat**

   * Peer-to-peer Q\&A forum for farmers.
   * AI chatbot for instant agricultural queries.
   * Multilingual support (English and Kannada, with voice input planned).

8. **🛒 Input Supplier Directory**

   * Database of local input suppliers (seeds, fertilizers, pesticides).
   * Contact details and price info.

9. **📊 Financial Tools**

   * Cost-benefit calculator to evaluate investments (e.g., pesticides vs expected yield).
   * Helps farmers make smarter financial decisions.

---

## 🛠 Technologies Used

* **Frontend:**

  * HTML, Tailwind CSS (responsive UI), JavaScript (vanilla, SPA approach).

* **Backend & Cloud Services:**

  * Firebase Authentication (Anonymous + Custom Token sign-in).
  * Firebase Firestore (real-time database for market prices, schemes, weather, community posts, user tasks).
  * Firebase Hosting (for deployment).

* **AI & APIs:**

  * Gemini API (gemini-2.5-flash-preview-05-20) → crop disease detection.
  * Weather API (or simulated Firestore data) → forecasts and alerts.
  * Voice APIs (future enhancement) → speech-to-text and text-to-speech.

* **Data Sources (mocked for demo):**

  * Firestore collections for:

    * `market_prices` (crop prices across markets)
    * `schemes` (government policies and subsidies)
    * `weather_alerts`, `soil_advisory`, `suppliers`

---

## 📊 Findings & Learnings

1. **Accessibility is key:** Many farmers have low-end devices and unstable internet, so **offline-first features** and **lightweight design** are crucial.
2. **AI can be a real enabler:** Gemini’s image analysis makes crop disease detection simple for farmers who may not have access to experts.
3. **Real-time data builds trust:** Firestore’s live updates for market prices and schemes make the app feel “alive” and useful daily.
4. **Language matters:** Farmers prefer local languages like Kannada, and adding **multilingual + voice support** will greatly improve adoption.
5. **Farmers need more than one solution:** A single feature is not enough — combining **crop health, weather, schemes, financial tools, and community** makes KrishiMitra a true one-stop digital companion.

---

## 🚀 Conclusion

KrishiMitra is more than just an app — it’s a **digital bridge** connecting farmers to knowledge, government support, market opportunities, and each other. By integrating **AI-powered disease detection**, **real-time data**, and **community support**, KrishiMitra empowers farmers to make informed decisions, protect their crops, and increase their income.

This project proved that with the right technology stack and farmer-first design, **digital solutions can create real impact in rural agriculture**. 🌱

---

Would you like me to also **condense this into a 3–4 line “elevator pitch”** version? That way you’ll have both the long description (for documentation) and a short one (for presenting to judges).


👉 So in short:
**Frontend:** HTML + Tailwind CSS + JavaScript
**Backend:** Firebase Authentication + Firestore
**AI:** Gemini API
**Extras:** Weather API, Voice APIs (future)

