"use client"

import { CreditCard, Download, CheckCircle2, ShieldCheck, Zap, TrendingUp, History } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BillingPage() {
  const invoices = [
    { id: "INV-2026-003", date: "Mar 01, 2026", amount: "₹499", status: "Paid" },
    { id: "INV-2026-002", date: "Feb 01, 2026", amount: "₹499", status: "Paid" },
    { id: "INV-2026-001", date: "Jan 01, 2026", amount: "₹499", status: "Paid" },
  ]

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Billing & Plans</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your subscription and payment methods
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Current Plan & Payment */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Current Plan Card */}
          <div className="glass rounded-2xl p-6 relative overflow-hidden">
            {/* Background flourish */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-bold text-foreground">AgroSmart Pro</h2>
                  <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">Active</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your plan renews on <span className="text-foreground font-medium">April 01, 2026</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-foreground">₹499<span className="text-base font-normal text-muted-foreground">/mo</span></p>
              </div>
            </div>

            <div className="mt-8 border-t border-border/50 pt-6">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Included Features</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { icon: ShieldCheck, text: "Unlimited Disease Scans" },
                  { icon: Zap, text: "Real-time AI Analysis" },
                  { icon: TrendingUp, text: "Advanced Market Insights" },
                  { icon: History, text: "Unlimited Scan History" }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
                Change Plan
              </Button>
              <Button variant="outline" className="rounded-xl border-border/50 hover:bg-muted bg-transparent">
                Cancel Subscription
              </Button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="glass rounded-2xl p-6">
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
        </div>

        {/* Right Column - Invoices */}
        <div className="glass rounded-2xl p-6 flex flex-col h-fit">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Billing History</h2>
          
          <div className="flex flex-col gap-4 flex-1">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/40 transition-colors border border-border/20">
                <div>
                  <p className="text-sm font-medium text-foreground">{invoice.amount}</p>
                  <p className="text-xs text-muted-foreground">{invoice.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 rounded">{invoice.status}</span>
                  <button type="button" className="text-muted-foreground hover:text-foreground p-1">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="ghost" className="mt-4 w-full rounded-xl text-primary hover:text-primary hover:bg-primary/10">
            View All Invoices
          </Button>
        </div>
      </div>
    </div>
  )
}
