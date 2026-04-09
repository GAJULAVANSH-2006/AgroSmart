"use client"

import { useAuth } from "@/components/auth-context"
import { useWeather } from "@/hooks/use-weather"
import { useDashboardStats } from "@/hooks/use-dashboard-stats"
import {
  ScanSearch, CloudSun, FlaskConical, Sprout, TrendingUp,
  ArrowUpRight, Leaf, Droplets, Thermometer, AlertTriangle,
  Activity, ShieldCheck,
} from "lucide-react"
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"

const features = [
  { icon: ScanSearch, title: "Disease Detection", description: "AI-powered crop disease identification from images", stat: "96.3% accuracy", id: "disease" },
  { icon: CloudSun, title: "Weather Forecast", description: "Hyperlocal 7-day weather predictions for your farm", stat: "Real-time data", id: "weather" },
  { icon: FlaskConical, title: "Soil Analysis", description: "NPK levels, pH, and moisture analysis", stat: "12 parameters", id: "soil" },
  { icon: Sprout, title: "Fertilizer Suggestion", description: "Smart recommendations based on soil and crop data", stat: "AI-optimized", id: "fertilizer" },
  { icon: TrendingUp, title: "Market Insights", description: "Live commodity prices and market trend analysis", stat: "500+ markets", id: "market" },
]

const FALLBACK_ALERTS = [
  { crop: "Tomato — Field C", disease: "Early Blight Detected", severity: "medium", time: "2 hours ago" },
  { crop: "Rice — Field A", disease: "Healthy — No Issues", severity: "healthy", time: "5 hours ago" },
  { crop: "Wheat — Field B", disease: "Leaf Rust Detected", severity: "high", time: "1 day ago" },
  { crop: "Cotton — Field D", disease: "Aphid Infestation Risk", severity: "low", time: "2 days ago" },
]

interface DashboardContentProps {
  onNavigate: (id: string) => void
}

export function DashboardContent({ onNavigate }: DashboardContentProps) {
  const { user } = useAuth()
  const firstName = user?.name?.split(" ")[0] || "Farmer"
  const { weather, isLoading: weatherLoading } = useWeather((() => {
    try {
      const farm = JSON.parse(localStorage.getItem("agrosmart_farm") || "{}")
      return farm.district && farm.state ? `${farm.district},${farm.state},${farm.country || "India"}` : "Mandya,Karnataka,India"
    } catch { return "Mandya,Karnataka,India" }
  })())
  const stats = useDashboardStats()

  const recentAlerts = stats.recentAlerts.length > 0 ? stats.recentAlerts : FALLBACK_ALERTS

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here is an overview of your farm analytics and AI tools
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
              <Leaf className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Scans</p>
              <p className="text-xl font-bold text-foreground">
                {stats.totalScans > 0 ? stats.totalScans : 12}
              </p>
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
              <Droplets className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Humidity</p>
              <p className="text-xl font-bold text-foreground">
                {weather ? `${weather.humidity}%` : "68%"}
              </p>
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(40,80%,50%)]/15">
              <Thermometer className="h-5 w-5 text-[hsl(40,80%,50%)]" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Temperature</p>
              <p className="text-xl font-bold text-foreground">
                {weather ? `${weather.temperature}°C` : "32°C"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Crop Health */}
        <div className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Crop Health Overview
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="h-[180px] w-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stats.cropHealth} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                    {stats.cropHealth.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(160,12%,8%)", border: "1px solid hsl(160,8%,16%)", borderRadius: "12px", color: "hsl(150,10%,92%)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-3">
              {stats.cropHealth.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.value}% of crops</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Weekly Activity
            </h2>
          </div>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(160,8%,16%)" />
                <XAxis dataKey="day" stroke="hsl(150,6%,55%)" fontSize={12} />
                <YAxis stroke="hsl(150,6%,55%)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(160,12%,8%)", border: "1px solid hsl(160,8%,16%)", borderRadius: "12px", color: "hsl(150,10%,92%)" }} />
                <Bar dataKey="scans" fill="hsl(152,60%,52%)" radius={[4, 4, 0, 0]} name="Scans" />
                <Bar dataKey="alerts" fill="hsl(40,80%,50%)" radius={[4, 4, 0, 0]} name="Alerts" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Weather Widget + Recent Alerts */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weather Widget */}
        <button
          type="button"
          onClick={() => onNavigate("weather")}
          className="glass group flex flex-col gap-4 rounded-2xl p-5 text-left transition-all hover:border-primary/30 hover:bg-card/80"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CloudSun className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Weather Now
              </span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          {weatherLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted border-t-primary" />
              <span className="text-sm text-muted-foreground">Loading...</span>
            </div>
          ) : (
            <>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground">
                  {weather ? `${weather.temperature}°` : "32°"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {weather ? weather.condition : "Partly Cloudy"}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>💧 {weather ? weather.humidity : 72}% Humidity</span>
                <span>💨 {weather ? weather.windSpeed : 14} km/h</span>
              </div>
              <div className="flex gap-2">
                {(weather?.forecast?.slice(1, 4) ?? [
                  { day: "Tue", high: 33, icon: "☀️" },
                  { day: "Wed", high: 30, icon: "⛈️" },
                  { day: "Thu", high: 28, icon: "🌧️" },
                ]).map((d: any) => (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-1 rounded-lg bg-muted/30 py-2">
                    <span className="text-[10px] text-muted-foreground">{d.day}</span>
                    <span className="text-sm">{d.icon}</span>
                    <span className="text-xs font-semibold text-foreground">{d.high ?? d.temp}°</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </button>

        {/* Recent Alerts */}
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-[hsl(40,80%,50%)]" />
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Recent Disease Alerts
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            {recentAlerts.map((alert, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl bg-muted/20 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{alert.crop}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    alert.severity === "high" ? "text-destructive"
                    : alert.severity === "medium" ? "text-[hsl(40,80%,50%)]"
                    : alert.severity === "healthy" ? "text-primary"
                    : "text-accent"
                  }`}>
                    {alert.disease}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          AI Tools
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <button
              key={feature.id}
              type="button"
              onClick={() => onNavigate(feature.id)}
              className="glass group flex flex-col gap-4 rounded-2xl p-5 text-left transition-all duration-200 hover:border-primary/30 hover:bg-card/80"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
              <span className="mt-auto inline-block rounded-full bg-muted/60 px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                {feature.stat}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
