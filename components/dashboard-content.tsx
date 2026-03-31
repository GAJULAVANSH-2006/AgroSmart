"use client"

import { useAuth } from "@/components/auth-context"

import {
  ScanSearch,
  CloudSun,
  FlaskConical,
  Sprout,
  TrendingUp,
  ArrowUpRight,
  Leaf,
  Droplets,
  Thermometer,
  AlertTriangle,
  Activity,
  ShieldCheck,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const features = [
  {
    icon: ScanSearch,
    title: "Disease Detection",
    description: "AI-powered crop disease identification from images",
    stat: "96.3% accuracy",
    id: "disease",
  },
  {
    icon: CloudSun,
    title: "Weather Forecast",
    description: "Hyperlocal 7-day weather predictions for your farm",
    stat: "Real-time data",
    id: "weather",
  },
  {
    icon: FlaskConical,
    title: "Soil Analysis",
    description: "NPK levels, pH, and moisture analysis",
    stat: "12 parameters",
    id: "soil",
  },
  {
    icon: Sprout,
    title: "Fertilizer Suggestion",
    description: "Smart recommendations based on soil and crop data",
    stat: "AI-optimized",
    id: "fertilizer",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "Live commodity prices and market trend analysis",
    stat: "500+ markets",
    id: "market",
  },
]

const cropHealthData = [
  { name: "Healthy", value: 68, color: "hsl(152,60%,52%)" },
  { name: "At Risk", value: 20, color: "hsl(40,80%,50%)" },
  { name: "Diseased", value: 12, color: "hsl(0,72%,51%)" },
]

const weeklyActivity = [
  { day: "Mon", scans: 12, alerts: 2 },
  { day: "Tue", scans: 18, alerts: 1 },
  { day: "Wed", scans: 8, alerts: 3 },
  { day: "Thu", scans: 22, alerts: 0 },
  { day: "Fri", scans: 15, alerts: 2 },
  { day: "Sat", scans: 9, alerts: 1 },
  { day: "Sun", scans: 5, alerts: 0 },
]

const recentAlerts = [
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
              <p className="text-xs text-muted-foreground">Active Crops</p>
              <p className="text-xl font-bold text-foreground">12</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
              <Droplets className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Soil Moisture</p>
              <p className="text-xl font-bold text-foreground">68%</p>
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
              <p className="text-xl font-bold text-foreground">32°C</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row — Crop Health + Weekly Activity */}
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
                  <Pie
                    data={cropHealthData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {cropHealthData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(160,12%,8%)",
                      border: "1px solid hsl(160,8%,16%)",
                      borderRadius: "12px",
                      color: "hsl(150,10%,92%)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-3">
              {cropHealthData.map((item) => (
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
              <BarChart data={weeklyActivity}>
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
                <Bar dataKey="scans" fill="hsl(152,60%,52%)" radius={[4, 4, 0, 0]} name="Scans" />
                <Bar dataKey="alerts" fill="hsl(40,80%,50%)" radius={[4, 4, 0, 0]} name="Alerts" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Weather Widget + Recent Alerts */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weather Mini Widget */}
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
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-foreground">32°</span>
            <span className="text-sm text-muted-foreground">Partly Cloudy</span>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>💧 72% Humidity</span>
            <span>💨 14 km/h</span>
          </div>
          <div className="flex gap-2">
            {[
              { day: "Tue", temp: "33°", icon: "☀️" },
              { day: "Wed", temp: "30°", icon: "⛈️" },
              { day: "Thu", temp: "28°", icon: "🌧️" },
            ].map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-1 rounded-lg bg-muted/30 py-2">
                <span className="text-[10px] text-muted-foreground">{d.day}</span>
                <span className="text-sm">{d.icon}</span>
                <span className="text-xs font-semibold text-foreground">{d.temp}</span>
              </div>
            ))}
          </div>
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
            {recentAlerts.map((alert) => (
              <div
                key={alert.crop}
                className="flex items-center justify-between rounded-xl bg-muted/20 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{alert.crop}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-medium ${
                      alert.severity === "high"
                        ? "text-destructive"
                        : alert.severity === "medium"
                        ? "text-[hsl(40,80%,50%)]"
                        : alert.severity === "healthy"
                        ? "text-primary"
                        : "text-accent"
                    }`}
                  >
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
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
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
