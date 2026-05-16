"use client"

import { X, Link2, Download, Flag, MessageCircle, Send, Copy, Facebook, Twitter } from "lucide-react"
import { cn } from "@/lib/utils"

const SHARE_OPTIONS = [
  { id: "message", label: "Message", icon: MessageCircle, color: "bg-blue-500" },
  { id: "whatsapp", label: "WhatsApp", icon: Send, color: "bg-green-500" },
  { id: "facebook", label: "Facebook", icon: Facebook, color: "bg-blue-600" },
  { id: "twitter", label: "Twitter", icon: Twitter, color: "bg-sky-500" },
]

const MORE_OPTIONS = [
  { id: "copy", label: "Copy link", icon: Link2 },
  { id: "download", label: "Save video", icon: Download },
  { id: "report", label: "Report", icon: Flag },
]

export function ShareSheet({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  const handleShare = (optionId: string) => {
    console.log("Sharing via:", optionId)
    // In a real app, this would trigger the native share APIs
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Sheet */}
      <div className="relative w-full bg-background rounded-t-3xl animate-in slide-in-from-bottom duration-300">
        {/* Handle */}
        <div className="flex justify-center py-2">
          <div className="w-10 h-1 rounded-full bg-muted" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3 border-b border-border">
          <span className="text-base font-semibold text-foreground">Share to</span>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Share Options */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-around">
            {SHARE_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => handleShare(option.id)}
                className="flex flex-col items-center gap-2"
              >
                <div className={cn("h-14 w-14 rounded-full flex items-center justify-center", option.color)}>
                  <option.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs text-foreground">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mx-4" />

        {/* More Options */}
        <div className="px-4 py-2">
          {MORE_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={option.id === "copy" ? handleCopyLink : () => handleShare(option.id)}
              className="flex items-center gap-4 w-full py-3 hover:bg-secondary/50 rounded-lg px-2 -mx-2 transition-colors"
            >
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                <option.icon className="h-5 w-5 text-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">{option.label}</span>
            </button>
          ))}
        </div>

        {/* Safe Area */}
        <div className="h-8" />
      </div>
    </div>
  )
}
