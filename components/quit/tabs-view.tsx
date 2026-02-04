"use client";

import React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  AlertTriangle, 
  Zap, 
  Video,
  Music,
  ChevronLeft
} from "lucide-react";
import { VersesTab } from "./verses-tab";
import { RealityCheckTab } from "./reality-check-tab";
import { ExitActionsTab } from "./exit-actions-tab";
import { VideosTab } from "./videos-tab";
import { MusicTab } from "./music-tab";
import type { MusicTrack } from "@/lib/data/music";
import { MiniPlayer } from "./mini-player";

type Tab = "verses" | "reality" | "actions" | "videos" | "music";

interface TabsViewProps {
  onBack: () => void;
  playLaterVideos: string[];
  onTogglePlayLater: (videoId: string) => void;
  onLogTrigger: (triggers: string[], actionCompleted: string) => void;

  onPlayMusic?: (track: MusicTrack) => void;
  currentPlayingTrack?: MusicTrack | null;

  isPlaying?: boolean;
  onTogglePlay?: () => void;
  onClosePlayer?: () => void;
  onExpandPlayer?: () => void;
  showFullscreen?: boolean;
}

const tabs: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "verses", label: "Verses", icon: BookOpen },
  { id: "reality", label: "Reality", icon: AlertTriangle },
  { id: "actions", label: "Actions", icon: Zap },
  { id: "videos", label: "Videos", icon: Video },
  { id: "music", label: "Music", icon: Music },
];

export function TabsView({
  onBack,
  playLaterVideos,
  onTogglePlayLater,
  onLogTrigger,
  onPlayMusic,
  currentPlayingTrack,
  isPlaying,
  onTogglePlay,
  onClosePlayer,
  onExpandPlayer,
  showFullscreen,
}: TabsViewProps) {

  const [activeTab, setActiveTab] = useState<Tab>("verses");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-border bg-background/95 backdrop-blur-sm">
        {/* Left */}
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Home</span>
        </button>

        {/* Center */}
        <h1 className="font-bold text-foreground">QUIT</h1>

        {/* Right */}
        {currentPlayingTrack && !showFullscreen && onTogglePlay && onClosePlayer && onExpandPlayer && (
          <MiniPlayer
            track={currentPlayingTrack}
            isPlaying={!!isPlaying}
            onTogglePlay={onTogglePlay}
            onClose={onClosePlayer}
            onExpand={onExpandPlayer}
          />
        )}
      </header>

      {/* Tab Bar */}
      <div className="flex bg-secondary/50 border-b border-border overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[64px] flex flex-col items-center gap-1 py-3 px-2 relative transition-colors ${
                isActive 
                  ? "text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <main className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {activeTab === "verses" && (
            <motion.div
              key="verses"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.15 }}
            >
              <VersesTab />
            </motion.div>
          )}
          
          {activeTab === "reality" && (
            <motion.div
              key="reality"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.15 }}
            >
              <RealityCheckTab />
            </motion.div>
          )}
          
          {activeTab === "actions" && (
            <motion.div
              key="actions"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.15 }}
            >
              <ExitActionsTab onLogTrigger={onLogTrigger} />
            </motion.div>
          )}
          
          {activeTab === "videos" && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.15 }}
            >
              <VideosTab 
                playLaterVideos={playLaterVideos}
                onTogglePlayLater={onTogglePlayLater}
              />
            </motion.div>
          )}

          {activeTab === "music" && (
            <motion.div
              key="music"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.15 }}
            >
              <MusicTab onPlayTrack={onPlayMusic} currentPlayingTrack={currentPlayingTrack} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
