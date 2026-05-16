"use client"

import { useState } from "react"
import { Search, TrendingUp, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const TRENDING_SEARCHES = [
  "Dance challenge 2024",
  "Cooking hacks",
  "Travel vlog",
  "Pet fails",
  "Fitness motivation",
]

const CATEGORIES = [
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "music", label: "Music", emoji: "🎵" },
  { id: "comedy", label: "Comedy", emoji: "😂" },
  { id: "sports", label: "Sports", emoji: "⚽" },
  { id: "gaming", label: "Gaming", emoji: "🎮" },
  { id: "food", label: "Food", emoji: "🍔" },
]

const DISCOVER_CONTENT = [
  {
    id: "1",
    type: "hashtag",
    title: "#DanceChallenge",
    views: "2.4B views",
    thumbnail: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=500&fit=crop",
    isLarge: true,
  },
  {
    id: "2",
    type: "hashtag",
    title: "#CookingHacks",
    views: "890M views",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
  },
  {
    id: "3",
    type: "hashtag",
    title: "#TravelGoals",
    views: "1.2B views",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
  },
  {
    id: "4",
    type: "sound",
    title: "Original Sound - Artist",
    views: "456K videos",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=500&fit=crop",
    isLarge: true,
  },
  {
    id: "5",
    type: "hashtag",
    title: "#FitnessLife",
    views: "670M views",
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=300&fit=crop",
  },
  {
    id: "6",
    type: "hashtag",
    title: "#PetLovers",
    views: "2.1B views",
    thumbnail: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop",
  },
  {
    id: "7",
    type: "sound",
    title: "Viral Beat 2024",
    views: "1.8M videos",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
  },
  {
    id: "8",
    type: "hashtag",
    title: "#OOTD",
    views: "980M views",
    thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop",
  },
]

export function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("trending")
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm px-4 py-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            placeholder="Search"
            className="pl-10 pr-10 bg-secondary border-0 text-foreground placeholder:text-muted-foreground"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search Suggestions */}
        {isSearchFocused && !searchQuery && (
          <div className="absolute left-0 right-0 top-full bg-background border-b border-border shadow-lg z-20">
            <div className="px-4 py-2">
              <p className="text-xs text-muted-foreground mb-2">Trending searches</p>
              {TRENDING_SEARCHES.map((search, i) => (
                <button
                  key={i}
                  onClick={() => setSearchQuery(search)}
                  className="flex items-center gap-3 py-2 w-full text-left hover:bg-secondary/50 rounded-lg px-2 -mx-2"
                >
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">{search}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              selectedCategory === category.id
                ? "bg-foreground text-background"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {category.icon ? (
              <category.icon className="h-4 w-4" />
            ) : (
              <span>{category.emoji}</span>
            )}
            {category.label}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="flex-1 overflow-y-auto px-2 pb-20">
        <div className="grid grid-cols-2 gap-2">
          {DISCOVER_CONTENT.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "relative rounded-lg overflow-hidden cursor-pointer group",
                item.isLarge ? "row-span-2" : ""
              )}
            >
              <div className={cn("relative", item.isLarge ? "aspect-[9/16]" : "aspect-square")}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white font-semibold text-sm line-clamp-2 drop-shadow-lg">
                    {item.title}
                  </p>
                  <p className="text-white/80 text-xs mt-0.5 drop-shadow-lg">{item.views}</p>
                </div>
                {item.type === "sound" && (
                  <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1.5">
                    <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
