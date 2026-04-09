"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"

export interface User {
  id?: string
  name: string
  email: string
  phone: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

interface StoredUser {
  name: string
  email: string
  phone: string
  password: string
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Configure Supabase session check and local fallback
  useEffect(() => {
    // 1. Try resolving session via local storage first (for Demo Mode & Local development before Supabase DB setup)
    try {
      const storedSession = localStorage.getItem("agrosmart_session")
      if (storedSession) {
        setUser(JSON.parse(storedSession))
        setIsLoading(false)
        return
      }
    } catch {
      // ignore
    }

    // 2. If Supabase is configured, use its Auth listener
    if (supabase) {
      const handleSession = (session: any) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata?.name || "Farmer",
            phone: session.user.user_metadata?.phone || "",
          })
        } else {
          setUser(null)
        }
      }

      // Initial check with a 3s timeout so a paused/slow Supabase project doesn't hang the app
      const sessionTimeout = setTimeout(() => {
        setIsLoading(false)
      }, 3000)

      supabase.auth.getSession().then(({ data: { session } }) => {
        clearTimeout(sessionTimeout)
        if (session) handleSession(session)
        setIsLoading(false)
      }).catch(() => {
        clearTimeout(sessionTimeout)
        setIsLoading(false)
      })

      // Listener for ongoing auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        handleSession(session)
        setIsLoading(false)
      })

      return () => {
        clearTimeout(sessionTimeout)
        subscription.unsubscribe()
      }
    } else {
      // 3. If Supabase is not configured and local auth has no session, we just finish loading
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    // Demo Account bypass
    if (email === "demo@agrosmart.in" && password === "demo123") {
      const demoUser: User = { name: "Ravi Sharma", email: "demo@agrosmart.in", phone: "+91 98765 43210" }
      localStorage.setItem("agrosmart_session", JSON.stringify(demoUser))
      setUser(demoUser)
      return { success: true }
    }

    // If Supabase is active, use it
    if (supabase) {
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
          // Email not confirmed — fall through to local storage fallback
          if (error.message.toLowerCase().includes("email not confirmed")) {
            const usersRaw = localStorage.getItem("agrosmart_users")
            const users: StoredUser[] = usersRaw ? JSON.parse(usersRaw) : []
            const found = users.find(
              (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
            )
            if (found) {
              const sessionUser: User = { name: found.name, email: found.email, phone: found.phone }
              localStorage.setItem("agrosmart_session", JSON.stringify(sessionUser))
              setUser(sessionUser)
              return { success: true }
            }
          }
          return { success: false, error: error.message }
        }
        return { success: true }
      } catch (err: any) {
        return { success: false, error: err.message || "Failed to log in" }
      }
    }

    // Fallback local system logic
    try {
      const usersRaw = localStorage.getItem("agrosmart_users")
      const users: StoredUser[] = usersRaw ? JSON.parse(usersRaw) : []

      const found = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      )

      if (found) {
        const sessionUser: User = { name: found.name, email: found.email, phone: found.phone }
        localStorage.setItem("agrosmart_session", JSON.stringify(sessionUser))
        setUser(sessionUser)
        return { success: true }
      }

      return { success: false, error: "Invalid email or password" }
    } catch {
      return { success: false, error: "Something went wrong" }
    }
  }, [])

  const signup = useCallback(async (name: string, email: string, phone: string, password: string) => {
    // If Supabase is active, use it
    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name, phone },
          },
        })
        if (error) return { success: false, error: error.message }

        // Save to localStorage as fallback for unconfirmed users
        try {
          const usersRaw = localStorage.getItem("agrosmart_users")
          const users: StoredUser[] = usersRaw ? JSON.parse(usersRaw) : []
          if (!users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
            users.push({ name, email, phone, password })
            localStorage.setItem("agrosmart_users", JSON.stringify(users))
          }
        } catch {}

        // If email confirmation is disabled, session is returned immediately — log user in
        if (data.session) {
          const sessionUser: User = {
            id: data.session.user.id,
            email: data.session.user.email || "",
            name: data.session.user.user_metadata?.name || name,
            phone: data.session.user.user_metadata?.phone || phone,
          }
          localStorage.setItem("agrosmart_session", JSON.stringify(sessionUser))
          setUser(sessionUser)
          return { success: true }
        }

        // Email confirmation required
        return {
          success: false,
          error: "Account created! Please check your email to confirm your account, then log in.",
        }
      } catch (err: any) {
        return { success: false, error: err.message || "Failed to create account" }
      }
    }

    // Fallback to local authentication logic
    try {
      const usersRaw = localStorage.getItem("agrosmart_users")
      const users: StoredUser[] = usersRaw ? JSON.parse(usersRaw) : []

      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, error: "An account with this email already exists" }
      }

      users.push({ name, email, phone, password })
      localStorage.setItem("agrosmart_users", JSON.stringify(users))

      const sessionUser: User = { name, email, phone }
      localStorage.setItem("agrosmart_session", JSON.stringify(sessionUser))
      setUser(sessionUser)

      return { success: true }
    } catch {
      return { success: false, error: "Something went wrong" }
    }
  }, [])

  const logout = useCallback(async () => {
    // Clear both remote and local
    if (supabase) {
      try {
        await supabase.auth.signOut()
      } catch {
        // ignore
      }
    }
    localStorage.removeItem("agrosmart_session")
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
