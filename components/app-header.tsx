"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Bell, ChevronDown, X, CloudSun, ScanSearch, TrendingUp, AlertTriangle, CheckCheck, LogOut } from "lucide-react"
import { useAuth } from "@/components/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const initialNotifications = [
  // ... notifications truncated for brevity
  // just keeping the top ones as they were
  {
    id: 1,
    icon: AlertTriangle,
    title: "Heavy Rain Alert",
    description: "25-35mm rainfall expected Wednesday afternoon in Mandya district.",
    time: "10 min ago",
    read: false,
    color: "text-[hsl(40,80%,50%)]",
    bgColor: "bg-[hsl(40,80%,50%)]/10",
  },
  {
    id: 2,
    icon: ScanSearch,
    title: "Disease Detected",
    description: "Late Blight detected in Tomato — Field C with 94.7% confidence.",
    time: "2 hours ago",
    read: false,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    id: 3,
    icon: TrendingUp,
    title: "Price Alert: Tomato ↑8.5%",
    description: "Tomato prices surged to ₹3,200/quintal at Azadpur Mandi.",
    time: "5 hours ago",
    read: false,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 4,
    icon: CloudSun,
    title: "UV Index High Tomorrow",
    description: "UV index will reach 8+. Protect nursery seedlings with shade nets.",
    time: "1 day ago",
    read: true,
    color: "text-[hsl(40,80%,50%)]",
    bgColor: "bg-[hsl(40,80%,50%)]/10",
  },
  {
    id: 5,
    icon: ScanSearch,
    title: "Scan Complete: Rice Field A",
    description: "No disease detected. Crop appears healthy with 97.1% confidence.",
    time: "1 day ago",
    read: true,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

interface AppHeaderProps {
  onNavigate?: (section: string) => void
}

export function AppHeader({ onNavigate }: AppHeaderProps) {
  const { user, logout } = useAuth()
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)
  const notifRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    if (notifOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [notifOpen])

  return (
    <header className="flex h-16 items-center justify-between border-b border-border/50 bg-card/40 px-6 backdrop-blur-xl">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search crops, diseases, insights..."
          className="h-10 w-full rounded-xl border border-border/50 bg-muted/50 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notification */}
        <div className="relative" ref={notifRef}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {unreadCount}
              </span>
            )}
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Notification Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-[380px] overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/30 px-4 py-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllRead}
                      className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                    >
                      <CheckCheck className="h-3.5 w-3.5" />
                      Mark all read
                    </button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setNotifOpen(false)}
                    className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Notification List */}
              <div className="max-h-[400px] overflow-y-auto">
                {notifications.map((notif) => {
                  const Icon = notif.icon
                  return (
                    <button
                      key={notif.id}
                      type="button"
                      onClick={() => markRead(notif.id)}
                      className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/30 ${
                        !notif.read ? "bg-primary/[0.03]" : ""
                      }`}
                    >
                      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${notif.bgColor}`}>
                        <Icon className={`h-4 w-4 ${notif.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground">{notif.title}</p>
                          {!notif.read && (
                            <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                          )}
                        </div>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                          {notif.description}
                        </p>
                        <p className="mt-1 text-[10px] text-muted-foreground/70">{notif.time}</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="border-t border-border/30 px-4 py-2.5">
                <button
                  type="button"
                  className="w-full rounded-lg py-1.5 text-center text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                >
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 rounded-xl px-2 hover:bg-muted/50"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
                  {user ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "RS"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start md:flex">
                <span className="text-sm font-medium text-foreground">{user?.name || "Guest"}</span>
                <span className="text-xs text-muted-foreground">
                  {(() => { try { return localStorage.getItem("agrosmart_plan") === "pro" ? "Pro Plan" : "Free Plan" } catch { return "Free Plan" } })()}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-card border-border">
            <DropdownMenuItem className="text-foreground focus:bg-muted focus:text-foreground hover:bg-muted hover:text-foreground cursor-pointer" onClick={() => onNavigate?.("settings")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-foreground focus:bg-muted focus:text-foreground hover:bg-muted hover:text-foreground cursor-pointer" onClick={() => onNavigate?.("billing")}>
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem className="text-foreground focus:bg-muted focus:text-foreground hover:bg-muted hover:text-foreground cursor-pointer" onClick={() => onNavigate?.("help")}>
              Help Center
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="text-destructive focus:bg-muted focus:text-destructive hover:bg-muted hover:text-destructive cursor-pointer" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
