"use client"

import { useState } from "react"
import { VideoFeed } from "./video-feed"
import { BottomNav, type TabId } from "./bottom-nav"
import { TopNav } from "./top-nav"
import { ProfilePage } from "./profile-page"
import { DiscoverPage } from "./discover-page"
import { InboxPage } from "./inbox-page"
import { CreatePage } from "./create-page"

export function VobtokApp() {
  const [activeTab, setActiveTab] = useState<TabId>("home")
  const [showCreate, setShowCreate] = useState(false)

  const handleTabChange = (tab: TabId) => {
    if (tab === "create") {
      setShowCreate(true)
    } else {
      setActiveTab(tab)
    }
  }

  return (
    <div className="h-dvh w-full bg-black overflow-hidden">
      {/* Main Content */}
      <main className="h-full">
        {activeTab === "home" && (
          <>
            <TopNav />
            <VideoFeed />
          </>
        )}
        
        {activeTab === "discover" && <DiscoverPage />}
        
        {activeTab === "inbox" && <InboxPage />}
        
        {activeTab === "profile" && <ProfilePage />}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Create Modal */}
      {showCreate && <CreatePage onClose={() => setShowCreate(false)} />}
    </div>
  )
}
