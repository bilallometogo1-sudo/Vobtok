"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { VideoCard } from "./video-card"

const SAMPLE_VIDEOS = [
  {
    id: "1",
    username: "creative_chef",
    userAvatar: "https://i.pravatar.cc/150?img=1",
    description: "Making the perfect pasta from scratch! This recipe has been in my family for generations. Try it out!",
    song: "Italian Kitchen Vibes - Chef Beats",
    likes: 125400,
    comments: 3420,
    shares: 1890,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=700&fit=crop",
  },
  {
    id: "2",
    username: "travel_adventures",
    userAvatar: "https://i.pravatar.cc/150?img=2",
    description: "Sunset at Santorini - one of the most beautiful places on Earth! Who wants to go?",
    song: "Wanderlust - Travel Tunes",
    likes: 89200,
    comments: 1240,
    shares: 4320,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=700&fit=crop",
  },
  {
    id: "3",
    username: "fitness_guru",
    userAvatar: "https://i.pravatar.cc/150?img=3",
    description: "5 minute morning workout that will change your life! No equipment needed. Let's get it!",
    song: "Pump It Up - Workout Mix",
    likes: 234500,
    comments: 8760,
    shares: 12300,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=700&fit=crop",
  },
  {
    id: "4",
    username: "pet_paradise",
    userAvatar: "https://i.pravatar.cc/150?img=4",
    description: "My golden retriever learning a new trick! He's so smart. Drop a heart if you love dogs!",
    song: "Happy Paws - Pet Sounds",
    likes: 567800,
    comments: 23400,
    shares: 45600,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=700&fit=crop",
  },
  {
    id: "5",
    username: "tech_reviewer",
    userAvatar: "https://i.pravatar.cc/150?img=5",
    description: "Unboxing the latest smartphone! Is it worth the hype? Let me know your thoughts.",
    song: "Tech Vibes - Digital Dreams",
    likes: 178900,
    comments: 5670,
    shares: 8900,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=700&fit=crop",
  },
]

export function VideoFeed() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop
      const height = containerRef.current.clientHeight
      const newIndex = Math.round(scrollTop / height)
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < SAMPLE_VIDEOS.length) {
        setActiveIndex(newIndex)
      }
    }
  }, [activeIndex])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  return (
    <div 
      ref={containerRef}
      className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
    >
      {SAMPLE_VIDEOS.map((video, index) => (
        <div key={video.id} className="h-full w-full snap-start">
          <VideoCard video={video} isActive={index === activeIndex} />
        </div>
      ))}
    </div>
  )
}
