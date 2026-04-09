import type { AnalysisResult } from "@/components/ai-result-panel"

const PROMPT = `You are an expert agricultural plant pathologist. Analyze this crop image carefully and respond ONLY with a valid JSON object in exactly this format, no markdown, no extra text:

{
  "diseaseName": "Disease name (or 'Healthy — No Disease Detected')",
  "confidence": 94.5,
  "description": "2-3 sentence description of the disease or healthy status",
  "severity": "low",
  "treatment": ["step 1", "step 2", "step 3", "step 4", "step 5"],
  "preventionTips": ["tip 1", "tip 2", "tip 3", "tip 4"]
}

Rules:
- confidence is a number between 0 and 100
- severity must be exactly "low", "medium", or "high"
- If the crop looks healthy, set severity to "low" and diseaseName to "Healthy — No Disease Detected"
- treatment and preventionTips must each have at least 4 items
- Be specific to Indian farming conditions where possible
- If the image is not a plant/crop, return diseaseName as "Not a crop image" with severity "low"`

export async function analyzeImageWithGemini(base64Image: string, mimeType: string): Promise<AnalysisResult> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
  if (!apiKey) throw new Error("OpenAI API key not configured")

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: PROMPT },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
                detail: "high",
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `OpenAI error: ${response.status}`)
  }

  const data = await response.json()
  const text = data.choices?.[0]?.message?.content?.trim()
  if (!text) throw new Error("No response from AI")

  const cleaned = text.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim()
  const parsed = JSON.parse(cleaned)

  return {
    diseaseName: parsed.diseaseName,
    confidence: Number(parsed.confidence),
    description: parsed.description,
    severity: parsed.severity,
    treatment: parsed.treatment,
    preventionTips: parsed.preventionTips,
  }
}
