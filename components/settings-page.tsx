"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-context"
import {
  Settings,
  User,
  MapPin,
  Bell,
  Eye,
  Globe,
  Thermometer,
  Ruler,
  Download,
  Trash2,
  Shield,
  Info,
  Save,
  CheckCircle2,
  Leaf,
  Mail,
  Phone,
  Smartphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function SettingsPage() {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)

  // Profile form state
  const [profile, setProfile] = useState({
    name: user?.name || "Ravi Sharma",
    email: user?.email || "ravi.sharma@agrosmart.in",
    phone: user?.phone || "+91 98765 43210",
  })

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name,
        email: user.email,
        phone: user.phone,
      })
    }
  }, [user])

  // Farm profile state
  const [farm, setFarm] = useState({
    name: "Sharma Farm — Mandya",
    location: "Mandya, Karnataka",
    area: "6.7",
    areaUnit: "acres",
    crops: "Rice, Tomato, Sugarcane",
    soilType: "Red Laterite",
  })

  // Notification toggles
  const [notifications, setNotifications] = useState({
    weatherAlerts: true,
    diseaseAlerts: true,
    marketAlerts: true,
    soilAlerts: false,
    emailNotif: true,
    pushNotif: true,
    smsNotif: false,
  })

  // Display preferences
  const [display, setDisplay] = useState({
    tempUnit: "celsius" as "celsius" | "fahrenheit",
    areaUnit: "acres" as "acres" | "hectares",
    language: "english" as "english" | "hindi" | "kannada" | "tamil" | "telugu",
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function Toggle({ checked, onChange, label, description, icon: Icon }: {
    checked: boolean
    onChange: (v: boolean) => void
    label: string
    description: string
    icon: React.ElementType
  }) {
    return (
      <div className="flex items-center justify-between rounded-xl bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-3">
          <Icon className="h-4 w-4 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onChange(!checked)}
          className={`relative h-6 w-11 rounded-full transition-colors ${
            checked ? "bg-primary" : "bg-muted"
          }`}
        >
          <span
            className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
              checked ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    )
  }

  function RadioOption({ selected, value, label, onClick }: {
    selected: boolean
    value: string
    label: string
    onClick: () => void
  }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
          selected
            ? "bg-primary text-primary-foreground shadow-lg"
            : "bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        }`}
      >
        {label}
      </button>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your account, farm profiles, and preferences
          </p>
        </div>
        <Button
          onClick={handleSave}
          className="gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
          size="lg"
        >
          {saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      {/* Profile Section */}
      <div className="glass rounded-2xl p-5">
        <div className="mb-5 flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Profile</h2>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/15">
              <span className="text-2xl font-bold text-primary">
                {profile.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "RS"}
              </span>
            </div>
            <button type="button" className="text-xs font-medium text-primary hover:underline">
              Change Photo
            </button>
          </div>

          {/* Form */}
          <div className="grid flex-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Full Name</label>
              <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/30 px-4 py-2.5">
                <User className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-transparent text-sm text-foreground outline-none"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Email</label>
              <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/30 px-4 py-2.5">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-transparent text-sm text-foreground outline-none"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Phone Number</label>
              <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/30 px-4 py-2.5">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full bg-transparent text-sm text-foreground outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Farm Profile */}
      <div className="glass rounded-2xl p-5">
        <div className="mb-5 flex items-center gap-2">
          <Leaf className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Farm Profile</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Farm Name</label>
            <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/30 px-4 py-2.5">
              <Leaf className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={farm.name}
                onChange={(e) => setFarm({ ...farm, name: e.target.value })}
                className="w-full bg-transparent text-sm text-foreground outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Location</label>
            <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/30 px-4 py-2.5">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={farm.location}
                onChange={(e) => setFarm({ ...farm, location: e.target.value })}
                className="w-full bg-transparent text-sm text-foreground outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Total Area</label>
            <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/30 px-4 py-2.5">
              <Ruler className="h-4 w-4 text-muted-foreground" />
              <input
                type="number"
                value={farm.area}
                onChange={(e) => setFarm({ ...farm, area: e.target.value })}
                className="w-full bg-transparent text-sm text-foreground outline-none"
              />
              <span className="text-xs text-muted-foreground">{farm.areaUnit}</span>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Crops Grown</label>
            <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/30 px-4 py-2.5">
              <Leaf className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={farm.crops}
                onChange={(e) => setFarm({ ...farm, crops: e.target.value })}
                className="w-full bg-transparent text-sm text-foreground outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Soil Type</label>
            <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/30 px-4 py-2.5">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={farm.soilType}
                onChange={(e) => setFarm({ ...farm, soilType: e.target.value })}
                className="w-full bg-transparent text-sm text-foreground outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="glass rounded-2xl p-5">
        <div className="mb-5 flex items-center gap-2">
          <Bell className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Notification Preferences</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Toggle
            checked={notifications.weatherAlerts}
            onChange={(v) => setNotifications({ ...notifications, weatherAlerts: v })}
            label="Weather Alerts"
            description="Extreme weather, rain, frost warnings"
            icon={Thermometer}
          />
          <Toggle
            checked={notifications.diseaseAlerts}
            onChange={(v) => setNotifications({ ...notifications, diseaseAlerts: v })}
            label="Disease Alerts"
            description="Regional outbreak notifications"
            icon={Shield}
          />
          <Toggle
            checked={notifications.marketAlerts}
            onChange={(v) => setNotifications({ ...notifications, marketAlerts: v })}
            label="Market Price Alerts"
            description="Price changes above 5% threshold"
            icon={Info}
          />
          <Toggle
            checked={notifications.soilAlerts}
            onChange={(v) => setNotifications({ ...notifications, soilAlerts: v })}
            label="Soil Moisture Alerts"
            description="Low moisture irrigation reminders"
            icon={Leaf}
          />
        </div>

        <div className="mt-5 border-t border-border/30 pt-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Notification Channels</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <Toggle
              checked={notifications.emailNotif}
              onChange={(v) => setNotifications({ ...notifications, emailNotif: v })}
              label="Email"
              description="Daily digest"
              icon={Mail}
            />
            <Toggle
              checked={notifications.pushNotif}
              onChange={(v) => setNotifications({ ...notifications, pushNotif: v })}
              label="Push"
              description="Real-time alerts"
              icon={Smartphone}
            />
            <Toggle
              checked={notifications.smsNotif}
              onChange={(v) => setNotifications({ ...notifications, smsNotif: v })}
              label="SMS"
              description="Critical only"
              icon={Phone}
            />
          </div>
        </div>
      </div>

      {/* Display Preferences */}
      <div className="glass rounded-2xl p-5">
        <div className="mb-5 flex items-center gap-2">
          <Eye className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Display Preferences</h2>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Temperature Unit</p>
            <div className="flex gap-2">
              <RadioOption selected={display.tempUnit === "celsius"} value="celsius" label="°C Celsius" onClick={() => setDisplay({ ...display, tempUnit: "celsius" })} />
              <RadioOption selected={display.tempUnit === "fahrenheit"} value="fahrenheit" label="°F Fahrenheit" onClick={() => setDisplay({ ...display, tempUnit: "fahrenheit" })} />
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Area Unit</p>
            <div className="flex gap-2">
              <RadioOption selected={display.areaUnit === "acres"} value="acres" label="Acres" onClick={() => setDisplay({ ...display, areaUnit: "acres" })} />
              <RadioOption selected={display.areaUnit === "hectares"} value="hectares" label="Hectares" onClick={() => setDisplay({ ...display, areaUnit: "hectares" })} />
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Language</p>
            <div className="flex flex-wrap gap-2">
              {([
                ["english", "English"],
                ["hindi", "हिन्दी"],
                ["kannada", "ಕನ್ನಡ"],
                ["tamil", "தமிழ்"],
                ["telugu", "తెలుగు"],
              ] as const).map(([val, label]) => (
                <RadioOption
                  key={val}
                  selected={display.language === val}
                  value={val}
                  label={label}
                  onClick={() => setDisplay({ ...display, language: val })}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="glass rounded-2xl p-5">
        <div className="mb-5 flex items-center gap-2">
          <Download className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Data Management</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/20 px-4 py-4 text-left transition-colors hover:bg-muted/40"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Download className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Export All Data</p>
              <p className="text-xs text-muted-foreground">Download scan history, soil data as CSV</p>
            </div>
          </button>
          <button
            type="button"
            className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-4 text-left transition-colors hover:bg-destructive/10"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10">
              <Trash2 className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Clear Scan History</p>
              <p className="text-xs text-muted-foreground">Remove all saved analysis results</p>
            </div>
          </button>
        </div>
      </div>

      {/* About */}
      <div className="glass rounded-2xl p-5">
        <div className="mb-4 flex items-center gap-2">
          <Info className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">About</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-muted/30 px-4 py-3">
            <p className="text-xs text-muted-foreground">App Version</p>
            <p className="text-sm font-semibold text-foreground">v2.4.1</p>
          </div>
          <div className="rounded-xl bg-muted/30 px-4 py-3">
            <p className="text-xs text-muted-foreground">AI Model</p>
            <p className="text-sm font-semibold text-foreground">AgroVision v3</p>
          </div>
          <div className="rounded-xl bg-muted/30 px-4 py-3">
            <p className="text-xs text-muted-foreground">Last Updated</p>
            <p className="text-sm font-semibold text-foreground">March 2026</p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          AgroSmart is an AI-powered agriculture assistant built with Next.js, React, and TailwindCSS.
          It uses computer vision for crop disease detection, weather forecasting APIs, and machine learning
          for soil analysis and market predictions. Built for Indian farmers to make data-driven decisions.
        </p>
      </div>
    </div>
  )
}
