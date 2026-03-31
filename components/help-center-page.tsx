"use client"

import { useState } from "react"
import { Search, ChevronDown, ChevronUp, BookOpen, MessageCircle, FileText, Phone, Mail, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HelpCenterPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const faqs = [
    {
      question: "How do I scan a crop for diseases?",
      answer: "Go to the Disease Detection section. Click on the 'Upload Crop Image' area, select a clear photo of the affected leaf or plant part, and click 'Analyze with AI'. Our system will process the image within seconds and provide an analysis."
    },
    {
      question: "How accurate is the disease detection?",
      answer: "Our AI model, AgroVision v3, has been trained on over 500,000 images of Indian crops and diseases. It currently boasts a 96.3% accuracy rate under good lighting conditions."
    },
    {
      question: "Can I manage multiple fields or farms?",
      answer: "Yes. You can save multiple farm profiles within the Settings page. For features like Soil Analysis and Fertilizer Suggestion, you can select which field you are analyzing using the dropdown selector at the top."
    },
    {
      question: "How are the market prices calculated?",
      answer: "Market Insights are updated daily by aggregating live data from 500+ mandis (markets) across India through government API integrations and partner networks."
    },
    {
      question: "How do I upgrade to AgroSmart Pro?",
      answer: "You can upgrade your plan by navigating to the Billing section (click your profile on the top right, then select Billing). The Pro plan gives you unlimited daily scans and predictive yield analytics."
    }
  ]

  const categories = [
    { icon: BookOpen, title: "Getting Started", desc: "Basic guides to set up your farm" },
    { icon: Zap, title: "AI Features", desc: "How to use scanning & insights" },
    { icon: FileText, title: "Account & Billing", desc: "Manage subscription and details" },
    { icon: MessageCircle, title: "Community", desc: "Connect with other farmers" }
  ]

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Page Title & Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Help Center</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Find answers, guides, and support for AgroSmart
          </p>
        </div>
      </div>

      {/* Hero Search Box */}
      <div className="glass rounded-2xl p-8 relative overflow-hidden bg-primary/5 border-primary/20">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-xl font-bold text-foreground mb-4">How can we help you today?</h2>
          <div className="relative mx-auto max-w-lg">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for articles, guides, or FAQs..."
              className="h-12 w-full rounded-2xl border border-primary/30 bg-background/50 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
            />
            <Button className="absolute right-1 top-1 h-10 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Categories & Contact */}
        <div className="flex flex-col gap-6">
          {/* Categories Grid */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {categories.map((cat, idx) => (
              <button 
                key={idx} 
                className="flex items-start gap-4 p-4 rounded-xl glass hover:bg-muted/50 transition-colors text-left border border-border/40 group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <cat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{cat.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Contact Support Card */}
          <div className="glass rounded-2xl p-6 bg-gradient-to-br from-card/80 to-muted/30">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Still need help?
            </h3>
            <p className="text-sm text-foreground mb-6">
              Our agriculture experts are ready to assist you with any questions.
            </p>
            
            <div className="flex flex-col gap-3">
              <Button className="w-full gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20">
                <MessageCircle className="h-4 w-4" />
                Live Chat Support
              </Button>
              <Button variant="outline" className="w-full gap-2 rounded-xl border-border/50 bg-transparent hover:bg-muted">
                <Phone className="h-4 w-4" />
                1800-123-AGRO
              </Button>
              <Button variant="outline" className="w-full gap-2 rounded-xl border-border/50 bg-transparent hover:bg-muted">
                <Mail className="h-4 w-4" />
                support@agrosmart.in
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - FAQs */}
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl p-6 h-full border border-border/50">
            <div className="flex items-center gap-2 mb-6 border-b border-border/50 pb-4">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Frequently Asked Questions</h2>
            </div>
            
            <div className="flex flex-col gap-3">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                    openFaq === idx 
                      ? "border-primary/50 bg-primary/[0.02] shadow-sm shadow-primary/5" 
                      : "border-border/40 bg-muted/10 hover:bg-muted/30"
                  }`}
                >
                  <button
                    className="flex w-full items-center justify-between p-4 text-left"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  >
                    <span className="text-sm font-semibold text-foreground">{faq.question}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="h-4 w-4 text-primary shrink-0 transition-transform" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform" />
                    )}
                  </button>
                  
                  <div 
                    className={`px-4 pb-4 text-sm text-muted-foreground leading-relaxed transition-all duration-300 origin-top ${
                      openFaq === idx ? "block animate-in fade-in slide-in-from-top-2" : "hidden"
                    }`}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <button className="text-sm font-medium text-primary hover:underline underline-offset-4">
                View all 45 FAQs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
