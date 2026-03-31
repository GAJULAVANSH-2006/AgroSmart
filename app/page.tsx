"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-context"
import { LoginPage } from "@/components/login-page"
import { SignupPage } from "@/components/signup-page"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { DashboardContent } from "@/components/dashboard-content"
import { DiseaseDetection } from "@/components/disease-detection"
import { WeatherForecast } from "@/components/weather-forecast"
import { SoilAnalysis } from "@/components/soil-analysis"
import { FertilizerSuggestion } from "@/components/fertilizer-suggestion"
import { MarketInsights } from "@/components/market-insights"
import { SettingsPage } from "@/components/settings-page"
import { BillingPage } from "@/components/billing-page"
import { HelpCenterPage } from "@/components/help-center-page"

function AppContent() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />

      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300",
          sidebarCollapsed ? "ml-[68px]" : "ml-[240px]"
        )}
      >
        <AppHeader onNavigate={setActiveSection} />

        <main className="flex flex-1 flex-col overflow-y-auto">
          {activeSection === "dashboard" && (
            <DashboardContent onNavigate={setActiveSection} />
          )}
          {activeSection === "disease" && <DiseaseDetection />}
          {activeSection === "weather" && <WeatherForecast />}
          {activeSection === "soil" && <SoilAnalysis />}
          {activeSection === "fertilizer" && <FertilizerSuggestion />}
          {activeSection === "market" && <MarketInsights />}
          {activeSection === "settings" && <SettingsPage />}
          {activeSection === "billing" && <BillingPage />}
          {activeSection === "help" && <HelpCenterPage />}
        </main>
      </div>
    </div>
  )
}

export default function Home() {
  const { user, isLoading, login, signup } = useAuth()
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")

  // Show loading spinner while checking session
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-muted border-t-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Not logged in — show login or signup
  if (!user) {
    if (authMode === "signup") {
      return (
        <SignupPage
          onSignup={signup}
          onSwitchToLogin={() => setAuthMode("login")}
        />
      )
    }
    return (
      <LoginPage
        onLogin={login}
        onSwitchToSignup={() => setAuthMode("signup")}
      />
    )
  }

  // Logged in — show app
  return <AppContent />
}
