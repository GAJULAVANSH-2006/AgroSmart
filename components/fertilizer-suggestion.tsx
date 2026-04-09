"use client"

import { useState, useRef, useEffect } from "react"
import {
  Sprout,
  Leaf,
  FlaskConical,
  Calculator,
  Calendar,
  IndianRupee,
  ChevronDown,
  Beaker,
  Droplets,
  Sun,
  Wheat,
  Apple,
  CheckCircle2,
} from "lucide-react"

const ALL_CROPS = [
  { id: "rice", name: "Rice (Paddy)", icon: "🌾" },
  { id: "wheat", name: "Wheat", icon: "🌾" },
  { id: "cotton", name: "Cotton", icon: "🌿" },
  { id: "sugarcane", name: "Sugarcane", icon: "🎋" },
  { id: "tomato", name: "Tomato", icon: "🍅" },
  { id: "potato", name: "Potato", icon: "🥔" },
  { id: "onion", name: "Onion", icon: "🧅" },
  { id: "maize", name: "Maize", icon: "🌽" },
  { id: "soybean", name: "Soybean", icon: "🫘" },
  { id: "chilli", name: "Chilli", icon: "🌶️" },
]

function getCropIcon(name: string) {
  const match = ALL_CROPS.find(c => name.toLowerCase().includes(c.id))
  return match?.icon ?? "🌱"
}

function getUserCrops() {
  try {
    // First check fields
    const fields = JSON.parse(localStorage.getItem("agrosmart_fields") || "[]")
    const fieldCrops = fields
      .map((f: any) => f.crop?.trim())
      .filter(Boolean)

    // Then check farm crops
    const farm = JSON.parse(localStorage.getItem("agrosmart_farm") || "{}")
    const farmCrops = farm.crops
      ? farm.crops.split(",").map((c: string) => c.trim()).filter(Boolean)
      : []

    // Merge unique
    const all = [...new Set([...fieldCrops, ...farmCrops])] as string[]
    if (all.length > 0) {
      return all.map((name, i) => ({
        id: name.toLowerCase().replace(/\s+/g, "-"),
        name,
        icon: getCropIcon(name),
      }))
    }
  } catch {}
  return ALL_CROPS
}

const growthStages = ["Sowing", "Vegetative", "Flowering", "Fruiting", "Harvest"]

type FertilizerRec = {
  name: string
  npk: string
  dosage: string
  method: string
  pricePerKg: number
  type: "chemical" | "organic"
  timing: string
  description: string
}

const fertilizerData: Record<string, Record<string, FertilizerRec[]>> = {
  rice: {
    Sowing: [
      { name: "DAP (Di-Ammonium Phosphate)", npk: "18-46-0", dosage: "50 kg/acre", method: "Basal application during field preparation", pricePerKg: 27, type: "chemical", timing: "At transplanting", description: "Provides essential phosphorus for root development" },
      { name: "Vermicompost", npk: "1.5-0.5-1.0", dosage: "500 kg/acre", method: "Broadcast and mix into soil before transplanting", pricePerKg: 8, type: "organic", timing: "1 week before transplanting", description: "Improves soil structure and water retention" },
    ],
    Vegetative: [
      { name: "Urea", npk: "46-0-0", dosage: "35 kg/acre", method: "Top dressing in standing water", pricePerKg: 6, type: "chemical", timing: "21 days after transplanting", description: "Boosts vegetative growth and tillering" },
      { name: "Neem Cake", npk: "5-1-2", dosage: "100 kg/acre", method: "Broadcast around plant base", pricePerKg: 18, type: "organic", timing: "20-25 days after transplanting", description: "Slow-release nitrogen with pest repellent properties" },
      { name: "MOP (Muriate of Potash)", npk: "0-0-60", dosage: "25 kg/acre", method: "Top dressing", pricePerKg: 18, type: "chemical", timing: "30 days after transplanting", description: "Strengthens stems and improves disease resistance" },
    ],
    Flowering: [
      { name: "Urea (2nd dose)", npk: "46-0-0", dosage: "25 kg/acre", method: "Top dressing", pricePerKg: 6, type: "chemical", timing: "At panicle initiation", description: "Supports grain formation and filling" },
      { name: "Zinc Sulphate", npk: "0-0-0 +Zn", dosage: "10 kg/acre", method: "Foliar spray (0.5% solution)", pricePerKg: 52, type: "chemical", timing: "At flowering", description: "Prevents khaira disease and improves grain quality" },
    ],
    Fruiting: [
      { name: "Potassium Sulphate", npk: "0-0-50 +S", dosage: "15 kg/acre", method: "Foliar spray or top dressing", pricePerKg: 45, type: "chemical", timing: "Grain filling stage", description: "Improves grain weight and quality" },
    ],
    Harvest: [
      { name: "No fertilizer needed", npk: "-", dosage: "-", method: "Stop all fertilizer application 2 weeks before harvest", pricePerKg: 0, type: "organic", timing: "2 weeks before harvest", description: "Allow the crop to mature naturally" },
    ],
  },
  wheat: {
    Sowing: [
      { name: "DAP", npk: "18-46-0", dosage: "55 kg/acre", method: "Drill along seed rows", pricePerKg: 27, type: "chemical", timing: "At sowing", description: "Provides starter phosphorus and nitrogen" },
      { name: "FYM (Farm Yard Manure)", npk: "0.5-0.2-0.5", dosage: "2000 kg/acre", method: "Broadcast and plough in", pricePerKg: 2, type: "organic", timing: "2 weeks before sowing", description: "Enriches soil organic matter and microflora" },
    ],
    Vegetative: [
      { name: "Urea", npk: "46-0-0", dosage: "45 kg/acre", method: "Top dressing after first irrigation", pricePerKg: 6, type: "chemical", timing: "21 days after sowing (CRI stage)", description: "Critical nitrogen dose for tillering" },
      { name: "MOP", npk: "0-0-60", dosage: "20 kg/acre", method: "Top dressing", pricePerKg: 18, type: "chemical", timing: "At first irrigation", description: "Improves root growth and drought tolerance" },
    ],
    Flowering: [
      { name: "Urea (2nd dose)", npk: "46-0-0", dosage: "30 kg/acre", method: "Top dressing before flowering", pricePerKg: 6, type: "chemical", timing: "At boot stage", description: "Enhances ear development and grain number" },
    ],
    Fruiting: [
      { name: "Foliar Spray (NPK 19:19:19)", npk: "19-19-19", dosage: "2 kg in 200L water/acre", method: "Foliar spray", pricePerKg: 85, type: "chemical", timing: "Grain filling", description: "Balanced nutrition for quality grain development" },
    ],
    Harvest: [
      { name: "No fertilizer needed", npk: "-", dosage: "-", method: "Allow natural maturation", pricePerKg: 0, type: "organic", timing: "Pre-harvest", description: "Cease all applications for clean harvest" },
    ],
  },
}

// Default fertilizer data for crops not specifically listed
const defaultFertData: Record<string, FertilizerRec[]> = {
  Sowing: [
    { name: "DAP (Di-Ammonium Phosphate)", npk: "18-46-0", dosage: "50 kg/acre", method: "Basal application", pricePerKg: 27, type: "chemical", timing: "At sowing/transplanting", description: "Universal starter fertilizer for phosphorus" },
    { name: "Vermicompost", npk: "1.5-0.5-1.0", dosage: "400 kg/acre", method: "Mix into soil", pricePerKg: 8, type: "organic", timing: "Before sowing", description: "Improves soil health and microbial activity" },
  ],
  Vegetative: [
    { name: "Urea", npk: "46-0-0", dosage: "40 kg/acre", method: "Top dressing after irrigation", pricePerKg: 6, type: "chemical", timing: "20-25 days after sowing", description: "Primary nitrogen source for vegetative growth" },
    { name: "MOP", npk: "0-0-60", dosage: "20 kg/acre", method: "Top dressing", pricePerKg: 18, type: "chemical", timing: "With first top dressing", description: "Potassium for strong growth" },
  ],
  Flowering: [
    { name: "NPK Complex (10:26:26)", npk: "10-26-26", dosage: "30 kg/acre", method: "Side dressing", pricePerKg: 32, type: "chemical", timing: "At flower initiation", description: "Balanced P and K for flower and fruit set" },
  ],
  Fruiting: [
    { name: "Sulphate of Potash", npk: "0-0-50", dosage: "15 kg/acre", method: "Fertigation or top dressing", pricePerKg: 45, type: "chemical", timing: "During fruit development", description: "Improves fruit quality and shelf life" },
  ],
  Harvest: [
    { name: "No fertilizer needed", npk: "-", dosage: "-", method: "Cease application", pricePerKg: 0, type: "organic", timing: "2 weeks before harvest", description: "Allow natural maturation" },
  ],
}

export function FertilizerSuggestion() {
  const [selectedCrop, setSelectedCrop] = useState(() => {
    try {
      const fields = JSON.parse(localStorage.getItem("agrosmart_fields") || "[]")
      if (fields[0]?.crop) return fields[0].crop.toLowerCase().replace(/\s+/g, "-")
      const farm = JSON.parse(localStorage.getItem("agrosmart_farm") || "{}")
      if (farm.crops) return farm.crops.split(",")[0].trim().toLowerCase().replace(/\s+/g, "-")
    } catch {}
    return "rice"
  })
  const [selectedStage, setSelectedStage] = useState("Sowing")
  const [cropDropdownOpen, setCropDropdownOpen] = useState(false)
  const cropDropdownRef = useRef<HTMLDivElement>(null)
  const [farmArea, setFarmArea] = useState(() => {
    try {
      const fields: { crop: string; area: string }[] = JSON.parse(localStorage.getItem("agrosmart_fields") || "[]")
      const defaultCrop = (() => {
        try {
          const f = fields[0]
          return f?.crop?.trim().toLowerCase().replace(/\s+/g, "-") || "rice"
        } catch { return "rice" }
      })()
      const match = fields.find(f => f.crop?.trim().toLowerCase().replace(/\s+/g, "-") === defaultCrop)
      if (match && parseFloat(match.area) > 0) return parseFloat(match.area)
      const farm = JSON.parse(localStorage.getItem("agrosmart_farm") || "{}")
      return parseFloat(farm.area) || 2.5
    } catch { return 2.5 }
  })
  const [showOrganic, setShowOrganic] = useState<"all" | "chemical" | "organic">("all")

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cropDropdownRef.current && !cropDropdownRef.current.contains(e.target as Node)) {
        setCropDropdownOpen(false)
      }
    }
    if (cropDropdownOpen) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [cropDropdownOpen])

  const crops = getUserCrops()

  // Update farm area when selected crop changes to match that field's area
  useEffect(() => {
    try {
      const fields: { crop: string; area: string }[] = JSON.parse(localStorage.getItem("agrosmart_fields") || "[]")
      // Find field whose crop name matches selectedCrop id
      const match = fields.find(f => {
        const id = f.crop?.trim().toLowerCase().replace(/\s+/g, "-")
        return id === selectedCrop
      })
      if (match && parseFloat(match.area) > 0) {
        setFarmArea(parseFloat(match.area))
      } else {
        const farm = JSON.parse(localStorage.getItem("agrosmart_farm") || "{}")
        setFarmArea(parseFloat(farm.area) || 2.5)
      }
    } catch {}
  }, [selectedCrop])
  const cropFertData = fertilizerData[selectedCrop] || defaultFertData
  const stageData = cropFertData[selectedStage] || defaultFertData[selectedStage] || []
  const filteredData = showOrganic === "all" ? stageData : stageData.filter(f => f.type === showOrganic)

  const totalCostPerAcre = stageData.reduce((acc, f) => {
    const qty = parseFloat(f.dosage.replace(/[^0-9.]/g, "")) || 0
    return acc + qty * f.pricePerKg
  }, 0)

  const selectedCropObj = crops.find(c => c.id === selectedCrop)

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Fertilizer Suggestion</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          AI-optimized fertilizer recommendations based on your crop and growth stage
        </p>
      </div>

      {/* Crop + Stage Selectors */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Crop Selector */}
        <div className="relative flex-1" ref={cropDropdownRef}>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Select Crop
          </label>
          <button
            type="button"
            onClick={() => setCropDropdownOpen(!cropDropdownOpen)}
            className="flex w-full items-center justify-between rounded-xl border border-border/50 bg-muted/30 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">{selectedCropObj?.icon}</span>
              {selectedCropObj?.name}
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
          {cropDropdownOpen && (
            <div className="absolute left-0 top-full z-20 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-border/50 bg-card p-1 shadow-xl">
              {crops.map(crop => (
                <button
                  key={crop.id}
                  type="button"
                  onClick={() => { setSelectedCrop(crop.id); setCropDropdownOpen(false) }}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    selectedCrop === crop.id ? "bg-primary/15 text-primary" : "text-foreground hover:bg-muted/50"
                  }`}
                >
                  <span className="text-lg">{crop.icon}</span>
                  {crop.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Farm Area Input */}
        <div className="w-full sm:w-48">
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Farm Area (acres)
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/30 px-4 py-3">
            <Calculator className="h-4 w-4 text-muted-foreground" />
            <input
              type="number"
              value={farmArea}
              onChange={(e) => setFarmArea(parseFloat(e.target.value) || 0)}
              className="w-full bg-transparent text-sm font-medium text-foreground outline-none"
              min={0.1}
              step={0.1}
            />
          </div>
        </div>
      </div>

      {/* Growth Stage Tabs */}
      <div className="glass rounded-2xl p-2">
        <div className="flex gap-1 overflow-x-auto">
          {growthStages.map(stage => (
            <button
              key={stage}
              type="button"
              onClick={() => setSelectedStage(stage)}
              className={`flex-1 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                selectedStage === stage
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              {stage}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(["all", "chemical", "organic"] as const).map(filter => (
          <button
            key={filter}
            type="button"
            onClick={() => setShowOrganic(filter)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              showOrganic === filter
                ? "bg-primary/15 text-primary border border-primary/30"
                : "bg-muted/30 text-muted-foreground hover:text-foreground border border-transparent"
            }`}
          >
            {filter === "organic" && <Leaf className="h-3 w-3" />}
            {filter === "chemical" && <Beaker className="h-3 w-3" />}
            {filter === "all" && <FlaskConical className="h-3 w-3" />}
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Fertilizer Recommendation Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredData.map((fert) => {
          const totalQty = parseFloat(fert.dosage.replace(/[^0-9.]/g, "")) * farmArea
          const totalCost = totalQty * fert.pricePerKg
          return (
            <div
              key={fert.name}
              className={`glass rounded-2xl p-5 transition-all hover:border-primary/30 ${
                fert.type === "organic" ? "border-l-4 border-l-primary" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{fert.name}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      fert.type === "organic"
                        ? "bg-primary/15 text-primary"
                        : "bg-accent/15 text-accent"
                    }`}>
                      {fert.type}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{fert.description}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/30 px-3 py-2">
                  <p className="text-[10px] text-muted-foreground">NPK Ratio</p>
                  <p className="text-sm font-bold text-foreground">{fert.npk}</p>
                </div>
                <div className="rounded-lg bg-muted/30 px-3 py-2">
                  <p className="text-[10px] text-muted-foreground">Dosage / acre</p>
                  <p className="text-sm font-bold text-foreground">{fert.dosage}</p>
                </div>
                <div className="rounded-lg bg-muted/30 px-3 py-2">
                  <p className="text-[10px] text-muted-foreground">Method</p>
                  <p className="text-xs font-medium text-foreground">{fert.method}</p>
                </div>
                <div className="rounded-lg bg-muted/30 px-3 py-2">
                  <p className="text-[10px] text-muted-foreground">Timing</p>
                  <p className="text-xs font-medium text-foreground">{fert.timing}</p>
                </div>
              </div>

              {fert.pricePerKg > 0 && (
                <div className="mt-3 flex items-center justify-between rounded-xl bg-primary/5 px-4 py-2.5 border border-primary/10">
                  <div>
                    <p className="text-[10px] text-muted-foreground">Total for {farmArea} acres</p>
                    <p className="text-sm font-bold text-foreground">{totalQty.toFixed(0)} kg</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground">Estimated Cost</p>
                    <p className="flex items-center gap-0.5 text-sm font-bold text-primary">
                      <IndianRupee className="h-3.5 w-3.5" />
                      {totalCost.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Application Schedule Timeline */}
      <div className="glass rounded-2xl p-5">
        <div className="mb-4 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Full Season Application Schedule
          </h3>
        </div>
        <div className="relative ml-4 border-l-2 border-border/50 pl-6">
          {growthStages.map((stage, idx) => {
            const isActive = stage === selectedStage
            const stData = (cropFertData[stage] || defaultFertData[stage] || [])
            return (
              <div key={stage} className="relative mb-6 last:mb-0">
                <div className={`absolute -left-[31px] top-0 h-4 w-4 rounded-full border-2 ${
                  isActive
                    ? "border-primary bg-primary"
                    : idx < growthStages.indexOf(selectedStage)
                    ? "border-primary bg-primary/30"
                    : "border-border bg-card"
                }`} />
                <div>
                  <h4 className={`text-sm font-semibold ${isActive ? "text-primary" : "text-foreground"}`}>
                    {stage}
                  </h4>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {stData.map(f => (
                      <span key={f.name} className="inline-flex items-center gap-1 rounded-full bg-muted/40 px-2.5 py-1 text-xs text-secondary-foreground">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                        {f.name.length > 30 ? f.name.substring(0, 30) + "..." : f.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Cost Summary */}
      <div className="glass rounded-2xl p-5">
        <div className="mb-4 flex items-center gap-2">
          <IndianRupee className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Cost Summary — {selectedStage} Stage
          </h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-muted/30 p-4 text-center">
            <p className="text-xs text-muted-foreground">Cost / Acre</p>
            <p className="mt-1 flex items-center justify-center gap-0.5 text-2xl font-bold text-foreground">
              <IndianRupee className="h-5 w-5" />
              {totalCostPerAcre.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="rounded-xl bg-muted/30 p-4 text-center">
            <p className="text-xs text-muted-foreground">Total ({farmArea} acres)</p>
            <p className="mt-1 flex items-center justify-center gap-0.5 text-2xl font-bold text-primary">
              <IndianRupee className="h-5 w-5" />
              {(totalCostPerAcre * farmArea).toLocaleString("en-IN")}
            </p>
          </div>
          <div className="rounded-xl bg-muted/30 p-4 text-center">
            <p className="text-xs text-muted-foreground">Products This Stage</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{stageData.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
