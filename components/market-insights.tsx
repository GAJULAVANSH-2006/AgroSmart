"use client"

import { useState } from "react"
import {
  TrendingUp, TrendingDown, IndianRupee, ArrowUpRight,
  ArrowDownRight, Search, BarChart3, Star, RefreshCw,
} from "lucide-react"
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts"
import { useMarketData } from "@/hooks/use-market-data"

export function MarketInsights() {
  const { commodities, lastUpdated, isLive, isLoading } = useMarketData()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "price" | "change">("change")
  const [selectedPeriod, setSelectedPeriod] = useState<"30d" | "90d" | "180d">("180d")

  const filtered = commodities
    .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "price") return b.price - a.price
      return Math.abs(b.change) - Math.abs(a.change)
    })

  const topGainers = [...commodities].filter(c => c.change > 0).sort((a, b) => b.change - a.change).slice(0, 4)
  const topLosers = [...commodities].filter(c => c.change < 0).sort((a, b) => a.change - b.change).slice(0, 4)

  // Build price history from commodities for chart
  const priceHistory = commodities.slice(0, 4).map((c, i) => ({
    month: ["Oct","Nov","Dec","Jan","Feb","Mar"][i] || "Mar",
    [c.name.split(" ")[0].toLowerCase()]: c.price,
  }))

  const demandForecast = commodities.slice(0, 6).map(c => ({
    crop: c.name.split(" ")[0],
    current: Math.min(95, Math.max(50, 75 + c.change * 2)),
    forecast: Math.min(95, Math.max(50, 75 + c.change * 3)),
  }))

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Market Insights</h1>
        <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          {isLoading ? (
            <span className="flex items-center gap-1.5"><RefreshCw className="h-3.5 w-3.5 animate-spin" /> Fetching live prices...</span>
          ) : (
            <>
              <span className={`h-2 w-2 rounded-full ${isLive ? "bg-green-500" : "bg-muted-foreground"}`} />
              {isLive ? `Live prices · Updated ${lastUpdated}` : "Static data · Add API key for live prices"}
            </>
          )}
        </p>
      </div>

      {/* Price Ticker */}
      <div className="glass overflow-hidden rounded-2xl">
        <div className="flex animate-marquee items-center gap-6 px-4 py-3">
          {[...commodities, ...commodities].map((c, i) => (
            <span key={`${c.name}-${i}`} className="inline-flex shrink-0 items-center gap-2 text-sm whitespace-nowrap">
              <span className="font-medium text-foreground">{c.name}</span>
              <span className="font-bold text-foreground">₹{c.price.toLocaleString("en-IN")}</span>
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${
                c.change > 0 ? "text-primary" : c.change < 0 ? "text-destructive" : "text-muted-foreground"
              }`}>
                {c.change > 0 ? <ArrowUpRight className="h-3 w-3" /> : c.change < 0 ? <ArrowDownRight className="h-3 w-3" /> : null}
                {c.change > 0 ? "+" : ""}{c.change}%
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Gainers + Losers */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Top Gainers */}
        <div className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Top Gainers</h3>
          </div>
          <div className="flex flex-col gap-2">
            {topGainers.map(c => (
              <div key={c.name} className="flex items-center justify-between rounded-xl bg-primary/5 px-4 py-3 border border-primary/10">
                <div>
                  <p className="text-sm font-semibold text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.market}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">₹{c.price.toLocaleString("en-IN")}</p>
                  <p className="flex items-center justify-end gap-0.5 text-xs font-semibold text-primary">
                    <ArrowUpRight className="h-3 w-3" />+{c.change}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-destructive" />
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Top Losers</h3>
          </div>
          <div className="flex flex-col gap-2">
            {topLosers.map(c => (
              <div key={c.name} className="flex items-center justify-between rounded-xl bg-destructive/5 px-4 py-3 border border-destructive/10">
                <div>
                  <p className="text-sm font-semibold text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.market}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">₹{c.price.toLocaleString("en-IN")}</p>
                  <p className="flex items-center justify-end gap-0.5 text-xs font-semibold text-destructive">
                    <ArrowDownRight className="h-3 w-3" />{c.change}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Price Trend Chart */}
      <div className="glass rounded-2xl p-5">
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Current Price Overview (₹/quintal)
          </h3>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={commodities.slice(0, 8).map(c => ({ name: c.name.split(" ")[0], price: c.price }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(160,8%,16%)" />
              <XAxis dataKey="name" stroke="hsl(150,6%,55%)" fontSize={11} />
              <YAxis stroke="hsl(150,6%,55%)" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(160,12%,8%)", border: "1px solid hsl(160,8%,16%)", borderRadius: "12px", color: "hsl(150,10%,92%)" }} />
              <Bar dataKey="price" fill="hsl(152,60%,52%)" radius={[4, 4, 0, 0]} name="Price (₹/quintal)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Search + Table */}
      <div className="glass rounded-2xl p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            All Commodities
          </h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search crops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 rounded-lg border border-border/50 bg-muted/30 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
              />
            </div>
            <div className="flex gap-1 rounded-lg bg-muted/30 p-0.5">
              {([["name", "A-Z"], ["price", "Price"], ["change", "Change"]] as const).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSortBy(key as "name" | "price" | "change")}
                  className={`rounded-md px-2.5 py-1.5 text-[10px] font-medium transition-colors ${
                    sortBy === key
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Commodity</th>
                <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Market</th>
                <th className="pb-3 text-right text-xs font-medium text-muted-foreground">Price</th>
                <th className="pb-3 text-right text-xs font-medium text-muted-foreground">Change</th>
                <th className="hidden pb-3 text-right text-xs font-medium text-muted-foreground sm:table-cell">52W High</th>
                <th className="hidden pb-3 text-right text-xs font-medium text-muted-foreground sm:table-cell">52W Low</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.name} className="border-b border-border/10 transition-colors hover:bg-muted/20">
                  <td className="py-3 text-sm font-semibold text-foreground">{c.name}</td>
                  <td className="py-3 text-xs text-muted-foreground">{c.market}</td>
                  <td className="py-3 text-right text-sm font-bold text-foreground">₹{c.price.toLocaleString("en-IN")}</td>
                  <td className="py-3 text-right">
                    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                      c.change > 0 ? "text-primary" : c.change < 0 ? "text-destructive" : "text-muted-foreground"
                    }`}>
                      {c.change > 0 ? <ArrowUpRight className="h-3 w-3" /> : c.change < 0 ? <ArrowDownRight className="h-3 w-3" /> : null}
                      {c.change > 0 ? "+" : ""}{c.change}%
                    </span>
                  </td>
                  <td className="hidden py-3 text-right text-xs text-muted-foreground sm:table-cell">₹{c.high52.toLocaleString("en-IN")}</td>
                  <td className="hidden py-3 text-right text-xs text-muted-foreground sm:table-cell">₹{c.low52.toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Demand Forecast */}
      <div className="glass rounded-2xl p-5">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Demand Forecast — Next Quarter
          </h3>
        </div>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandForecast} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(160,8%,16%)" />
              <XAxis type="number" stroke="hsl(150,6%,55%)" fontSize={12} domain={[0, 100]} />
              <YAxis dataKey="crop" type="category" stroke="hsl(150,6%,55%)" fontSize={12} width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(160,12%,8%)",
                  border: "1px solid hsl(160,8%,16%)",
                  borderRadius: "12px",
                  color: "hsl(150,10%,92%)",
                }}
              />
              <Legend />
              <Bar dataKey="current" fill="hsl(185,55%,45%)" radius={[0, 4, 4, 0]} name="Current Demand %" />
              <Bar dataKey="forecast" fill="hsl(152,60%,52%)" radius={[0, 4, 4, 0]} name="Forecast %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Selling Advisory */}
      <div className="glass rounded-2xl p-5">
        <div className="mb-4 flex items-center gap-2">
          <Star className="h-4 w-4 text-[hsl(40,80%,50%)]" />
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            AI Selling Recommendations
          </h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { crop: "Tomato", advice: "Hold for 1-2 weeks", reason: "Prices trending up due to supply shortage. Expected to peak at ₹3,800-4,000/quintal.", color: "text-primary" },
            { crop: "Onion", advice: "Sell Now", reason: "Prices may drop further as new harvest arrives. Current price is above 3-month average.", color: "text-destructive" },
            { crop: "Chilli (Dry)", advice: "Strong Hold", reason: "Export demand surging. Prices expected to cross ₹20,000/quintal in next month.", color: "text-primary" },
            { crop: "Wheat", advice: "Hold for MSP", reason: "Government procurement season starting. MSP at ₹2,275/quintal guaranteed.", color: "text-[hsl(40,80%,50%)]" },
            { crop: "Cotton", advice: "Sell in batches", reason: "Good prices currently. Sell 50% now, hold 50% for potential international demand spike.", color: "text-accent" },
            { crop: "Rice (Basmati)", advice: "Export opportunity", reason: "International prices are strong. Consider connecting with export mandis for premium rates.", color: "text-primary" },
          ].map(item => (
            <div key={item.crop} className="rounded-xl bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground">{item.crop}</h4>
                <span className={`text-xs font-bold ${item.color}`}>{item.advice}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
