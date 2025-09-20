# **App Name**: Krishi Sahayak

## Core Features:

- Crop Disease Detection: Analyze uploaded crop image using the Gemini API to identify potential diseases. This feature employs a tool within the LLM, using the current date to augment the image data, so the LLM can incorporate weather heuristics into the identification, where appropriate. Image caching and queueing for offline support. If get error in using firebase use gemini in real time to fetch data.
- Real-time Market Prices: Display current market prices for various crops based on simulated data. Includes search and filtering options, bookmarking local markets, and price threshold notifications.
- Government Schemes Database: Provide a searchable database of government schemes and policies related to farming. Includes step-by-step guides, eligibility checks, deadline reminders, and document checklist.
- Weather Forecasts & Alerts: Provides a hyper-local weather forecast and alerts for extreme weather events.
- Soil Health / Nutrient Advisory: An advisory tool based on soil data. Provides advice on fertilizer and nutrient usage based on user input.
- Task Planner / Crop Calendar: Allows farmers to schedule and track tasks related to farming.
- Community / Peer Forum / Chatbot: A platform for collaboration and assistance, potentially including an AI-chatbot.
- Input Marketplace / Supplier Directory: A directory of local input suppliers (seeds, fertilizers, pesticides, tools).
- Financial / Cost-Benefit Tools: A calculator to estimate costs vs. expected yield gains.
- Anonymous Authentication: Allow users to sign in anonymously for basic usage tracking.
- Language Support: Enable language switching between English, Kannada, and Hindi for broader accessibility. Plan for voice support.

## Style Guidelines:

- Primary color: Earthy Green (#6B8E23) to reflect agriculture and nature.
- Background color: Light Beige (#F5F5DC) to provide a neutral and calming backdrop.
- Accent color: Harvest Gold (#DAA520) for highlighting important information and CTAs.
- Body and headline font: 'PT Sans' (sans-serif) for a modern yet warm feel, suitable for both headlines and body text.
- Use simple, clear icons representing crops, diseases, markets, and government schemes.
- Mobile-first responsive design with a persistent sidebar/menu that collapses into a hamburger menu on smaller screens.
- Subtle transitions and loading animations to improve user experience during API calls and data loading.