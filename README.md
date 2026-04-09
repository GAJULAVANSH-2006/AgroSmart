# AgroSmart 🌾

An AI-powered agricultural assistant built with Next.js, helping farmers with crop disease detection, weather forecasting, soil analysis, fertilizer recommendations, and market insights.

## Tech Stack

- **Framework:** Next.js 16 (React 19) + TypeScript
- **Styling:** Tailwind CSS + Radix UI
- **Auth & Backend:** Supabase
- **Charts:** Recharts
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod

## Features

| Feature | Description |
|---|---|
| Disease Detection | AI-powered crop disease identification via image upload |
| Weather Forecast | Hyperlocal 7-day weather predictions with hourly breakdown |
| Soil Analysis | NPK levels, pH, moisture, and micronutrient tracking |
| Fertilizer Suggestion | AI recommendations by crop type and growth stage |
| Market Insights | Live commodity prices from 500+ mandis with trend analysis |
| Dashboard | Farm overview with crop health, alerts, and activity charts |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (optional — app works in demo mode without it)

### Installation

```bash
cd AgroSmart
npm install
```

### Environment Variables

Create a `.env` file in the `AgroSmart/` directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> If Supabase is not configured, the app falls back to localStorage-based auth automatically.

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Account

You can log in instantly without creating an account:

```
Email:    demo@agrosmart.in
Password: demo123
```

## Project Structure

```
AgroSmart/
├── app/
│   ├── layout.tsx          # Root layout with AuthProvider
│   ├── page.tsx            # Main app shell + client-side router
│   └── globals.css
├── components/
│   ├── auth-context.tsx    # Auth state, login, signup, logout
│   ├── app-sidebar.tsx     # Collapsible navigation sidebar
│   ├── app-header.tsx      # Header with search, notifications, profile
│   ├── dashboard-content.tsx
│   ├── disease-detection.tsx
│   ├── weather-forecast.tsx
│   ├── soil-analysis.tsx
│   ├── fertilizer-suggestion.tsx
│   ├── market-insights.tsx
│   ├── settings-page.tsx
│   ├── billing-page.tsx
│   ├── help-center-page.tsx
│   ├── login-page.tsx
│   ├── signup-page.tsx
│   ├── image-upload.tsx
│   ├── ai-result-panel.tsx
│   └── ui/                 # Radix-based shadcn/ui components
├── lib/
│   ├── supabase.ts         # Supabase client initialization
│   └── utils.ts
└── hooks/
    ├── use-mobile.tsx
    └── use-toast.ts
```

## Authentication Flow

1. On load, checks localStorage for an existing session
2. Falls back to Supabase `getSession()` if configured
3. Demo account bypasses all auth checks
4. Logout clears both Supabase session and localStorage

## Scripts

```bash
npm run dev      # Start dev server (Turbo mode)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Current Status

This is a demo-quality application. All feature data (weather, soil, market prices, disease results) is currently mocked. Real API integration is the next step for production readiness.

## Roadmap

- [ ] Real AI model integration for disease detection
- [ ] Live weather API (e.g., OpenWeatherMap)
- [ ] Live mandi price feeds
- [ ] Persistent settings with Supabase database
- [ ] Push notifications
- [ ] Mobile app (React Native)
