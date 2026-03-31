"use client"

import { useState, useCallback } from "react"
import { ImageUpload } from "@/components/image-upload"
import { AiResultPanel, type AnalysisResult } from "@/components/ai-result-panel"
import { Button } from "@/components/ui/button"
import { Sparkles, History, Info, Zap } from "lucide-react"

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
}

export function DiseaseDetection() {
  const [preview, setPreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [scanHistory, setScanHistory] = useState<ScanEntry[]>([
    { name: "Tomato Leaf — Batch #12", date: "2 hours ago", status: "Late Blight" },
    { name: "Rice Paddy Sample", date: "1 day ago", status: "Healthy" },
    { name: "Wheat Leaf — Field A", date: "3 days ago", status: "Rust Detected" },
  ])

  const handleImageSelect = useCallback((_file: File, previewUrl: string) => {
    setPreview(previewUrl)
    setResult(null)
    setIsPanelOpen(false)
  }, [])

  const handleClear = useCallback(() => {
    setPreview(null)
    setResult(null)
    setIsPanelOpen(false)
  }, [])

  const handleAnalyze = useCallback(() => {
    setIsAnalyzing(true)
    setIsPanelOpen(true)
    setResult(null)

    // Randomly select a result to make each analysis unique
    const randomIndex = Math.floor(Math.random() * MOCK_RESULTS.length)
    const selectedResult = MOCK_RESULTS[randomIndex]

    setTimeout(() => {
      setIsAnalyzing(false)
      setResult(selectedResult)

      // Add to scan history
      const newEntry: ScanEntry = {
        name: `Crop Scan #${Math.floor(Math.random() * 900) + 100}`,
        date: "Just now",
        status: selectedResult.diseaseName.includes("Healthy")
          ? "Healthy"
          : selectedResult.diseaseName.split("(")[0].trim(),
      }
      setScanHistory((prev) => [newEntry, ...prev].slice(0, 8))
    }, 2800)
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
                  className="gap-2 rounded-xl border-border/50 text-foreground hover:bg-muted bg-transparent"
                  size="lg"
                  onClick={() => setIsPanelOpen(true)}
                >
                  <Info className="h-4 w-4" />
                  View Results
                </Button>
              </div>
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
