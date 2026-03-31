"use client"

import { cn } from "@/lib/utils"
import {
  X,
  AlertTriangle,
  Shield,
  Sparkles,
  Activity,
  Pill,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"

export interface AnalysisResult {
  diseaseName: string
  confidence: number
  description: string
  treatment: string[]
  severity: "low" | "medium" | "high"
  preventionTips: string[]
}

interface AiResultPanelProps {
  result: AnalysisResult | null
  isAnalyzing: boolean
  isOpen: boolean
  onClose: () => void
}

export function AiResultPanel({
  result,
  isAnalyzing,
  isOpen,
  onClose,
}: AiResultPanelProps) {
  return (
    <div
      className={cn(
        "fixed right-0 top-0 z-50 flex h-screen w-full flex-col border-l border-border/50 bg-card/95 backdrop-blur-2xl transition-transform duration-500 ease-out md:w-[420px]",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Panel Header */}
      <div className="flex h-16 items-center justify-between border-b border-border/50 px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">AI Analysis</h2>
            <p className="text-xs text-muted-foreground">Powered by AgroSmart AI</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close AI panel</span>
        </Button>
      </div>

      {/* Panel Content */}
      <ScrollArea className="flex-1">
        <div className="p-5">
          {isAnalyzing && (
            <div className="flex flex-col items-center gap-6 py-16">
              <div className="relative">
                <div className="h-16 w-16 animate-spin rounded-full border-[3px] border-muted border-t-primary" />
                <Sparkles className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Analyzing your crop image...</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Our AI is examining the image for diseases
                </p>
              </div>
            </div>
          )}

          {!isAnalyzing && result && (
            <div className="flex flex-col gap-5">
              {/* Disease Name + Severity */}
              <div className="glass rounded-2xl p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Detected Disease
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-foreground">
                      {result.diseaseName}
                    </h3>
                  </div>
                  <span
                    className={cn(
                      "mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
                      result.severity === "high" &&
                        "bg-destructive/15 text-destructive",
                      result.severity === "medium" &&
                        "bg-[hsl(40,80%,50%)]/15 text-[hsl(40,80%,50%)]",
                      result.severity === "low" &&
                        "bg-primary/15 text-primary"
                    )}
                  >
                    <AlertTriangle className="h-3 w-3" />
                    {result.severity === "high"
                      ? "High Severity"
                      : result.severity === "medium"
                      ? "Medium Severity"
                      : "Low Severity"}
                  </span>
                </div>
              </div>

              {/* Confidence Score */}
              <div className="glass rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-accent" />
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Confidence Score
                  </p>
                </div>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    {result.confidence}%
                  </span>
                  <span className="mb-1 text-xs text-muted-foreground">accuracy</span>
                </div>
                <Progress
                  value={result.confidence}
                  className="mt-3 h-2 bg-muted [&>div]:bg-primary"
                />
              </div>

              {/* Description */}
              <div className="glass rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-accent" />
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Description
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-secondary-foreground">
                  {result.description}
                </p>
              </div>

              {/* Treatment */}
              <div className="glass rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <Pill className="h-4 w-4 text-primary" />
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Recommended Treatment
                  </p>
                </div>
                <ul className="mt-3 flex flex-col gap-2">
                  {result.treatment.map((step) => (
                    <li
                      key={step}
                      className="flex items-start gap-2 text-sm text-secondary-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention */}
              <div className="glass rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Prevention Tips
                  </p>
                </div>
                <ul className="mt-3 flex flex-col gap-2">
                  {result.preventionTips.map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-2 text-sm text-secondary-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {!isAnalyzing && !result && (
            <div className="flex flex-col items-center gap-4 py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                <Sparkles className="h-7 w-7 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">No analysis yet</p>
                <p className="mt-1 max-w-[240px] text-xs leading-relaxed text-muted-foreground">
                  Upload a crop image and click Analyze with AI to get started
                </p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
