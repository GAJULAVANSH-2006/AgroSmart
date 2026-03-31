"use client"

import {
  CloudSun,
  Droplets,
  Wind,
  Thermometer,
  Eye,
  Gauge,
  Sun,
  CloudRain,
  Cloud,
  CloudSnow,
  CloudLightning,
  Sunrise,
  Sunset,
  AlertTriangle,
  Umbrella,
  Leaf,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const currentWeather = {
  temperature: 32,
  feelsLike: 35,
  condition: "Partly Cloudy",
  humidity: 72,
  windSpeed: 14,
  windDirection: "NW",
  uvIndex: 7,
  pressure: 1013,
  visibility: 8,
  dewPoint: 24,
  sunrise: "06:12 AM",
  sunset: "06:45 PM",
}

const hourlyForecast = [
  { time: "Now", temp: 32, icon: "sun" },
  { time: "1 PM", temp: 33, icon: "sun" },
  { time: "2 PM", temp: 34, icon: "cloud-sun" },
  { time: "3 PM", temp: 33, icon: "cloud-sun" },
  { time: "4 PM", temp: 31, icon: "cloud" },
  { time: "5 PM", temp: 30, icon: "cloud" },
  { time: "6 PM", temp: 28, icon: "cloud-rain" },
  { time: "7 PM", temp: 27, icon: "cloud-rain" },
  { time: "8 PM", temp: 26, icon: "cloud" },
  { time: "9 PM", temp: 25, icon: "cloud" },
  { time: "10 PM", temp: 24, icon: "cloud" },
  { time: "11 PM", temp: 23, icon: "cloud" },
]

const weeklyForecast = [
  { day: "Today", high: 34, low: 22, condition: "Partly Cloudy", rain: 20, icon: "cloud-sun" },
  { day: "Tue", high: 33, low: 21, condition: "Sunny", rain: 5, icon: "sun" },
  { day: "Wed", high: 30, low: 20, condition: "Thunderstorm", rain: 80, icon: "lightning" },
  { day: "Thu", high: 28, low: 19, condition: "Rainy", rain: 65, icon: "rain" },
  { day: "Fri", high: 29, low: 20, condition: "Cloudy", rain: 40, icon: "cloud" },
  { day: "Sat", high: 31, low: 21, condition: "Partly Cloudy", rain: 15, icon: "cloud-sun" },
  { day: "Sun", high: 33, low: 22, condition: "Sunny", rain: 5, icon: "sun" },
]

const temperatureData = [
  { day: "Mon", high: 34, low: 22 },
  { day: "Tue", high: 33, low: 21 },
  { day: "Wed", high: 30, low: 20 },
  { day: "Thu", high: 28, low: 19 },
  { day: "Fri", high: 29, low: 20 },
  { day: "Sat", high: 31, low: 21 },
  { day: "Sun", high: 33, low: 22 },
]

const rainfallData = [
  { day: "Mon", rainfall: 2 },
  { day: "Tue", rainfall: 0 },
  { day: "Wed", rainfall: 28 },
  { day: "Thu", rainfall: 18 },
  { day: "Fri", rainfall: 8 },
  { day: "Sat", rainfall: 3 },
  { day: "Sun", rainfall: 0 },
]

const weatherAlerts = [
  {
    type: "warning",
    title: "Heavy Rainfall Expected",
    description: "25-35mm rainfall expected on Wednesday. Secure loose equipment and ensure drainage is clear.",
    time: "Wed, 2:00 PM – 8:00 PM",
  },
  {
    type: "info",
    title: "High UV Advisory",
    description: "UV index will reach 8+ tomorrow. Avoid prolonged outdoor work between 11 AM – 3 PM.",
    time: "Tomorrow, 11:00 AM – 3:00 PM",
  },
]

function getWeatherIcon(icon: string, className: string) {
  switch (icon) {
    case "sun": return <Sun className={className} />
    case "cloud-sun": return <CloudSun className={className} />
    case "cloud": return <Cloud className={className} />
    case "rain": case "cloud-rain": return <CloudRain className={className} />
    case "lightning": return <CloudLightning className={className} />
    case "snow": return <CloudSnow className={className} />
    default: return <Sun className={className} />
  }
}

export function WeatherForecast() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Weather Forecast
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Hyperlocal 7-day weather predictions and climate data for your farm
        </p>
      </div>

      {/* Current Conditions Hero */}
      <div className="glass rounded-2xl p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
              <CloudSun className="h-10 w-10 text-primary" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-foreground">{currentWeather.temperature}°</span>
                <span className="text-lg text-muted-foreground">C</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Feels like {currentWeather.feelsLike}°C · {currentWeather.condition}
              </p>
              <p className="text-xs text-muted-foreground">Mandya, Karnataka</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Humidity</p>
                <p className="text-sm font-semibold text-foreground">{currentWeather.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Wind</p>
                <p className="text-sm font-semibold text-foreground">{currentWeather.windSpeed} km/h {currentWeather.windDirection}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-[hsl(40,80%,50%)]" />
              <div>
                <p className="text-xs text-muted-foreground">UV Index</p>
                <p className="text-sm font-semibold text-foreground">{currentWeather.uvIndex} (High)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Pressure</p>
                <p className="text-sm font-semibold text-foreground">{currentWeather.pressure} hPa</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Visibility</p>
                <p className="text-sm font-semibold text-foreground">{currentWeather.visibility} km</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Dew Point</p>
                <p className="text-sm font-semibold text-foreground">{currentWeather.dewPoint}°C</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sunrise className="h-4 w-4 text-[hsl(40,80%,50%)]" />
              <div>
                <p className="text-xs text-muted-foreground">Sunrise</p>
                <p className="text-sm font-semibold text-foreground">{currentWeather.sunrise}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sunset className="h-4 w-4 text-[hsl(30,80%,50%)]" />
              <div>
                <p className="text-xs text-muted-foreground">Sunset</p>
                <p className="text-sm font-semibold text-foreground">{currentWeather.sunset}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="glass rounded-2xl p-5">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Hourly Forecast
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {hourlyForecast.map((hour, i) => (
            <div
              key={hour.time}
              className={`flex min-w-[72px] flex-col items-center gap-2 rounded-xl px-3 py-3 transition-colors ${
                i === 0 ? "bg-primary/15 border border-primary/30" : "bg-muted/30"
              }`}
            >
              <span className="text-xs text-muted-foreground">{hour.time}</span>
              {getWeatherIcon(hour.icon, "h-5 w-5 text-primary")}
              <span className="text-sm font-semibold text-foreground">{hour.temp}°</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Forecast + Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* 7-Day Forecast */}
        <div className="glass rounded-2xl p-5">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            7-Day Forecast
          </h2>
          <div className="flex flex-col gap-2">
            {weeklyForecast.map((day, i) => (
              <div
                key={day.day}
                className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                  i === 0 ? "bg-primary/10 border border-primary/20" : "bg-muted/20"
                }`}
              >
                <span className="w-12 text-sm font-medium text-foreground">{day.day}</span>
                <div className="flex items-center gap-2">
                  {getWeatherIcon(day.icon, "h-4 w-4 text-primary")}
                  <span className="w-24 text-xs text-muted-foreground">{day.condition}</span>
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

        {/* Temperature Chart */}
        <div className="glass rounded-2xl p-5">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Temperature Trend
          </h2>
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
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(160,12%,8%)",
                    border: "1px solid hsl(160,8%,16%)",
                    borderRadius: "12px",
                    color: "hsl(150,10%,92%)",
                  }}
                />
                <Area type="monotone" dataKey="high" stroke="hsl(152,60%,52%)" fill="url(#highGrad)" strokeWidth={2} name="High °C" />
                <Area type="monotone" dataKey="low" stroke="hsl(185,55%,45%)" fill="url(#lowGrad)" strokeWidth={2} name="Low °C" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Rainfall + Alerts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Rainfall Chart */}
        <div className="glass rounded-2xl p-5">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Rainfall Prediction (mm)
          </h2>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rainfallData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(160,8%,16%)" />
                <XAxis dataKey="day" stroke="hsl(150,6%,55%)" fontSize={12} />
                <YAxis stroke="hsl(150,6%,55%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(160,12%,8%)",
                    border: "1px solid hsl(160,8%,16%)",
                    borderRadius: "12px",
                    color: "hsl(150,10%,92%)",
                  }}
                />
                <Bar dataKey="rainfall" fill="hsl(185,55%,45%)" radius={[6, 6, 0, 0]} name="Rainfall (mm)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weather Alerts + Farm Advisory */}
        <div className="flex flex-col gap-6">
          {/* Alerts */}
          <div className="glass rounded-2xl p-5">
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-[hsl(40,80%,50%)]" />
              <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Weather Alerts
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {weatherAlerts.map((alert) => (
                <div
                  key={alert.title}
                  className={`rounded-xl p-3 ${
                    alert.type === "warning"
                      ? "bg-[hsl(40,80%,50%)]/10 border border-[hsl(40,80%,50%)]/20"
                      : "bg-accent/10 border border-accent/20"
                  }`}
                >
                  <h3 className="text-sm font-semibold text-foreground">{alert.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{alert.description}</p>
                  <p className="mt-2 text-xs font-medium text-muted-foreground">{alert.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Farm Advisory */}
          <div className="glass rounded-2xl p-5">
            <div className="mb-4 flex items-center gap-2">
              <Leaf className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Farm Advisory
              </h2>
            </div>
            <ul className="flex flex-col gap-2">
              {[
                "Irrigate fields early morning before 8 AM to prevent evaporation",
                "Wednesday rain expected — postpone fertilizer application",
                "High UV tomorrow — protect nursery seedlings with shade nets",
                "Good conditions for harvesting on Tuesday and Saturday",
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-sm text-secondary-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
