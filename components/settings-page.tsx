"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-context"
import { locationData } from "@/lib/location-data"
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
  Plus,
  X,
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
  const [farm, setFarm] = useState(() => {
    try {
      const saved = localStorage.getItem("agrosmart_farm")
      if (saved) return JSON.parse(saved)
    } catch {}
    return {
      name: "Sharma Farm — Mandya",
      location: "Mandya, Karnataka",
      area: "6.7",
      areaUnit: "acres",
      crops: "Rice, Tomato, Sugarcane",
      soilType: "Red Laterite",
      country: "India",
      state: "Karnataka",
      district: "Mandya",
    }
  })

  // Fields state
  const [fields, setFields] = useState<{ id: string; name: string; crop: string; area: string }[]>(() => {
    try {
      const saved = localStorage.getItem("agrosmart_fields")
      if (saved) return JSON.parse(saved)
    } catch {}
    return [
      { id: "field-0", name: "Field A", crop: "Rice", area: "2.5" },
    ]
  })

  const addField = () => {
    const newField = { id: `field-${Date.now()}`, name: `Field ${String.fromCharCode(65 + fields.length)}`, crop: "", area: "" }
    setFields([...fields, newField])
  }

  const removeField = (id: string) => {
    if (fields.length === 1) return
    setFields(fields.filter(f => f.id !== id))
  }

  const updateField = (id: string, key: string, value: string) => {
    setFields(fields.map(f => f.id === id ? { ...f, [key]: value } : f))
  }
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem("agrosmart_notifications")
      if (saved) return JSON.parse(saved)
    } catch {}
    return {
      weatherAlerts: true,
      diseaseAlerts: true,
      marketAlerts: true,
      soilAlerts: false,
      emailNotif: true,
      pushNotif: true,
      smsNotif: false,
    }
  })

  // Display preferences
  const [display, setDisplay] = useState<{
    tempUnit: "celsius" | "fahrenheit"
    areaUnit: "acres" | "hectares"
    language: "english" | "hindi" | "kannada" | "tamil" | "telugu"
  }>(() => {
    try {
      const saved = localStorage.getItem("agrosmart_display")
      if (saved) return JSON.parse(saved)
    } catch {}
    return {
      tempUnit: "celsius" as "celsius" | "fahrenheit",
      areaUnit: "acres" as "acres" | "hectares",
      language: "english" as "english" | "hindi" | "kannada" | "tamil" | "telugu",
    }
  })

  const handleSave = () => {
    // Persist profile to localStorage so it survives page refresh
    try {
      const session = localStorage.getItem("agrosmart_session")
      if (session) {
        const parsed = JSON.parse(session)
        localStorage.setItem(
          "agrosmart_session",
          JSON.stringify({ ...parsed, name: profile.name, email: profile.email, phone: profile.phone })
        )
      }
      localStorage.setItem("agrosmart_farm", JSON.stringify(farm))
      localStorage.setItem("agrosmart_fields", JSON.stringify(fields))
      localStorage.setItem("agrosmart_notifications", JSON.stringify(notifications))
      localStorage.setItem("agrosmart_display", JSON.stringify(display))
    } catch {
      // ignore
    }
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
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Country</label>
            <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/30 px-4 py-2.5">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <select
                value={farm.country || "India"}
                onChange={(e) => {
                  const c = locationData.find(x => x.name === e.target.value) ?? locationData[0]
                  setFarm({ ...farm, country: c.name, state: c.states[0].name, district: c.states[0].districts[0].name, location: `${c.states[0].districts[0].name}, ${c.states[0].name}`, soilType: c.states[0].districts[0].soilType })
                }}
                className="w-full bg-transparent text-sm text-foreground outline-none"
              >
                {locationData.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">State</label>
            <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/30 px-4 py-2.5">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <select
                value={farm.state || "Karnataka"}
                onChange={(e) => {
                  const country = locationData.find(x => x.name === (farm.country || "India")) ?? locationData[0]
                  const s = country.states.find(x => x.name === e.target.value) ?? country.states[0]
                  setFarm({ ...farm, state: s.name, district: s.districts[0].name, location: `${s.districts[0].name}, ${s.name}`, soilType: s.districts[0].soilType })
                }}
                className="w-full bg-transparent text-sm text-foreground outline-none"
              >
                {(locationData.find(c => c.name === (farm.country || "India")) ?? locationData[0]).states.map(s => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">District</label>
            <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/30 px-4 py-2.5">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <select
                value={farm.district || "Mandya"}
                onChange={(e) => {
                  const country = locationData.find(x => x.name === (farm.country || "India")) ?? locationData[0]
                  const state = country.states.find(x => x.name === (farm.state || "Karnataka")) ?? country.states[0]
                  const d = state.districts.find(x => x.name === e.target.value) ?? state.districts[0]
                  setFarm({ ...farm, district: d.name, location: `${d.name}, ${farm.state}`, soilType: d.soilType })
                }}
                className="w-full bg-transparent text-sm text-foreground outline-none"
              >
                {((locationData.find(c => c.name === (farm.country || "India")) ?? locationData[0]).states.find(s => s.name === (farm.state || "Karnataka")) ?? locationData[0].states[0]).districts.map(d => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
              </select>
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

      {/* Fields Manager */}
      <div className="glass rounded-2xl p-5">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">My Fields</h2>
          </div>
          <button
            type="button"
            onClick={addField}
            className="flex items-center gap-1.5 rounded-xl bg-primary/15 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/25 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Field
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {fields.map((field, i) => (
            <div key={field.id} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 items-end rounded-xl bg-muted/20 p-3">
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Field Name</label>
                <input
                  type="text"
                  value={field.name}
                  onChange={(e) => updateField(field.id, "name", e.target.value)}
                  placeholder="e.g. Field A"
                  className="w-full rounded-lg border border-border/50 bg-muted/30 px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Crop Type</label>
                <input
                  type="text"
                  value={field.crop}
                  onChange={(e) => updateField(field.id, "crop", e.target.value)}
                  placeholder="e.g. Rice"
                  className="w-full rounded-lg border border-border/50 bg-muted/30 px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Area (acres)</label>
                <input
                  type="number"
                  value={field.area}
                  onChange={(e) => updateField(field.id, "area", e.target.value)}
                  placeholder="e.g. 2.5"
                  min="0"
                  step="0.1"
                  className="w-full rounded-lg border border-border/50 bg-muted/30 px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50"
                />
              </div>
              <button
                type="button"
                onClick={() => removeField(field.id)}
                disabled={fields.length === 1}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">These fields appear in Soil Analysis and Fertilizer Suggestion.</p>
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
