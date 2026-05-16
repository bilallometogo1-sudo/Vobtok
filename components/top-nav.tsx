"use client"

import { useState } from "react"
import { Tv, Search } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "following", label: "Following" },
  { id: "foryou", label: "For You" },
]

export function TopNav() {
  const [activeTab, setActiveTab] = useState("foryou")

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-3">
      <button className="rounded-full p-2 transition-colors hover:bg-white/10">
        <Tv className="h-6 w-6 text-white" />
      </button>

      <div className="flex items-center gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative text-base font-semibold transition-colors",
              activeTab === tab.id ? "text-white" : "text-white/60"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute -bottom-1 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-white" />
            )}
          </button>
        ))}
      </div>

      <button className="rounded-full p-2 transition-colors hover:bg-white/10">
        <Search className="h-6 w-6 text-white" />
      </button>
    </header>
  )
}
