"use client"

import { Home, Search, Plus, MessageSquare, User } from "lucide-react"
import { cn } from "@/lib/utils"

export type TabId = "home" | "discover" | "create" | "inbox" | "profile"

const navItems: { icon: typeof Home; label: string; id: TabId; isSpecial?: boolean }[] = [
  { icon: Home, label: "Home", id: "home" },
  { icon: Search, label: "Discover", id: "discover" },
  { icon: Plus, label: "Create", id: "create", isSpecial: true },
  { icon: MessageSquare, label: "Inbox", id: "inbox" },
  { icon: User, label: "Profile", id: "profile" },
]

interface BottomNavProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          if (item.isSpecial) {
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="flex flex-col items-center justify-center"
              >
                <div className="flex h-10 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-accent to-primary">
                  <Plus className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
              </button>
            )
          }

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-all",
                isActive ? "text-white" : "text-white/60"
              )}
            >
              <Icon 
                className={cn(
                  "h-6 w-6 transition-transform",
                  isActive && "scale-110"
                )} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
      {/* Safe area for iOS */}
      <div className="h-safe-area-inset-bottom bg-black" />
    </nav>
  )
}
