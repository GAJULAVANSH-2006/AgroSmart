export interface District {
  name: string
  soilType: string
  phRange: [number, number]
  nitrogenLevel: "low" | "medium" | "high"
  notes: string
}

export interface State {
  name: string
  districts: District[]
}

export interface Country {
  name: string
  states: State[]
}

export const locationData: Country[] = [
  {
    name: "India",
    states: [
      {
        name: "Karnataka",
        districts: [
          { name: "Mandya", soilType: "Red Laterite", phRange: [6.0, 6.8], nitrogenLevel: "medium", notes: "Suitable for sugarcane, rice, and ragi" },
          { name: "Mysuru", soilType: "Red Sandy Loam", phRange: [6.2, 7.0], nitrogenLevel: "medium", notes: "Good for vegetables and flowers" },
          { name: "Belagavi", soilType: "Black Cotton Soil", phRange: [7.5, 8.5], nitrogenLevel: "high", notes: "Ideal for sugarcane and soybean" },
          { name: "Tumkur", soilType: "Red Loamy", phRange: [5.8, 6.5], nitrogenLevel: "low", notes: "Suitable for groundnut and sunflower" },
          { name: "Hassan", soilType: "Red Laterite", phRange: [5.5, 6.5], nitrogenLevel: "medium", notes: "Coffee and arecanut growing region" },
          { name: "Dharwad", soilType: "Medium Black", phRange: [7.0, 8.0], nitrogenLevel: "high", notes: "Cotton and jowar belt" },
          { name: "Raichur", soilType: "Deep Black", phRange: [7.8, 8.5], nitrogenLevel: "high", notes: "Rice and cotton cultivation" },
          { name: "Kolar", soilType: "Red Sandy", phRange: [5.5, 6.5], nitrogenLevel: "low", notes: "Tomato and mulberry region" },
        ],
      },
      {
        name: "Maharashtra",
        districts: [
          { name: "Pune", soilType: "Medium Black", phRange: [7.0, 7.8], nitrogenLevel: "medium", notes: "Grapes and sugarcane region" },
          { name: "Nashik", soilType: "Shallow Black", phRange: [6.5, 7.5], nitrogenLevel: "medium", notes: "Onion and grapes belt" },
          { name: "Nagpur", soilType: "Deep Black", phRange: [7.5, 8.5], nitrogenLevel: "high", notes: "Orange and cotton growing area" },
          { name: "Kolhapur", soilType: "Deep Black", phRange: [7.2, 8.0], nitrogenLevel: "high", notes: "Sugarcane dominant region" },
          { name: "Aurangabad", soilType: "Medium Black", phRange: [7.0, 8.0], nitrogenLevel: "medium", notes: "Cotton and soybean area" },
          { name: "Solapur", soilType: "Shallow Black", phRange: [7.5, 8.5], nitrogenLevel: "low", notes: "Pomegranate and jowar region" },
        ],
      },
      {
        name: "Punjab",
        districts: [
          { name: "Ludhiana", soilType: "Sandy Loam", phRange: [7.5, 8.5], nitrogenLevel: "high", notes: "Wheat and rice dominant" },
          { name: "Amritsar", soilType: "Loamy", phRange: [7.0, 8.0], nitrogenLevel: "high", notes: "Wheat belt of India" },
          { name: "Patiala", soilType: "Sandy Loam", phRange: [7.5, 8.5], nitrogenLevel: "medium", notes: "Rice and wheat cultivation" },
          { name: "Jalandhar", soilType: "Alluvial", phRange: [7.0, 7.8], nitrogenLevel: "high", notes: "Vegetables and wheat region" },
          { name: "Bathinda", soilType: "Sandy", phRange: [8.0, 9.0], nitrogenLevel: "low", notes: "Cotton and wheat area" },
        ],
      },
      {
        name: "Uttar Pradesh",
        districts: [
          { name: "Agra", soilType: "Alluvial", phRange: [7.5, 8.5], nitrogenLevel: "medium", notes: "Potato and mustard region" },
          { name: "Lucknow", soilType: "Alluvial Loam", phRange: [7.0, 8.0], nitrogenLevel: "medium", notes: "Sugarcane and wheat area" },
          { name: "Varanasi", soilType: "Alluvial", phRange: [7.0, 7.8], nitrogenLevel: "medium", notes: "Vegetables and rice region" },
          { name: "Meerut", soilType: "Alluvial", phRange: [7.5, 8.0], nitrogenLevel: "high", notes: "Sugarcane dominant belt" },
          { name: "Gorakhpur", soilType: "Alluvial Clay", phRange: [6.5, 7.5], nitrogenLevel: "medium", notes: "Rice and sugarcane region" },
        ],
      },
      {
        name: "Tamil Nadu",
        districts: [
          { name: "Coimbatore", soilType: "Red Sandy Loam", phRange: [6.0, 7.0], nitrogenLevel: "medium", notes: "Cotton and banana region" },
          { name: "Thanjavur", soilType: "Alluvial Clay", phRange: [6.5, 7.5], nitrogenLevel: "high", notes: "Rice granary of Tamil Nadu" },
          { name: "Salem", soilType: "Red Loamy", phRange: [5.5, 6.5], nitrogenLevel: "low", notes: "Mango and tapioca region" },
          { name: "Madurai", soilType: "Black Cotton", phRange: [7.0, 8.0], nitrogenLevel: "medium", notes: "Cotton and jasmine cultivation" },
          { name: "Tirunelveli", soilType: "Red Sandy", phRange: [6.0, 7.0], nitrogenLevel: "low", notes: "Banana and rice region" },
        ],
      },
      {
        name: "Telangana",
        districts: [
          { name: "Hyderabad", soilType: "Red Sandy Loam", phRange: [6.5, 7.5], nitrogenLevel: "medium", notes: "Urban farming and horticulture" },
          { name: "Warangal", soilType: "Deep Black", phRange: [7.5, 8.5], nitrogenLevel: "high", notes: "Cotton and rice dominant region" },
          { name: "Nizamabad", soilType: "Medium Black", phRange: [7.0, 8.0], nitrogenLevel: "high", notes: "Turmeric capital of India" },
          { name: "Karimnagar", soilType: "Red Loamy", phRange: [6.0, 7.0], nitrogenLevel: "medium", notes: "Rice and cotton cultivation" },
          { name: "Khammam", soilType: "Red Sandy", phRange: [5.5, 6.5], nitrogenLevel: "medium", notes: "Tobacco and cotton region" },
          { name: "Nalgonda", soilType: "Shallow Black", phRange: [7.0, 8.0], nitrogenLevel: "low", notes: "Groundnut and jowar area" },
          { name: "Mahbubnagar", soilType: "Red Loamy", phRange: [6.0, 7.0], nitrogenLevel: "low", notes: "Groundnut and sunflower belt" },
          { name: "Adilabad", soilType: "Deep Black", phRange: [7.5, 8.5], nitrogenLevel: "high", notes: "Soybean and cotton region" },
        ],
      },
      {
        name: "Andhra Pradesh",
        districts: [
          { name: "Guntur", soilType: "Black Cotton", phRange: [7.5, 8.5], nitrogenLevel: "high", notes: "Chilli capital of India" },
          { name: "Krishna", soilType: "Alluvial", phRange: [6.5, 7.5], nitrogenLevel: "high", notes: "Rice and sugarcane belt" },
          { name: "Kurnool", soilType: "Red Sandy", phRange: [6.0, 7.0], nitrogenLevel: "low", notes: "Groundnut and cotton region" },
          { name: "Nellore", soilType: "Alluvial Sandy", phRange: [6.5, 7.5], nitrogenLevel: "medium", notes: "Rice and aquaculture area" },
          { name: "Chittoor", soilType: "Red Loamy", phRange: [5.5, 6.5], nitrogenLevel: "medium", notes: "Tomato and mango region" },
        ],
      },
      {
        name: "Rajasthan",
        districts: [
          { name: "Jaipur", soilType: "Sandy Loam", phRange: [7.5, 8.5], nitrogenLevel: "low", notes: "Wheat and mustard region" },
          { name: "Jodhpur", soilType: "Sandy Desert", phRange: [8.0, 9.0], nitrogenLevel: "low", notes: "Bajra and moth bean area" },
          { name: "Kota", soilType: "Medium Black", phRange: [7.0, 8.0], nitrogenLevel: "medium", notes: "Soybean and coriander belt" },
          { name: "Udaipur", soilType: "Red Sandy", phRange: [6.0, 7.0], nitrogenLevel: "low", notes: "Maize and wheat region" },
          { name: "Bikaner", soilType: "Sandy", phRange: [8.0, 9.5], nitrogenLevel: "low", notes: "Bajra and guar region" },
        ],
      },
      {
        name: "West Bengal",
        districts: [
          { name: "Murshidabad", soilType: "Alluvial", phRange: [6.0, 7.0], nitrogenLevel: "high", notes: "Rice and jute region" },
          { name: "Bardhaman", soilType: "Alluvial Clay", phRange: [5.5, 6.5], nitrogenLevel: "high", notes: "Rice bowl of West Bengal" },
          { name: "Nadia", soilType: "Alluvial", phRange: [6.0, 7.0], nitrogenLevel: "high", notes: "Vegetables and rice area" },
          { name: "Hooghly", soilType: "Alluvial Loam", phRange: [6.0, 7.0], nitrogenLevel: "medium", notes: "Vegetables and flowers region" },
          { name: "Jalpaiguri", soilType: "Laterite", phRange: [4.5, 5.5], nitrogenLevel: "medium", notes: "Tea and rice cultivation" },
        ],
      },
    ],
  },
  {
    name: "United States",
    states: [
      {
        name: "California",
        districts: [
          { name: "Fresno", soilType: "Sandy Loam", phRange: [6.5, 7.5], nitrogenLevel: "medium", notes: "Grapes and almonds region" },
          { name: "Tulare", soilType: "Clay Loam", phRange: [6.0, 7.0], nitrogenLevel: "high", notes: "Dairy and citrus area" },
          { name: "Kern", soilType: "Sandy", phRange: [7.0, 8.0], nitrogenLevel: "low", notes: "Oil and cotton region" },
          { name: "Monterey", soilType: "Sandy Loam", phRange: [6.0, 7.0], nitrogenLevel: "medium", notes: "Lettuce and strawberries" },
        ],
      },
      {
        name: "Iowa",
        districts: [
          { name: "Polk", soilType: "Silty Clay Loam", phRange: [6.0, 7.0], nitrogenLevel: "high", notes: "Corn and soybean belt" },
          { name: "Linn", soilType: "Loam", phRange: [6.5, 7.5], nitrogenLevel: "high", notes: "Corn and livestock region" },
          { name: "Scott", soilType: "Silty Loam", phRange: [6.0, 7.0], nitrogenLevel: "high", notes: "Corn and soybean area" },
        ],
      },
      {
        name: "Texas",
        districts: [
          { name: "Harris", soilType: "Clay", phRange: [7.0, 8.0], nitrogenLevel: "medium", notes: "Cotton and sorghum region" },
          { name: "Lubbock", soilType: "Sandy Loam", phRange: [7.5, 8.5], nitrogenLevel: "low", notes: "Cotton capital of Texas" },
          { name: "Hidalgo", soilType: "Clay Loam", phRange: [7.0, 8.0], nitrogenLevel: "medium", notes: "Citrus and vegetables" },
        ],
      },
    ],
  },
  {
    name: "Brazil",
    states: [
      {
        name: "Mato Grosso",
        districts: [
          { name: "Sorriso", soilType: "Cerrado Latosol", phRange: [5.0, 6.0], nitrogenLevel: "medium", notes: "Soybean capital of Brazil" },
          { name: "Sinop", soilType: "Red-Yellow Latosol", phRange: [4.5, 5.5], nitrogenLevel: "low", notes: "Soybean and corn region" },
        ],
      },
      {
        name: "São Paulo",
        districts: [
          { name: "Ribeirão Preto", soilType: "Purple Latosol", phRange: [5.5, 6.5], nitrogenLevel: "high", notes: "Sugarcane dominant region" },
          { name: "Campinas", soilType: "Red Latosol", phRange: [5.0, 6.0], nitrogenLevel: "medium", notes: "Citrus and sugarcane area" },
        ],
      },
    ],
  },
]

// Generate soil metrics based on district characteristics
export function getSoilMetricsForLocation(district: District, fieldId: string) {
  const phMid = (district.phRange[0] + district.phRange[1]) / 2
  const nBase = district.nitrogenLevel === "high" ? 80 : district.nitrogenLevel === "medium" ? 60 : 40
  const seed = fieldId === "field-a" ? 1 : fieldId === "field-b" ? 2 : 3

  return {
    healthScore: Math.min(95, Math.max(45, nBase + seed * 5)),
    nitrogen: Math.min(95, nBase + seed * 3),
    phosphorus: Math.min(90, 40 + seed * 10 + (district.nitrogenLevel === "high" ? 15 : 0)),
    potassium: Math.min(95, 65 + seed * 8),
    ph: parseFloat((phMid + (seed - 2) * 0.2).toFixed(1)),
    moisture: 50 + seed * 8,
    organicCarbon: parseFloat((0.3 + seed * 0.15 + (district.nitrogenLevel === "high" ? 0.2 : 0)).toFixed(2)),
    sand: district.soilType.includes("Sandy") ? 55 : district.soilType.includes("Clay") ? 25 : 40,
    silt: district.soilType.includes("Alluvial") ? 40 : 30,
    clay: district.soilType.includes("Clay") || district.soilType.includes("Black") ? 35 : 20,
    ec: parseFloat((0.3 + seed * 0.08).toFixed(2)),
    zinc: parseFloat((1.2 + seed * 0.3).toFixed(1)),
    iron: parseFloat((6.0 + seed * 1.2).toFixed(1)),
    manganese: parseFloat((2.5 + seed * 0.5).toFixed(1)),
    copper: parseFloat((0.8 + seed * 0.2).toFixed(1)),
    boron: parseFloat((0.4 + seed * 0.15).toFixed(1)),
    sulfur: parseFloat((8.0 + seed * 2.0).toFixed(1)),
  }
}
