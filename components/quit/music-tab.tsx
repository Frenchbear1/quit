"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Music, ChevronDown, ChevronUp } from "lucide-react";
import { musicTracks, musicCategories, type MusicTrack } from "@/lib/data/music";

interface MusicTabProps {
  onPlayTrack?: (track: MusicTrack) => void;
  currentPlayingTrack?: MusicTrack | null;
}

export function MusicTab({ onPlayTrack, currentPlayingTrack }: MusicTabProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null);

  const filteredTracks =
    activeCategory === "all"
      ? musicTracks
      : musicTracks.filter((t) => t.category === activeCategory);

  const handlePlay = (track: MusicTrack) => {
    if (onPlayTrack) {
      onPlayTrack(track);
    }
  };

  const toggleExpand = (trackId: string) => {
    setExpandedTrack((prev) => (prev === trackId ? null : trackId));
  };

  return (
    <div className="min-h-full pb-24">
      {/* Category Filter */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 px-4 py-4 border-b border-border">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {musicCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Header Message */}
      <div className="px-4 py-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Music className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-card-foreground font-medium mb-1">
                Fill your mind with something better.
              </p>
              <p className="text-muted-foreground text-sm">
                These songs speak truth over your life. Let them replace the lies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Track List */}
      <div className="px-4 space-y-3">
        {filteredTracks.map((track, index) => {
          const isExpanded = expandedTrack === track.id;
          const isCurrentlyPlaying = currentPlayingTrack?.id === track.id;

          return (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={`bg-card border rounded-xl overflow-hidden ${
                isCurrentlyPlaying ? "border-primary" : "border-border"
              }`}
            >
              {/* Track Header */}
              <div className="p-4">
                <div className="flex items-center gap-3">
                  {/* Play Button */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handlePlay(track)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                      isCurrentlyPlaying
                        ? "bg-primary shadow-primary/20"
                        : "bg-primary shadow-primary/20"
                    }`}
                    title={isCurrentlyPlaying ? "Now Playing" : "Play"}
                  >
                    {isCurrentlyPlaying ? (
                      <Pause className="w-5 h-5 text-primary-foreground" />
                    ) : (
                      <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                    )}
                  </motion.button>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold truncate ${
                      isCurrentlyPlaying ? "text-primary" : "text-card-foreground"
                    }`}>
                      {track.title}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {track.artist}
                    </p>
                  </div>

                  {/* Now Playing indicator */}
                  {isCurrentlyPlaying && (
                    <div className="flex items-center gap-1 mr-2">
                      <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
                      <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.1s" }} />
                      <div className="w-1 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                    </div>
                  )}

                  {/* Expand Button */}
                  <button
                    onClick={() => toggleExpand(track.id)}
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    title={isExpanded ? "Collapse" : "Expand"}
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Tags */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  {track.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && track.description && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-0">
                      <div className="p-3 bg-secondary/50 rounded-lg">
                        <p className="text-sm text-muted-foreground italic">
                          {track.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
