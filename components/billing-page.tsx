"use client"

import { useState } from "react"
import {
  CreditCard, Download, CheckCircle2, XCircle, Zap,
  Crown, Leaf, ShieldCheck, TrendingUp, History,
  CloudSun, FlaskConical, Sprout, Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type Plan = "free" | "pro"

const FREE_FEATURES = [
  { icon: ShieldCheck, text: "5 disease scans per month", included: true },
  { icon: CloudSun, text: "Basic weather forecast (3-day)", included: true },
  { icon: FlaskConical, text: "Soil analysis (1 field)", included: true },
  { icon: Sprout, text: "Basic fertilizer suggestions", included: true },
  { icon: TrendingUp, text: "Market prices (top 5 crops)", included: true },
  { icon: History, text: "Scan history (last 7 days)", included: true },
  { icon: Zap, text: "Real-time AI analysis", included: false },
  { icon: Crown, text: "Unlimited disease scans", included: false },
  { icon: Star, text: "Advanced market insights", included: false },
  { icon: Leaf, text: "Multi-field soil analysis", included: false },
]

const PRO_FEATURES = [
  { icon: ShieldCheck, text: "Unlimited disease scans", included: true },
  { icon: CloudSun, text: "Full 7-day weather forecast", included: true },
  { icon: FlaskConical, text: "Multi-field soil analysis", included: true },
  { icon: Sprout, text: "AI-optimized fertilizer plans", included: true },
  { icon: TrendingUp, text: "Advanced market insights (500+ mandis)", included: true },
  { icon: History, text: "Unlimited scan history", included: true },
  { icon: Zap, text: "Real-time AI analysis", included: true },
  { icon: Crown, text: "Priority support", included: true },
  { icon: Star, text: "Export data as CSV", included: true },
  { icon: Leaf, text: "Farm advisory & alerts", included: true },
]

const invoices = [
  { id: "INV-2026-003", date: "Mar 01, 2026", amount: "₹499", status: "Paid" },
  { id: "INV-2026-002", date: "Feb 01, 2026", amount: "₹499", status: "Paid" },
  { id: "INV-2026-001", date: "Jan 01, 2026", amount: "₹499", status: "Paid" },
]

export function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState<Plan>(() => {
    try { return (localStorage.getItem("agrosmart_plan") as Plan) || "free" } catch { return "free" }
  })
  const [showConfirm, setShowConfirm] = useState(false)
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")

  const handleUpgrade = () => {
    setCurrentPlan("pro")
    try { localStorage.setItem("agrosmart_plan", "pro") } catch {}
    setShowConfirm(false)
  }

  const handleDowngrade = () => {
    setCurrentPlan("free")
    try { localStorage.setItem("agrosmart_plan", "free") } catch {}
  }

  const monthlyPrice = 499
  const yearlyPrice = Math.round(monthlyPrice * 12 * 0.8) // 20% off

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Billing & Plans</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {currentPlan === "pro" ? "You're on the Pro plan" : "Upgrade to unlock all features"}
        </p>
      </div>

      {/* Current Plan Banner */}
      <div className={`rounded-2xl p-4 flex items-center justify-between border ${
        currentPlan === "pro"
          ? "bg-primary/10 border-primary/30"
          : "bg-muted/30 border-border/50"
      }`}>
        <div className="flex items-center gap-3">
          {currentPlan === "pro"
            ? <Crown className="h-5 w-5 text-primary" />
            : <Leaf className="h-5 w-5 text-muted-foreground" />}
          <div>
            <p className="text-sm font-semibold text-foreground">
              {currentPlan === "pro" ? "AgroSmart Pro" : "AgroSmart Free"}
            </p>
            <p className="text-xs text-muted-foreground">
              {currentPlan === "pro" ? "Renews April 01, 2026" : "Limited features"}
            </p>
          </div>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
          currentPlan === "pro" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
        }`}>
          {currentPlan === "pro" ? "Active" : "Free"}
        </span>
      </div>

      {/* Plan Comparison */}
      <div className="flex flex-col gap-4">
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3">
          <span className={`text-sm font-medium ${billing === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
          <button
            type="button"
            onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
            className={`relative h-6 w-11 rounded-full transition-colors ${billing === "yearly" ? "bg-primary" : "bg-muted"}`}
          >
            <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${billing === "yearly" ? "translate-x-5" : "translate-x-0"}`} />
          </button>
          <span className={`text-sm font-medium ${billing === "yearly" ? "text-foreground" : "text-muted-foreground"}`}>
            Yearly <span className="text-xs text-primary font-semibold">Save 20%</span>
          </span>
        </div>

        {/* Plan Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Free Plan */}
          <div className={`glass rounded-2xl p-6 flex flex-col gap-5 border-2 transition-all ${
            currentPlan === "free" ? "border-primary/40" : "border-border/30"
          }`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-lg font-bold text-foreground">Free</h2>
                  {currentPlan === "free" && (
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary">Current</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Get started with basic features</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-foreground">₹0</p>
                <p className="text-xs text-muted-foreground">forever</p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {FREE_FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  {f.included
                    ? <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    : <XCircle className="h-4 w-4 shrink-0 text-muted-foreground/40" />}
                  <span className={`text-sm ${f.included ? "text-foreground" : "text-muted-foreground/50 line-through"}`}>
                    {f.text}
                  </span>
                </div>
              ))}
            </div>

            {currentPlan === "pro" ? (
              <Button
                variant="outline"
                className="mt-auto rounded-xl border-border/50 bg-transparent hover:bg-muted text-muted-foreground"
                onClick={handleDowngrade}
              >
                Downgrade to Free
              </Button>
            ) : (
              <Button disabled className="mt-auto rounded-xl bg-muted text-muted-foreground cursor-default">
                Current Plan
              </Button>
            )}
          </div>

          {/* Pro Plan */}
          <div className={`relative rounded-2xl p-6 flex flex-col gap-5 border-2 overflow-hidden transition-all ${
            currentPlan === "pro" ? "border-primary bg-primary/5" : "border-primary/60 bg-gradient-to-br from-primary/5 to-card"
          }`}>
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between relative">
              <div>
                <div className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold text-foreground">Pro</h2>
                  {currentPlan === "pro" && (
                    <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-semibold text-primary">Active</span>
                  )}
                  <span className="rounded-full bg-[hsl(40,80%,50%)]/15 px-2 py-0.5 text-xs font-semibold text-[hsl(40,80%,50%)]">Popular</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Everything you need to farm smarter</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-foreground">
                  ₹{billing === "monthly" ? monthlyPrice : Math.round(yearlyPrice / 12)}
                </p>
                <p className="text-xs text-muted-foreground">/month</p>
                {billing === "yearly" && (
                  <p className="text-xs text-primary">₹{yearlyPrice}/year</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2.5 relative">
              {PRO_FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{f.text}</span>
                </div>
              ))}
            </div>

            {currentPlan === "free" ? (
              <Button
                className="mt-auto rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 gap-2"
                onClick={() => setShowConfirm(true)}
              >
                <Crown className="h-4 w-4" />
                Upgrade to Pro
              </Button>
            ) : (
              <Button disabled className="mt-auto rounded-xl bg-primary/20 text-primary cursor-default gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Current Plan
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Upgrade Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="glass rounded-2xl p-8 w-full max-w-md shadow-2xl border border-primary/30">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15">
                <Crown className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Upgrade to Pro</h2>
              <p className="text-sm text-muted-foreground">
                You'll be charged <span className="font-semibold text-foreground">
                  ₹{billing === "monthly" ? `${monthlyPrice}/month` : `${yearlyPrice}/year`}
                </span>. Cancel anytime.
              </p>
              <div className="flex w-full gap-3 mt-2">
                <Button
                  variant="outline"
                  className="flex-1 rounded-xl border-border/50 bg-transparent"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleUpgrade}
                >
                  Confirm Upgrade
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment + Invoices — only show for Pro */}
      {currentPlan === "pro" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="glass rounded-2xl p-6 lg:col-span-2">
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Payment Method</h2>
            <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-background border border-border/50 shadow-sm">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">HDFC Bank Credit Card</p>
                  <p className="text-xs text-muted-foreground">Ending in •••• 4242</p>
                </div>
              </div>
              <p className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">Default</p>
            </div>
            <Button variant="outline" className="mt-4 w-full rounded-xl border-border/50 hover:bg-muted bg-transparent gap-2">
              <CreditCard className="h-4 w-4" />
              Add Payment Method
            </Button>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Billing History</h2>
            <div className="flex flex-col gap-3">
              {invoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/40 transition-colors border border-border/20">
                  <div>
                    <p className="text-sm font-medium text-foreground">{inv.amount}</p>
                    <p className="text-xs text-muted-foreground">{inv.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 rounded">{inv.status}</span>
                    <button type="button" className="text-muted-foreground hover:text-foreground p-1">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
