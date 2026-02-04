"use client";

import { Play, Pause, X, Music } from "lucide-react";
import type { MusicTrack } from "@/lib/data/music";

interface MiniPlayerProps {
  track: MusicTrack | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
  onExpand: () => void;
}

function truncateTitle(title: string, maxWords = 3) {
  const words = title.split(" ");
  return words.length <= maxWords
    ? title
    : words.slice(0, maxWords).join(" ") + "...";
}

export function MiniPlayer({
  track,
  isPlaying,
  onTogglePlay,
  onClose,
  onExpand,
}: MiniPlayerProps) {
  if (!track) return null;

  return (
    <div className="flex items-center gap-2">
      {/* Music icon / expand */}
      <button
        onClick={onExpand}
        className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition"
        title="Open player"
      >
        <Music className="w-4 h-4" />
      </button>

      {/* Title */}
      <button
        onClick={onExpand}
        className="text-sm font-medium text-foreground max-w-[120px] truncate hover:underline"
        title={track.title}
      >
        {truncateTitle(track.title)}
      </button>

      {/* Play / Pause */}
      <button
        onClick={onTogglePlay}
        className="w-8 h-8 rounded-full flex items-center justify-center border border-border hover:bg-secondary transition"
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4 ml-0.5" />
        )}
      </button>

      {/* Stop */}
      <button
        onClick={onClose}
        className="w-8 h-8 rounded-full flex items-center justify-center border border-border hover:bg-secondary transition"
        title="Stop"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
