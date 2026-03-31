"use client"

import { CloudSun, FlaskConical, Sprout, TrendingUp, Settings } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const sectionMeta: Record<
  string,
  { icon: LucideIcon; title: string; description: string }
> = {
  weather: {
    icon: CloudSun,
    title: "Weather Forecast",
    description:
      "Hyperlocal 7-day weather predictions and real-time climate data for your farm",
  },
  soil: {
    icon: FlaskConical,
    title: "Soil Analysis",
    description:
      "NPK levels, pH balance, moisture content, and comprehensive soil health metrics",
  },
  fertilizer: {
    icon: Sprout,
    title: "Fertilizer Suggestion",
    description:
      "AI-optimized fertilizer recommendations based on your soil and crop data",
  },
  market: {
    icon: TrendingUp,
    title: "Market Insights",
    description:
      "Live commodity prices, demand forecasts, and market trend analysis across 500+ markets",
  },
  settings: {
    icon: Settings,
    title: "Settings",
    description:
      "Manage your farm profiles, notification preferences, and account settings",
  },
}

interface PlaceholderSectionProps {
  sectionId: string
}

export function PlaceholderSection({ sectionId }: PlaceholderSectionProps) {
  const meta = sectionMeta[sectionId]
  if (!meta) return null

  const Icon = meta.icon

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
        <Icon className="h-10 w-10 text-primary" />
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {meta.title}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {meta.description}
        </p>
      </div>
      <div className="glass rounded-2xl px-6 py-3">
        <p className="text-sm font-medium text-muted-foreground">
          Coming soon - This module is under development
        </p>
      </div>
    </div>
  )
}
