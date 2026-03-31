"use client"

import React, { useCallback, useState } from "react"
import { cn } from "@/lib/utils"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  onImageSelect: (file: File, preview: string) => void
  preview: string | null
  onClear: () => void
}

export function ImageUpload({ onImageSelect, preview, onClear }: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (ev) => {
          onImageSelect(file, ev.target?.result as string)
        }
        reader.readAsDataURL(file)
      }
    },
    [onImageSelect]
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (ev) => {
          onImageSelect(file, ev.target?.result as string)
        }
        reader.readAsDataURL(file)
      }
    },
    [onImageSelect]
  )

  if (preview) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-muted/30">
        <img
          src={preview || "/placeholder.svg"}
          alt="Uploaded crop preview"
          className="h-[320px] w-full object-cover"
          crossOrigin="anonymous"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={onClear}
          className="absolute right-3 top-3 h-8 w-8 rounded-full bg-background/80 text-foreground backdrop-blur-sm hover:bg-background"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Remove image</span>
        </Button>
      </div>
    )
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragOver(true)
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      className={cn(
        "relative flex h-[320px] cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed transition-all duration-300",
        isDragOver
          ? "border-primary bg-primary/5"
          : "border-border/50 bg-muted/20 hover:border-primary/40 hover:bg-muted/30"
      )}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 z-10 cursor-pointer opacity-0"
        aria-label="Upload crop image"
      />
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        {isDragOver ? (
          <ImageIcon className="h-8 w-8 text-primary" />
        ) : (
          <Upload className="h-8 w-8 text-primary" />
        )}
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">
          {isDragOver ? "Drop your image here" : "Drag & drop your crop image"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          or click to browse - PNG, JPG up to 10MB
        </p>
      </div>
    </div>
  )
}
