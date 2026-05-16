"use client"

import { useState, useRef } from "react"
import { X, Zap, Timer, Music2, Smile, Filter, RotateCcw, Upload, Camera, Image as ImageIcon, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const EFFECTS = [
  { id: "none", label: "None" },
  { id: "beauty", label: "Beauty" },
  { id: "vintage", label: "Vintage" },
  { id: "bw", label: "B&W" },
  { id: "warm", label: "Warm" },
  { id: "cool", label: "Cool" },
]

const DURATIONS = [
  { id: "15", label: "15s" },
  { id: "60", label: "60s" },
  { id: "180", label: "3m" },
  { id: "600", label: "10m" },
]

export function CreatePage({ onClose }: { onClose: () => void }) {
  const [selectedDuration, setSelectedDuration] = useState("60")
  const [selectedEffect, setSelectedEffect] = useState("none")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingProgress, setRecordingProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false)
      setRecordingProgress(0)
    } else {
      setIsRecording(true)
      // Simulate recording progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 1
        setRecordingProgress(progress)
        if (progress >= 100) {
          clearInterval(interval)
          setIsRecording(false)
          setRecordingProgress(0)
        }
      }, parseInt(selectedDuration) * 10)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Camera Preview (placeholder) */}
      <div className="flex-1 relative bg-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Camera preview</p>
          </div>
        </div>

        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white bg-black/30 hover:bg-black/50">
            <X className="h-6 w-6" />
          </Button>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-white bg-black/30 hover:bg-black/50">
              <Music2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white bg-black/30 hover:bg-black/50">
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Duration Selector */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 flex gap-1 bg-black/40 rounded-full p-1">
          {DURATIONS.map((duration) => (
            <button
              key={duration.id}
              onClick={() => setSelectedDuration(duration.id)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                selectedDuration === duration.id
                  ? "bg-white text-black"
                  : "text-white/80 hover:text-white"
              )}
            >
              {duration.label}
            </button>
          ))}
        </div>

        {/* Right Side Tools */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
          <button className="flex flex-col items-center gap-1 text-white">
            <div className="bg-black/30 rounded-full p-3">
              <Zap className="h-5 w-5" />
            </div>
            <span className="text-[10px]">Flash</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white">
            <div className="bg-black/30 rounded-full p-3">
              <Timer className="h-5 w-5" />
            </div>
            <span className="text-[10px]">Timer</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white">
            <div className="bg-black/30 rounded-full p-3">
              <Filter className="h-5 w-5" />
            </div>
            <span className="text-[10px]">Filters</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white">
            <div className="bg-black/30 rounded-full p-3">
              <Smile className="h-5 w-5" />
            </div>
            <span className="text-[10px]">Effects</span>
          </button>
        </div>

        {/* Effects Bar */}
        <div className="absolute bottom-32 left-0 right-0 px-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
            {EFFECTS.map((effect) => (
              <button
                key={effect.id}
                onClick={() => setSelectedEffect(effect.id)}
                className={cn(
                  "flex-shrink-0 w-16 h-16 rounded-lg border-2 flex items-center justify-center text-xs font-medium",
                  selectedEffect === effect.id
                    ? "border-primary bg-primary/20 text-white"
                    : "border-white/30 bg-black/30 text-white/80"
                )}
              >
                {effect.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="bg-black p-4 pb-8">
        <div className="flex items-center justify-around">
          {/* Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center gap-1"
          >
            <div className="h-10 w-10 rounded-lg border border-white/30 flex items-center justify-center overflow-hidden">
              <Upload className="h-5 w-5 text-white" />
            </div>
            <span className="text-[10px] text-white/70">Upload</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,image/*"
            className="hidden"
          />

          {/* Record Button */}
          <div className="relative">
            {isRecording && (
              <svg className="absolute -inset-2 w-24 h-24 -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-white/20"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray={276.46}
                  strokeDashoffset={276.46 * (1 - recordingProgress / 100)}
                  className="text-primary transition-all"
                />
              </svg>
            )}
            <button
              onClick={handleRecord}
              className={cn(
                "relative h-20 w-20 rounded-full border-4 border-white flex items-center justify-center transition-all",
                isRecording ? "scale-90" : "hover:scale-105"
              )}
            >
              <div
                className={cn(
                  "transition-all",
                  isRecording
                    ? "h-8 w-8 rounded-md bg-primary"
                    : "h-16 w-16 rounded-full bg-primary"
                )}
              />
            </button>
          </div>

          {/* Photo Mode */}
          <button className="flex flex-col items-center gap-1">
            <div className="h-10 w-10 rounded-lg border border-white/30 flex items-center justify-center">
              <ImageIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-[10px] text-white/70">Photo</span>
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <button className="text-white/50 text-sm">Photo</button>
          <button className="text-white font-semibold text-sm border-b-2 border-white pb-1">Video</button>
          <button className="text-white/50 text-sm">Templates</button>
        </div>
      </div>
    </div>
  )
}
