"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, X, Sparkles, User, Loader2 } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

function getFarmContext() {
  try {
    const farm = JSON.parse(localStorage.getItem("agrosmart_farm") || "{}")
    const fields = JSON.parse(localStorage.getItem("agrosmart_fields") || "[]")
    const session = JSON.parse(localStorage.getItem("agrosmart_session") || "{}")
    return `
Farmer: ${session.name || "Farmer"}
Location: ${farm.district || "Mandya"}, ${farm.state || "Karnataka"}, ${farm.country || "India"}
Farm: ${farm.name || "Farm"}, ${farm.area || "6.7"} ${farm.areaUnit || "acres"}
Crops: ${farm.crops || "Rice, Tomato"}
Soil Type: ${farm.soilType || "Red Laterite"}
Fields: ${fields.map((f: any) => `${f.name} (${f.crop}, ${f.area} acres)`).join(", ") || "Not specified"}
    `.trim()
  } catch {
    return "Indian farmer, Karnataka region"
  }
}

const SUGGESTIONS = [
  "What crops should I grow this season?",
  "How to improve my soil health?",
  "Best fertilizer for rice?",
]

export function FarmAdvisor() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Namaste! I'm your AI Farm Advisor. Ask me anything about crops, soil, fertilizers, pest control, or market timing.",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const sendMessage = async (text?: string) => {
    const userText = text || input.trim()
    if (!userText || loading) return

    setInput("")
    const newMessages: Message[] = [...messages, { role: "user", content: userText }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
      if (!apiKey) throw new Error("No API key configured")

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an expert AI agricultural advisor for Indian farmers. Give practical, actionable advice. Keep responses concise (3-5 sentences). Use simple language.

Farmer Profile:
${getFarmContext()}`,
            },
            ...newMessages.map(m => ({ role: m.role, content: m.content })),
          ],
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error?.message || `Error ${res.status}`)
      }

      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || "Sorry, no response received."
      setMessages([...newMessages, { role: "assistant", content: reply }])
    } catch (err: any) {
      setMessages([...newMessages, {
        role: "assistant",
        content: `⚠️ ${err.message || "Something went wrong. Please try again."}`,
      }])
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all hover:scale-105"
        >
          <Bot className="h-5 w-5" />
          AI Advisor
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-[9999] flex flex-col rounded-2xl border border-border/50 bg-card shadow-2xl overflow-hidden"
          style={{ width: "400px", height: "560px" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/50 bg-primary/10 px-4 py-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">AI Farm Advisor</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block" />
                  Powered by GPT-4o
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {/* Avatar */}
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  msg.role === "assistant" ? "bg-primary/15" : "bg-muted"
                }`}>
                  {msg.role === "assistant"
                    ? <Sparkles className="h-4 w-4 text-primary" />
                    : <User className="h-4 w-4 text-muted-foreground" />}
                </div>

                {/* Bubble */}
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm max-w-[75%]"
                    : "bg-muted/60 text-foreground rounded-tl-sm max-w-[80%]"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading */}
            {loading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-muted/60 px-4 py-3 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => sendMessage(s)}
                  className="rounded-full border border-border/50 bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-border/50 p-3 shrink-0">
            <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/30 px-4 py-2.5 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Ask anything about farming..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
