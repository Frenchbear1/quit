"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  AlertTriangle,
  Zap,
  Video,
  Music,
  ChevronLeft,
  Play,
} from "lucide-react";

import { VersesTab } from "./verses-tab";
import { RealityCheckTab } from "./reality-check-tab";
import { ExitActionsTab } from "./exit-actions-tab";
import { VideosTab } from "./videos-tab";
import { MusicTab } from "./music-tab";
import { MiniPlayer } from "./mini-player";

import type { MusicTrack } from "@/lib/data/music";
import { autoplayTrack } from "@/lib/data/music";

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

const tabs = [
  { id: "verses", label: "Verses", icon: BookOpen },
  { id: "reality", label: "Reality", icon: AlertTriangle },
  { id: "actions", label: "Actions", icon: Zap },
  { id: "videos", label: "Videos", icon: Video },
  { id: "music", label: "Music", icon: Music },
] as const;

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

  // 🔑 controls auto-dismiss of Play Music pill
  const [showPlayPrompt, setShowPlayPrompt] = useState(true);

  const shouldShowPlayMusicPrompt =
    showPlayPrompt &&
    !currentPlayingTrack &&
    !!autoplayTrack &&
    !showFullscreen &&
    !!onPlayMusic;

  const shouldShowMiniPlayer =
    !!currentPlayingTrack &&
    !showFullscreen &&
    !!onTogglePlay &&
    !!onClosePlayer &&
    !!onExpandPlayer;

  // ⏱ auto-dismiss Play Music after 5s if nothing is playing
  useEffect(() => {
    if (!shouldShowPlayMusicPrompt) return;

    const timer = setTimeout(() => {
      setShowPlayPrompt(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [shouldShowPlayMusicPrompt]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="relative flex items-center justify-between px-4 py-4 border-b border-border bg-background/95 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Home</span>
        </button>

        <h1 className="absolute left-1/2 -translate-x-1/2 font-bold">
          QUIT
        </h1>

        <div className="w-[78px]" />
      </header>

      {/* Floating bottom UI */}
      <AnimatePresence>
        {shouldShowPlayMusicPrompt && (
          <motion.div
            key="play-music"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="rounded-full bg-background/90 backdrop-blur-md border border-border shadow-lg px-3 py-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setShowPlayPrompt(false);
                  onPlayMusic?.(autoplayTrack!);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/20"
              >
                <Play className="w-4 h-4" />
                <span className="text-sm">Play music</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {shouldShowMiniPlayer && (
          <motion.div
            key="mini-player"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="rounded-full bg-background/90 backdrop-blur-md border border-border shadow-lg px-3 py-2">
              <MiniPlayer
                track={currentPlayingTrack!}
                isPlaying={!!isPlaying}
                onTogglePlay={onTogglePlay!}
                onClose={onClosePlayer!}
                onExpand={onExpandPlayer!}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="flex bg-secondary/50 border-b border-border overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 min-w-[64px] flex flex-col items-center gap-1 py-3 px-2 relative ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
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

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {activeTab === "verses" && <VersesTab />}
          {activeTab === "reality" && <RealityCheckTab />}
          {activeTab === "actions" && (
            <ExitActionsTab onLogTrigger={onLogTrigger} />
          )}
          {activeTab === "videos" && (
            <VideosTab
              playLaterVideos={playLaterVideos}
              onTogglePlayLater={onTogglePlayLater}
            />
          )}
          {activeTab === "music" && (
            <MusicTab
              onPlayTrack={onPlayMusic}
              currentPlayingTrack={currentPlayingTrack}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
