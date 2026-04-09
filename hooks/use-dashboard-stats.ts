"use client"

import { useState, useEffect } from "react"

export interface ScanEntry {
  name: string
  date: string
  status: string
  timestamp: number
  severity?: string
}

export interface DashboardStats {
  totalScans: number
  weeklyActivity: { day: string; scans: number; alerts: number }[]
  cropHealth: { name: string; value: number; color: string }[]
  recentAlerts: { crop: string; disease: string; severity: string; time: string }[]
}

function timeAgo(timestamp: number) {
  const diff = Date.now() - timestamp
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 60) return `${mins} min ago`
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`
  return `${days} day${days > 1 ? "s" : ""} ago`
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function useDashboardStats(): DashboardStats {
  const [stats, setStats] = useState<DashboardStats>({
    totalScans: 0,
    weeklyActivity: DAYS.slice(1).concat("Sun").map((day) => ({ day, scans: 0, alerts: 0 })),
    cropHealth: [
      { name: "Healthy", value: 68, color: "hsl(152,60%,52%)" },
      { name: "At Risk", value: 20, color: "hsl(40,80%,50%)" },
      { name: "Diseased", value: 12, color: "hsl(0,72%,51%)" },
    ],
    recentAlerts: [],
  })

  useEffect(() => {
    try {
      const raw = localStorage.getItem("agrosmart_scan_history")
      const scans: ScanEntry[] = raw ? JSON.parse(raw) : []

      if (scans.length === 0) return

      // Weekly activity — last 7 days
      const now = Date.now()
      const weeklyMap: Record<string, { scans: number; alerts: number }> = {}
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now - i * 86400000)
        weeklyMap[DAYS[d.getDay()]] = { scans: 0, alerts: 0 }
      }

      for (const scan of scans) {
        const d = new Date(scan.timestamp)
        const day = DAYS[d.getDay()]
        if (weeklyMap[day] !== undefined) {
          weeklyMap[day].scans++
          if (scan.status !== "Healthy") weeklyMap[day].alerts++
        }
      }

      // Crop health from all scans
      const total = scans.length
      const healthy = scans.filter((s) => s.status === "Healthy").length
      const diseased = scans.filter((s) => s.severity === "high").length
      const atRisk = total - healthy - diseased

      // Recent alerts — last 4 scans
      const recent = [...scans]
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 4)
        .map((s) => ({
          crop: s.name,
          disease: s.status === "Healthy" ? "Healthy — No Issues" : `${s.status} Detected`,
          severity: s.status === "Healthy" ? "healthy" : s.severity || "medium",
          time: timeAgo(s.timestamp),
        }))

      setStats({
        totalScans: total,
        weeklyActivity: Object.entries(weeklyMap).map(([day, v]) => ({ day, ...v })),
        cropHealth: [
          { name: "Healthy", value: total > 0 ? Math.round((healthy / total) * 100) : 68, color: "hsl(152,60%,52%)" },
          { name: "At Risk", value: total > 0 ? Math.round((atRisk / total) * 100) : 20, color: "hsl(40,80%,50%)" },
          { name: "Diseased", value: total > 0 ? Math.round((diseased / total) * 100) : 12, color: "hsl(0,72%,51%)" },
        ],
        recentAlerts: recent,
      })
    } catch {
      // keep defaults
    }
  }, [])

  return stats
}
