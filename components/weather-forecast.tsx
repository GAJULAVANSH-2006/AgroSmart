"use client"

import { useWeather } from "@/hooks/use-weather"
import {
  CloudSun, Droplets, Wind, Thermometer, Eye, Gauge,
  Sun, Sunrise, Sunset, AlertTriangle, Umbrella, Leaf,
} from "lucide-react"
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"

const FALLBACK_HOURLY = [
  { time: "Now", temp: 32, icon: "☀️" },
  { time: "1 PM", temp: 33, icon: "☀️" },
  { time: "2 PM", temp: 34, icon: "⛅" },
  { time: "3 PM", temp: 33, icon: "⛅" },
  { time: "4 PM", temp: 31, icon: "☁️" },
  { time: "5 PM", temp: 30, icon: "☁️" },
  { time: "6 PM", temp: 28, icon: "🌧️" },
  { time: "7 PM", temp: 27, icon: "🌧️" },
]

const FALLBACK_FORECAST = [
  { day: "Today", high: 34, low: 22, condition: "Partly Cloudy", rain: 20, icon: "⛅" },
  { day: "Tue", high: 33, low: 21, condition: "Sunny", rain: 5, icon: "☀️" },
  { day: "Wed", high: 30, low: 20, condition: "Thunderstorm", rain: 80, icon: "⛈️" },
  { day: "Thu", high: 28, low: 19, condition: "Rainy", rain: 65, icon: "🌧️" },
  { day: "Fri", high: 29, low: 20, condition: "Cloudy", rain: 40, icon: "☁️" },
  { day: "Sat", high: 31, low: 21, condition: "Partly Cloudy", rain: 15, icon: "⛅" },
  { day: "Sun", high: 33, low: 22, condition: "Sunny", rain: 5, icon: "☀️" },
]

export function WeatherForecast() {
  const savedFarm = (() => { try { return JSON.parse(localStorage.getItem("agrosmart_farm") || "{}") } catch { return {} } })()
  const location = savedFarm.district && savedFarm.state
    ? `${savedFarm.district},${savedFarm.state},${savedFarm.country || "India"}`
    : "Mandya,Karnataka,India"
  const { weather, isLoading, error } = useWeather(location)

  const hourly = weather?.hourly ?? FALLBACK_HOURLY
  const forecast = weather?.forecast ?? FALLBACK_FORECAST

  const temperatureData = forecast.map(d => ({ day: d.day === "Today" ? "Today" : d.day, high: d.high, low: d.low }))
  const rainfallData = forecast.map(d => ({ day: d.day === "Today" ? "Today" : d.day, rainfall: d.rain }))

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Weather Forecast</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {weather ? `Live weather data for ${weather.location}` : "Hyperlocal 7-day weather predictions for your farm"}
        </p>
      </div>

      {/* Current Conditions */}
      <div className="glass rounded-2xl p-6">
        {isLoading ? (
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-primary" />
            <span className="text-sm text-muted-foreground">Fetching live weather...</span>
          </div>
        ) : (
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-5xl">
                {forecast[0]?.icon ?? "⛅"}
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-foreground">{weather?.temperature ?? 32}°</span>
                  <span className="text-lg text-muted-foreground">C</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Feels like {weather?.feelsLike ?? 35}°C · {weather?.condition ?? "Partly Cloudy"}
                </p>
                <p className="text-xs text-muted-foreground">{weather?.location ?? "Mandya, Karnataka"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
              {[
                { icon: Droplets, label: "Humidity", value: `${weather?.humidity ?? 72}%`, color: "text-accent" },
                { icon: Wind, label: "Wind", value: `${weather?.windSpeed ?? 14} km/h`, color: "text-accent" },
                { icon: Sun, label: "UV Index", value: `${weather?.uvIndex ?? 7} (High)`, color: "text-[hsl(40,80%,50%)]" },
                { icon: Gauge, label: "Pressure", value: `${weather?.pressure ?? 1013} hPa`, color: "text-accent" },
                { icon: Eye, label: "Visibility", value: `${weather?.visibility ?? 8} km`, color: "text-accent" },
                { icon: Thermometer, label: "Dew Point", value: `${weather?.dewPoint ?? 24}°C`, color: "text-accent" },
                { icon: Sunrise, label: "Sunrise", value: weather?.sunrise ?? "06:12 AM", color: "text-[hsl(40,80%,50%)]" },
                { icon: Sunset, label: "Sunset", value: weather?.sunset ?? "06:45 PM", color: "text-[hsl(30,80%,50%)]" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${color}`} />
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-semibold text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Hourly Forecast */}
      <div className="glass rounded-2xl p-5">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">Hourly Forecast</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {hourly.map((hour, i) => (
            <div key={i} className={`flex min-w-[72px] flex-col items-center gap-2 rounded-xl px-3 py-3 transition-colors ${
              i === 0 ? "bg-primary/15 border border-primary/30" : "bg-muted/30"
            }`}>
              <span className="text-xs text-muted-foreground">{hour.time}</span>
              <span className="text-lg">{hour.icon}</span>
              <span className="text-sm font-semibold text-foreground">{hour.temp}°</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day + Temperature Chart */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-5">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">7-Day Forecast</h2>
          <div className="flex flex-col gap-2">
            {forecast.map((day, i) => (
              <div key={i} className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                i === 0 ? "bg-primary/10 border border-primary/20" : "bg-muted/20"
              }`}>
                <span className="w-12 text-sm font-medium text-foreground">{day.day}</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{day.icon}</span>
                  <span className="w-28 text-xs text-muted-foreground truncate">{day.condition}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Umbrella className="h-3 w-3 text-accent" />
                  <span className="w-8 text-xs text-accent">{day.rain}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{day.high}°</span>
                  <span className="text-xs text-muted-foreground">{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">Temperature Trend</h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={temperatureData}>
                <defs>
                  <linearGradient id="highGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(152,60%,52%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(152,60%,52%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="lowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(185,55%,45%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(185,55%,45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(160,8%,16%)" />
                <XAxis dataKey="day" stroke="hsl(150,6%,55%)" fontSize={12} />
                <YAxis stroke="hsl(150,6%,55%)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(160,12%,8%)", border: "1px solid hsl(160,8%,16%)", borderRadius: "12px", color: "hsl(150,10%,92%)" }} />
                <Area type="monotone" dataKey="high" stroke="hsl(152,60%,52%)" fill="url(#highGrad)" strokeWidth={2} name="High °C" />
                <Area type="monotone" dataKey="low" stroke="hsl(185,55%,45%)" fill="url(#lowGrad)" strokeWidth={2} name="Low °C" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Rainfall + Advisory */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-5">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">Rainfall Chance (%)</h2>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rainfallData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(160,8%,16%)" />
                <XAxis dataKey="day" stroke="hsl(150,6%,55%)" fontSize={12} />
                <YAxis stroke="hsl(150,6%,55%)" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(160,12%,8%)", border: "1px solid hsl(160,8%,16%)", borderRadius: "12px", color: "hsl(150,10%,92%)" }} />
                <Bar dataKey="rainfall" fill="hsl(185,55%,45%)" radius={[6, 6, 0, 0]} name="Rain Chance %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <Leaf className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Farm Advisory</h2>
          </div>
          <ul className="flex flex-col gap-2">
            {[
              weather && weather.humidity > 80
                ? "High humidity detected — watch for fungal disease outbreaks"
                : "Irrigate fields early morning before 8 AM to prevent evaporation",
              weather && forecast.some(d => d.rain > 60)
                ? "Heavy rain expected — postpone fertilizer application on those days"
                : "Good conditions for fertilizer application this week",
              weather && (weather.uvIndex ?? 0) > 7
                ? "High UV index — protect nursery seedlings with shade nets"
                : "UV levels moderate — safe for outdoor farm work",
              weather && forecast[0]?.high > 35
                ? "High temperature alert — ensure adequate irrigation for crops"
                : "Good harvesting conditions expected this week",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-secondary-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
