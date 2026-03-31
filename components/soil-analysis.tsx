"use client"

import { useState } from "react"
import {
  FlaskConical,
  Droplets,
  Leaf,
  Zap,
  TrendingUp,
  ArrowDown,
  ArrowUp,
  Minus,
  MapPin,
  ChevronDown,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts"

const fields = [
  { id: "field-a", name: "Field A — Paddy", area: "2.5 acres" },
  { id: "field-b", name: "Field B — Wheat", area: "3.0 acres" },
  { id: "field-c", name: "Field C — Tomato", area: "1.2 acres" },
]

const soilData: Record<string, {
  healthScore: number
  nitrogen: number
  phosphorus: number
  potassium: number
  ph: number
  moisture: number
  organicCarbon: number
  sand: number
  silt: number
  clay: number
  ec: number
  zinc: number
  iron: number
  manganese: number
  copper: number
  boron: number
  sulfur: number
}> = {
  "field-a": {
    healthScore: 78,
    nitrogen: 72,
    phosphorus: 45,
    potassium: 85,
    ph: 6.5,
    moisture: 68,
    organicCarbon: 0.62,
    sand: 40,
    silt: 35,
    clay: 25,
    ec: 0.42,
    zinc: 1.8,
    iron: 8.2,
    manganese: 3.5,
    copper: 1.2,
    boron: 0.6,
    sulfur: 12.4,
  },
  "field-b": {
    healthScore: 65,
    nitrogen: 55,
    phosphorus: 62,
    potassium: 70,
    ph: 7.2,
    moisture: 52,
    organicCarbon: 0.48,
    sand: 50,
    silt: 30,
    clay: 20,
    ec: 0.38,
    zinc: 1.4,
    iron: 6.8,
    manganese: 2.9,
    copper: 0.9,
    boron: 0.4,
    sulfur: 9.8,
  },
  "field-c": {
    healthScore: 85,
    nitrogen: 82,
    phosphorus: 70,
    potassium: 90,
    ph: 6.8,
    moisture: 75,
    organicCarbon: 0.78,
    sand: 35,
    silt: 38,
    clay: 27,
    ec: 0.52,
    zinc: 2.1,
    iron: 9.5,
    manganese: 4.1,
    copper: 1.5,
    boron: 0.8,
    sulfur: 14.2,
  },
}

const historicalNPK = [
  { month: "Aug", nitrogen: 60, phosphorus: 40, potassium: 70 },
  { month: "Sep", nitrogen: 55, phosphorus: 42, potassium: 75 },
  { month: "Oct", nitrogen: 62, phosphorus: 38, potassium: 72 },
  { month: "Nov", nitrogen: 68, phosphorus: 44, potassium: 80 },
  { month: "Dec", nitrogen: 70, phosphorus: 43, potassium: 82 },
  { month: "Jan", nitrogen: 72, phosphorus: 45, potassium: 85 },
]

function NPKBar({ label, value, color, ideal }: { label: string; value: number; color: string; ideal: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-foreground">{value}%</span>
          <span className="text-xs text-muted-foreground">Ideal: {ideal}</span>
        </div>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted/50">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

function getPhColor(ph: number) {
  if (ph < 5.5) return "hsl(0,72%,51%)"
  if (ph < 6.0) return "hsl(30,80%,50%)"
  if (ph < 7.0) return "hsl(152,60%,52%)"
  if (ph < 7.5) return "hsl(185,55%,45%)"
  return "hsl(40,80%,50%)"
}

function getPhLabel(ph: number) {
  if (ph < 5.5) return "Very Acidic"
  if (ph < 6.0) return "Acidic"
  if (ph < 7.0) return "Slightly Acidic (Ideal)"
  if (ph < 7.5) return "Neutral"
  return "Alkaline"
}

function getTrend(val: number, high: number) {
  const ratio = val / high
  if (ratio > 0.7) return { icon: ArrowUp, color: "text-primary", label: "Good" }
  if (ratio > 0.4) return { icon: Minus, color: "text-[hsl(40,80%,50%)]", label: "Moderate" }
  return { icon: ArrowDown, color: "text-destructive", label: "Low" }
}

export function SoilAnalysis() {
  const [selectedField, setSelectedField] = useState("field-a")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const data = soilData[selectedField]

  const compositionData = [
    { name: "Sand", value: data.sand, color: "hsl(40,80%,50%)" },
    { name: "Silt", value: data.silt, color: "hsl(152,60%,52%)" },
    { name: "Clay", value: data.clay, color: "hsl(185,55%,45%)" },
  ]

  const moistureData = [{ name: "Moisture", value: data.moisture, fill: "hsl(185,55%,45%)" }]

  const healthColor =
    data.healthScore >= 80
      ? "hsl(152,60%,52%)"
      : data.healthScore >= 60
      ? "hsl(40,80%,50%)"
      : "hsl(0,72%,51%)"

  const micronutrients = [
    { label: "EC (dS/m)", value: data.ec, ideal: "< 1.0" },
    { label: "Zinc (ppm)", value: data.zinc, ideal: "> 1.5" },
    { label: "Iron (ppm)", value: data.iron, ideal: "> 5.0" },
    { label: "Manganese (ppm)", value: data.manganese, ideal: "> 2.0" },
    { label: "Copper (ppm)", value: data.copper, ideal: "> 0.5" },
    { label: "Boron (ppm)", value: data.boron, ideal: "> 0.5" },
    { label: "Sulfur (ppm)", value: data.sulfur, ideal: "> 10" },
  ]

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Title + Field Selector */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Soil Analysis</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Comprehensive soil health metrics and nutrient analysis
          </p>
        </div>

        {/* Field Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/30 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
          >
            <MapPin className="h-4 w-4 text-primary" />
            {fields.find((f) => f.id === selectedField)?.name}
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-xl border border-border/50 bg-card p-1 shadow-xl">
              {fields.map((field) => (
                <button
                  key={field.id}
                  type="button"
                  onClick={() => { setSelectedField(field.id); setDropdownOpen(false) }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                    selectedField === field.id
                      ? "bg-primary/15 text-primary"
                      : "text-foreground hover:bg-muted/50"
                  }`}
                >
                  <span>{field.name}</span>
                  <span className="text-xs text-muted-foreground">{field.area}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Health Score + NPK */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Health Score */}
        <div className="glass flex flex-col items-center gap-4 rounded-2xl p-6">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Overall Soil Health
          </h3>
          <div className="relative flex h-40 w-40 items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(160,8%,16%)" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={healthColor}
                strokeWidth="8"
                strokeDasharray={`${(data.healthScore / 100) * 264} 264`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">{data.healthScore}</span>
              <span className="text-xs text-muted-foreground">/ 100</span>
            </div>
          </div>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: `${healthColor}20`, color: healthColor }}
          >
            {data.healthScore >= 80 ? "Excellent" : data.healthScore >= 60 ? "Good" : "Needs Attention"}
          </span>
        </div>

        {/* NPK Levels */}
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <div className="mb-5 flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-primary" />
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              NPK Levels
            </h3>
          </div>
          <div className="flex flex-col gap-5">
            <NPKBar label="Nitrogen (N)" value={data.nitrogen} color="hsl(152,60%,52%)" ideal="60-80%" />
            <NPKBar label="Phosphorus (P)" value={data.phosphorus} color="hsl(185,55%,45%)" ideal="40-60%" />
            <NPKBar label="Potassium (K)" value={data.potassium} color="hsl(140,50%,60%)" ideal="70-90%" />
          </div>
        </div>
      </div>

      {/* pH + Moisture + Composition */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* pH Scale */}
        <div className="glass rounded-2xl p-5">
          <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            pH Level
          </h3>
          <div className="flex flex-col items-center gap-3">
            <div className="relative h-4 w-full overflow-hidden rounded-full"
              style={{
                background: "linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #06b6d4, #3b82f6, #8b5cf6)"
              }}
            >
              <div
                className="absolute top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-white shadow-lg"
                style={{ left: `${(data.ph / 14) * 100}%` }}
              />
            </div>
            <div className="flex w-full justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>7</span>
              <span>14</span>
            </div>
            <div className="mt-2 text-center">
              <span className="text-3xl font-bold text-foreground">{data.ph}</span>
              <p className="mt-1 text-xs font-medium" style={{ color: getPhColor(data.ph) }}>
                {getPhLabel(data.ph)}
              </p>
            </div>
          </div>
        </div>

        {/* Moisture */}
        <div className="glass rounded-2xl p-5">
          <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Soil Moisture
          </h3>
          <div className="flex flex-col items-center gap-2">
            <div className="h-[160px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="90%"
                  data={moistureData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    dataKey="value"
                    cornerRadius={10}
                    background={{ fill: "hsl(160,8%,16%)" }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="-mt-10 text-center">
              <span className="text-3xl font-bold text-foreground">{data.moisture}%</span>
              <p className="text-xs text-muted-foreground">
                {data.moisture > 70 ? "Well Hydrated" : data.moisture > 40 ? "Adequate" : "Dry — Irrigate"}
              </p>
            </div>
          </div>
        </div>

        {/* Soil Composition */}
        <div className="glass rounded-2xl p-5">
          <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Soil Composition
          </h3>
          <div className="flex items-center gap-4">
            <div className="h-[160px] w-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={compositionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {compositionData.map((entry) => (
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
            <div className="flex flex-col gap-2">
              {compositionData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-foreground">{item.name}</span>
                  <span className="text-sm font-semibold text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Micronutrients + Historical Chart */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Micronutrients */}
        <div className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Micronutrients & Parameters
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {micronutrients.map((m) => {
              const trend = getTrend(m.value, parseFloat(m.ideal.replace(/[<>]/g, "").trim()) * 2)
              const TrendIcon = trend.icon
              return (
                <div key={m.label} className="flex items-center justify-between rounded-xl bg-muted/30 px-3 py-2.5">
                  <div>
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                    <p className="text-sm font-bold text-foreground">{m.value}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <TrendIcon className={`h-3.5 w-3.5 ${trend.color}`} />
                    <span className={`text-xs ${trend.color}`}>{trend.label}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Historical NPK Chart */}
        <div className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              NPK Trends (6 Months)
            </h3>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalNPK}>
                <defs>
                  <linearGradient id="nGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(152,60%,52%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(152,60%,52%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="pGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(185,55%,45%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(185,55%,45%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="kGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(140,50%,60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(140,50%,60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(160,8%,16%)" />
                <XAxis dataKey="month" stroke="hsl(150,6%,55%)" fontSize={12} />
                <YAxis stroke="hsl(150,6%,55%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(160,12%,8%)",
                    border: "1px solid hsl(160,8%,16%)",
                    borderRadius: "12px",
                    color: "hsl(150,10%,92%)",
                  }}
                />
                <Area type="monotone" dataKey="nitrogen" stroke="hsl(152,60%,52%)" fill="url(#nGrad)" strokeWidth={2} name="Nitrogen" />
                <Area type="monotone" dataKey="phosphorus" stroke="hsl(185,55%,45%)" fill="url(#pGrad)" strokeWidth={2} name="Phosphorus" />
                <Area type="monotone" dataKey="potassium" stroke="hsl(140,50%,60%)" fill="url(#kGrad)" strokeWidth={2} name="Potassium" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="glass rounded-2xl p-5">
        <div className="mb-4 flex items-center gap-2">
          <Leaf className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            AI Recommendations
          </h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              title: "Increase Phosphorus",
              desc: "Current P level is below optimal. Apply Single Super Phosphate (SSP) at 50 kg/acre to improve root development.",
            },
            {
              title: "Maintain Organic Matter",
              desc: "Add compost or green manure to increase organic carbon above 0.75%. Consider using Dhaincha or Sunhemp.",
            },
            {
              title: "pH is Optimal",
              desc: "Current pH of 6.5 is ideal for most crops. Continue current lime application schedule.",
            },
            {
              title: "Monitor Moisture",
              desc: "At 68%, moisture is adequate. Schedule next irrigation in 2-3 days based on weather forecast.",
            },
          ].map((rec) => (
            <div key={rec.title} className="rounded-xl bg-muted/30 p-4">
              <h4 className="text-sm font-semibold text-foreground">{rec.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{rec.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
