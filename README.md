# AgroSmart 🌾

An AI-powered agricultural assistant built with Next.js, helping farmers with crop disease detection, weather forecasting, soil analysis, fertilizer recommendations, market insights, and a personal AI farm advisor.

## Tech Stack

- **Framework:** Next.js 16 (React 19) + TypeScript
- **Styling:** Tailwind CSS + Radix UI (shadcn/ui)
- **Auth & Backend:** Supabase (with localStorage fallback)
- **Charts:** Recharts
- **AI:** OpenAI GPT-4o (disease detection + farm advisor + market prices)
- **Weather:** WeatherAPI.com (live 7-day forecast)
- **Icons:** Lucide React

## Features

| Feature | Description | Status |
|---|---|---|
| Disease Detection | GPT-4o Vision AI analyzes crop images for real disease diagnosis | Live AI |
| Weather Forecast | Live 7-day weather from WeatherAPI based on your location | Live |
| Soil Analysis | NPK, pH, moisture by country/state/district with location-based soil types | Dynamic |
| Fertilizer Suggestion | Recommendations based on your saved crops and field areas | Dynamic |
| Market Insights | AI-generated realistic commodity prices via GPT-4o | AI-powered |
| AI Farm Advisor | GPT-4o chat advisor personalized to your farm profile | Live AI |
| Dashboard | Live weather widget, real scan history charts, crop health stats | Dynamic |
| Billing | Free vs Pro plan with upgrade flow | Functional |
| Settings | Farm profile, location, fields, notifications, display preferences | Persistent |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
cd AgroSmart
npm install --legacy-peer-deps
```

### Environment Variables

Create a `.env` file in the `AgroSmart/` directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_WEATHERAPI_KEY=your_weatherapi_key
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_key
NEXT_PUBLIC_DATAGOV_API_KEY=your_datagov_key_optional
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Account

```
Email:    demo@agrosmart.in
Password: demo123
```

## Project Structure

```
AgroSmart/
├── app/
│   ├── layout.tsx              # Root layout with AuthProvider
│   └── page.tsx                # App shell + client-side router
├── components/
│   ├── auth-context.tsx        # Auth state (Supabase + localStorage fallback)
│   ├── app-sidebar.tsx         # Collapsible navigation
│   ├── app-header.tsx          # Header with search, notifications, profile
│   ├── dashboard-content.tsx   # Live dashboard with real weather + scan stats
│   ├── disease-detection.tsx   # GPT-4o Vision crop disease analysis
│   ├── weather-forecast.tsx    # Live WeatherAPI 7-day forecast
│   ├── soil-analysis.tsx       # Location-based soil metrics
│   ├── fertilizer-suggestion.tsx # Crop-specific fertilizer plans
│   ├── market-insights.tsx     # AI-generated commodity prices
│   ├── farm-advisor.tsx        # GPT-4o floating chat advisor
│   ├── settings-page.tsx       # Full settings with location/fields
│   ├── billing-page.tsx        # Free vs Pro plan
│   └── ui/                     # shadcn/ui components
├── hooks/
│   ├── use-weather.ts          # WeatherAPI hook
│   ├── use-market-data.ts      # Market prices hook (data.gov.in / OpenAI)
│   └── use-dashboard-stats.ts  # Scan history stats hook
├── lib/
│   ├── supabase.ts             # Supabase client
│   ├── gemini.ts               # OpenAI Vision API for disease detection
│   ├── location-data.ts        # Country/State/District + soil type data
│   └── utils.ts
└── .env                        # API keys
```

## API Keys

| Key | Source | Purpose |
|---|---|---|
| `NEXT_PUBLIC_WEATHERAPI_KEY` | [weatherapi.com](https://weatherapi.com) | Live weather forecast |
| `NEXT_PUBLIC_OPENAI_API_KEY` | [platform.openai.com](https://platform.openai.com) | Disease detection + AI advisor + market prices |
| `NEXT_PUBLIC_SUPABASE_URL` + `ANON_KEY` | [supabase.com](https://supabase.com) | Authentication |
| `NEXT_PUBLIC_DATAGOV_API_KEY` | [data.gov.in](https://data.gov.in) | Real mandi prices (optional) |

## Plans

| Feature | Free | Pro (₹499/mo) |
|---|---|---|
| Disease scans | 5/month | Unlimited |
| Weather forecast | 3-day | 7-day |
| Soil analysis | 1 field | Multi-field |
| Market insights | Top 5 crops | 500+ mandis |
| AI Farm Advisor | ✓ | ✓ |
| Scan history | 7 days | Unlimited |

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```
