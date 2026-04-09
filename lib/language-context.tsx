"use client"

import React, { createContext, useContext, useState } from "react"
import { t, type Language } from "@/lib/translations"

interface LanguageContextType {
  lang: Language
  setLang: (l: Language) => void
  tr: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "english",
  setLang: () => {},
  tr: (k) => k,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const display = JSON.parse(localStorage.getItem("agrosmart_display") || "{}")
      return (display.language as Language) || "english"
    } catch {
      return "english"
    }
  })

  const setLang = (l: Language) => {
    setLangState(l)
    try {
      const display = JSON.parse(localStorage.getItem("agrosmart_display") || "{}")
      localStorage.setItem("agrosmart_display", JSON.stringify({ ...display, language: l }))
    } catch {}
  }

  const tr = (key: string) => t[lang]?.[key] ?? t.english[key] ?? key

  return (
    <LanguageContext.Provider value={{ lang, setLang, tr }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
