"use client"

import { useState, useCallback, useRef } from "react"
import { ImageUpload } from "@/components/image-upload"
import { AiResultPanel, type AnalysisResult } from "@/components/ai-result-panel"
import { Button } from "@/components/ui/button"
import { Sparkles, History, Info, Zap, Cpu } from "lucide-react"
import { analyzeImageWithGemini } from "@/lib/gemini"

const MOCK_RESULTS: AnalysisResult[] = [
  {
    diseaseName: "Late Blight (Phytophthora infestans)",
    confidence: 94.7,
    description:
      "Late blight is a devastating disease of potato and tomato caused by the oomycete pathogen Phytophthora infestans. It is characterized by dark, water-soaked lesions on leaves and stems that can rapidly spread under cool and moist conditions. This disease was responsible for the Irish potato famine in the 1840s.",
    treatment: [
      "Apply fungicides containing chlorothalonil or mancozeb immediately",
      "Remove and destroy all affected plant material",
      "Improve air circulation between plants by proper spacing",
      "Avoid overhead irrigation; use drip irrigation instead",
      "Apply copper-based organic fungicide as a preventive measure",
    ],
    severity: "high",
    preventionTips: [
      "Plant resistant varieties when available",
      "Practice crop rotation with non-solanaceous crops",
      "Maintain proper drainage to avoid waterlogged conditions",
      "Monitor weather conditions and apply preventive sprays before outbreaks",
    ],
  },
  {
    diseaseName: "Powdery Mildew (Erysiphe cichoracearum)",
    confidence: 89.2,
    description:
      "Powdery mildew appears as white to grayish powdery growth on the upper surface of leaves, stems, and occasionally fruits. It thrives in warm, dry climates with cool nights. The fungus reduces photosynthesis and can lead to premature leaf drop and reduced yields.",
    treatment: [
      "Apply sulfur-based fungicide or neem oil spray immediately",
      "Remove heavily infected leaves to prevent spread",
      "Ensure adequate spacing for air circulation",
      "Apply potassium bicarbonate solution as an organic alternative",
      "Use systemic fungicides like myclobutanil for severe infections",
    ],
    severity: "medium",
    preventionTips: [
      "Choose mildew-resistant varieties",
      "Avoid excessive nitrogen fertilization",
      "Water at the base of plants, not overhead",
      "Ensure good air circulation and sunlight exposure",
    ],
  },
  {
    diseaseName: "Leaf Rust (Puccinia triticina)",
    confidence: 91.5,
    description:
      "Leaf rust is one of the most common and widespread diseases of wheat worldwide. It produces small, round to oval, orange-brown pustules primarily on the upper leaf surface. Severe infections can reduce grain yield by 10-30% due to premature leaf senescence.",
    treatment: [
      "Apply triazole-based fungicides (propiconazole or tebuconazole)",
      "Apply at first sign of pustules on flag leaf",
      "Use combination fungicides for better efficacy",
      "Consider aerial application for large fields",
      "Follow up with a second spray after 15-20 days if needed",
    ],
    severity: "high",
    preventionTips: [
      "Grow rust-resistant wheat varieties (e.g., HD 3226, DBW 187)",
      "Avoid late sowing which increases rust susceptibility",
      "Destroy volunteer wheat plants and crop residues",
      "Monitor fields weekly during heading stage",
    ],
  },
  {
    diseaseName: "Bacterial Leaf Spot (Xanthomonas campestris)",
    confidence: 85.8,
    description:
      "Bacterial leaf spot causes small, water-soaked lesions on leaves that turn brown with yellow halos. It commonly affects tomatoes, peppers, and leafy vegetables. The bacteria spread through rain splash, contaminated tools, and infected seeds.",
    treatment: [
      "Apply copper hydroxide or copper sulfate spray",
      "Remove and destroy severely infected plants",
      "Avoid working in the field when plants are wet",
      "Apply streptomycin sulfate in severe cases (as permitted)",
      "Use drip irrigation to keep foliage dry",
    ],
    severity: "medium",
    preventionTips: [
      "Use certified disease-free seeds",
      "Practice 2-3 year crop rotation",
      "Disinfect pruning tools between plants",
      "Avoid overhead sprinkler irrigation",
    ],
  },
  {
    diseaseName: "Healthy — No Disease Detected",
    confidence: 97.1,
    description:
      "The crop appears to be healthy with no visible signs of disease, pest damage, or nutrient deficiency. Leaf color, texture, and growth pattern are within normal parameters. Continue regular monitoring and preventive care.",
    treatment: [
      "Continue regular crop maintenance schedule",
      "Maintain current irrigation and fertilization practices",
      "Monitor weekly for any changes in leaf appearance",
      "Apply preventive bio-fungicide spray as scheduled",
      "Ensure proper weed management around the plants",
    ],
    severity: "low",
    preventionTips: [
      "Maintain crop rotation schedule",
      "Keep fields clean and weed-free",
      "Apply balanced NPK fertilizers as recommended",
      "Schedule regular disease scouting every 7-10 days",
    ],
  },
]

interface ScanEntry {
  name: string
  date: string
  status: string
  timestamp: number
  severity?: string
}

export function DiseaseDetection() {
  const [preview, setPreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [analysisError, setAnalysisError] = useState<string | null>(null)
  const uploadedFileRef = useRef<File | null>(null)
  const [scanHistory, setScanHistory] = useState<ScanEntry[]>([
    { name: "Tomato Leaf — Batch #12", date: "2 hours ago", status: "Late Blight", timestamp: Date.now() - 7200000, severity: "high" },
    { name: "Rice Paddy Sample", date: "1 day ago", status: "Healthy", timestamp: Date.now() - 86400000 },
    { name: "Wheat Leaf — Field A", date: "3 days ago", status: "Rust Detected", timestamp: Date.now() - 259200000, severity: "high" },
  ])

  const handleImageSelect = useCallback((_file: File, previewUrl: string) => {
    setPreview(previewUrl)
    setResult(null)
    setAnalysisError(null)
    setIsPanelOpen(false)
    uploadedFileRef.current = _file
  }, [])

  const handleClear = useCallback(() => {
    setPreview(null)
    setResult(null)
    setAnalysisError(null)
    setIsPanelOpen(false)
    uploadedFileRef.current = null
  }, [])

  const handleAnalyze = useCallback(async () => {
    setIsAnalyzing(true)
    setIsPanelOpen(true)
    setResult(null)
    setAnalysisError(null)

    let selectedResult: AnalysisResult

    try {
      const file = uploadedFileRef.current
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

      if (file && apiKey) {
        // Real AI analysis using OpenAI Vision
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            const result = e.target?.result as string
            resolve(result.split(",")[1])
          }
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
        selectedResult = await analyzeImageWithGemini(base64, file.type)
      } else {
        // Fallback to mock if no API key
        await new Promise((r) => setTimeout(r, 2800))
        const randomIndex = Math.floor(Math.random() * MOCK_RESULTS.length)
        selectedResult = MOCK_RESULTS[randomIndex]
      }
    } catch (err: any) {
      setIsAnalyzing(false)
      setAnalysisError(err.message || "Analysis failed. Please try again.")
      return
    }

    setIsAnalyzing(false)
    setResult(selectedResult)

      // Add to scan history (local + dashboard)
      const newEntry: ScanEntry = {
        name: `Crop Scan #${Math.floor(Math.random() * 900) + 100}`,
        date: "Just now",
        status: selectedResult.diseaseName.includes("Healthy")
          ? "Healthy"
          : selectedResult.diseaseName.split("(")[0].trim(),
        timestamp: Date.now(),
        severity: selectedResult.severity,
      }
      setScanHistory((prev) => [newEntry, ...prev].slice(0, 8))

      // Persist to localStorage for dashboard stats
      try {
        const raw = localStorage.getItem("agrosmart_scan_history")
        const all = raw ? JSON.parse(raw) : []
        all.unshift(newEntry)
        localStorage.setItem("agrosmart_scan_history", JSON.stringify(all.slice(0, 100)))
      } catch {}
  }, [])

  return (
    <>
      <div className="flex flex-1 flex-col gap-6 p-6">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Disease Detection
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload a crop image and let our AI identify diseases instantly
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Upload Card */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <h2 className="text-base font-semibold text-foreground">
                    Upload Crop Image
                  </h2>
                </div>
                {preview && (
                  <span className="text-xs text-muted-foreground">
                    Image ready for analysis
                  </span>
                )}
              </div>

              <ImageUpload
                onImageSelect={handleImageSelect}
                preview={preview}
                onClear={handleClear}
              />

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={handleAnalyze}
                  disabled={!preview || isAnalyzing}
                  className="flex-1 gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
                  size="lg"
                >
                  <Sparkles className="h-4 w-4" />
                  {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 rounded-xl border-border/50 text-foreground hover:bg-muted bg-transparent disabled:opacity-40"
                  size="lg"
                  onClick={() => setIsPanelOpen(true)}
                  disabled={!result && !isAnalyzing}
                >
                  <Info className="h-4 w-4" />
                  View Results
                </Button>
              </div>

              {/* AI badge */}
              <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Cpu className="h-3.5 w-3.5 text-primary" />
                {process.env.NEXT_PUBLIC_OPENAI_API_KEY
                  ? "Powered by GPT-4o Vision AI"
                  : "Demo mode — add OpenAI API key for real AI"}
              </div>

              {/* Error */}
              {analysisError && (
                <div className="mt-3 rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-2.5 text-sm text-destructive">
                  {analysisError}
                </div>
              )}
            </div>
          </div>

          {/* Info Cards Column */}
          <div className="flex flex-col gap-6">
            {/* Stats Card */}
            <div className="glass rounded-2xl p-5">
              <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Quick Stats
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-foreground">1,247</p>
                  <p className="text-xs text-muted-foreground">Scans This Month</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">96.3%</p>
                  <p className="text-xs text-muted-foreground">Accuracy Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">38</p>
                  <p className="text-xs text-muted-foreground">Diseases Covered</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">0.8s</p>
                  <p className="text-xs text-muted-foreground">Avg. Response</p>
                </div>
              </div>
            </div>

            {/* Recent Scans */}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Recent Scans
                </h3>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {scanHistory.map((scan, idx) => (
                  <div
                    key={`${scan.name}-${idx}`}
                    className="flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2.5"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{scan.name}</p>
                      <p className="text-xs text-muted-foreground">{scan.date}</p>
                    </div>
                    <span
                      className={
                        scan.status === "Healthy"
                          ? "text-xs font-medium text-primary"
                          : "text-xs font-medium text-destructive"
                      }
                    >
                      {scan.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Panel Overlay */}
      {isPanelOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsPanelOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsPanelOpen(false)
          }}
          role="button"
          tabIndex={0}
          aria-label="Close AI panel"
        />
      )}

      <AiResultPanel
        result={result}
        isAnalyzing={isAnalyzing}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </>
  )
}
