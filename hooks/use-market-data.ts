"use client"

import { useState, useEffect } from "react"

export interface Commodity {
  name: string
  market: string
  price: number
  change: number
  unit: string
  high52: number
  low52: number
}

export interface MarketData {
  commodities: Commodity[]
  lastUpdated: string
  isLive: boolean
}

// Fallback static data
const FALLBACK: Commodity[] = [
  { name: "Tomato", market: "Azadpur, Delhi", price: 3200, change: 8.5, unit: "₹/quintal", high52: 4500, low52: 1200 },
  { name: "Onion", market: "Lasalgaon, Nashik", price: 2100, change: -3.2, unit: "₹/quintal", high52: 3800, low52: 800 },
  { name: "Potato", market: "Agra, UP", price: 1450, change: 2.1, unit: "₹/quintal", high52: 2200, low52: 600 },
  { name: "Rice (Basmati)", market: "Karnal, Haryana", price: 8500, change: 1.8, unit: "₹/quintal", high52: 9200, low52: 6800 },
  { name: "Wheat", market: "Indore, MP", price: 2680, change: -0.5, unit: "₹/quintal", high52: 2850, low52: 2200 },
  { name: "Cotton", market: "Rajkot, Gujarat", price: 7200, change: 4.3, unit: "₹/quintal", high52: 8100, low52: 5400 },
  { name: "Soybean", market: "Indore, MP", price: 4850, change: -1.9, unit: "₹/quintal", high52: 5600, low52: 3800 },
  { name: "Maize", market: "Davangere, Karnataka", price: 2150, change: 3.7, unit: "₹/quintal", high52: 2400, low52: 1600 },
  { name: "Chilli (Dry)", market: "Guntur, AP", price: 18500, change: 12.4, unit: "₹/quintal", high52: 22000, low52: 11000 },
  { name: "Turmeric", market: "Nizamabad, Telangana", price: 14200, change: 6.8, unit: "₹/quintal", high52: 16000, low52: 8500 },
  { name: "Sugarcane", market: "Kolhapur, Maharashtra", price: 350, change: 0.0, unit: "₹/quintal", high52: 380, low52: 315 },
  { name: "Groundnut", market: "Junagadh, Gujarat", price: 5800, change: -2.5, unit: "₹/quintal", high52: 6500, low52: 4200 },
]

async function fetchFromDataGov(apiKey: string): Promise<Commodity[]> {
  const crops = ["Tomato", "Onion", "Potato", "Rice", "Wheat", "Cotton", "Maize", "Chilli"]
  const results: Commodity[] = []

  for (const crop of crops) {
    try {
      const res = await fetch(
        `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${apiKey}&format=json&filters[commodity]=${crop}&limit=1&sort[arrival_date]=desc`,
        { signal: AbortSignal.timeout(5000) }
      )
      if (!res.ok) continue
      const data = await res.json()
      const record = data?.records?.[0]
      if (!record) continue

      const modal = parseFloat(record.modal_price) || 0
      const min = parseFloat(record.min_price) || modal * 0.85
      const max = parseFloat(record.max_price) || modal * 1.15

      // Get yesterday's cached price for change calculation
      const cacheKey = `market_${crop}`
      const cached = parseFloat(localStorage.getItem(cacheKey) || "0")
      const change = cached > 0 ? parseFloat(((modal - cached) / cached * 100).toFixed(1)) : 0
      localStorage.setItem(cacheKey, String(modal))

      results.push({
        name: record.commodity,
        market: `${record.market}, ${record.state}`,
        price: modal,
        change,
        unit: "₹/quintal",
        high52: Math.round(max * 1.2),
        low52: Math.round(min * 0.8),
      })
    } catch { continue }
  }

  return results.length >= 4 ? results : []
}

async function fetchFromOpenAI(apiKey: string): Promise<Commodity[]> {
  const farm = (() => {
    try { return JSON.parse(localStorage.getItem("agrosmart_farm") || "{}") } catch { return {} }
  })()
  const location = `${farm.district || "Mandya"}, ${farm.state || "Karnataka"}`
  const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{
        role: "user",
        content: `Generate realistic current Indian mandi commodity prices for ${today} near ${location}. 
Return ONLY a JSON array of 10 commodities, no markdown:
[{"name":"Tomato","market":"Market Name, State","price":3200,"change":2.5,"unit":"₹/quintal","high52":4500,"low52":1200}]

Use realistic prices based on current Indian market conditions. Include: Tomato, Onion, Potato, Rice, Wheat, Cotton, Maize, Chilli, Turmeric, Groundnut.`,
      }],
      max_tokens: 800,
    }),
  })

  if (!res.ok) throw new Error("OpenAI failed")
  const data = await res.json()
  const text = data.choices?.[0]?.message?.content?.trim() || ""
  const cleaned = text.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim()
  return JSON.parse(cleaned)
}

export function useMarketData() {
  const [data, setData] = useState<MarketData>({
    commodities: FALLBACK,
    lastUpdated: "Static data",
    isLive: false,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const dataGovKey = process.env.NEXT_PUBLIC_DATAGOV_API_KEY
      const openAiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

      // Try data.gov.in first
      if (dataGovKey) {
        try {
          const commodities = await fetchFromDataGov(dataGovKey)
          if (commodities.length > 0) {
            setData({ commodities, lastUpdated: new Date().toLocaleTimeString(), isLive: true })
            setIsLoading(false)
            return
          }
        } catch {}
      }

      // Try OpenAI for AI-generated realistic prices
      if (openAiKey) {
        try {
          const commodities = await fetchFromOpenAI(openAiKey)
          if (commodities.length > 0) {
            setData({ commodities, lastUpdated: `AI-generated · ${new Date().toLocaleTimeString()}`, isLive: true })
            setIsLoading(false)
            return
          }
        } catch {}
      }

      // Fallback to static
      setData({ commodities: FALLBACK, lastUpdated: "Static data", isLive: false })
      setIsLoading(false)
    }

    load()
  }, [])

  return { ...data, isLoading }
}
