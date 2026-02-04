"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Clock,
  Bookmark,
  BookmarkCheck,
  Play,
  ExternalLink,
  Filter,
  X,
  ArrowDown,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { videos, videoCategories, allVideoTags, type Video } from "@/lib/data/videos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MiniPlayer } from "./mini-player";

interface VideosTabProps {
  playLaterVideos: string[];
  onTogglePlayLater: (videoId: string) => void;
}

type TimeRangeId = "shorts" | "3-5" | "5-10" | "10-15" | "15+";

const timeRanges: { id: TimeRangeId; label: string }[] = [
  { id: "shorts", label: "Shorts" },
  { id: "3-5", label: "3–5 min" },
  { id: "5-10", label: "5–10 min" },
  { id: "10-15", label: "10–15 min" },
  { id: "15+", label: "15+ min" }
];

function parseDurationToSeconds(duration: string): number | null {
  const d = (duration || "").trim();

  // Handle "Short" style labels
  if (!d) return null;
  if (d.toLowerCase() === "short") return 60;

  // mm:ss or hh:mm:ss
  const parts = d.split(":").map(p => p.trim());
  if (parts.length === 2) {
    const mm = Number(parts[0]);
    const ss = Number(parts[1]);
    if (Number.isFinite(mm) && Number.isFinite(ss)) return (mm * 60) + ss;
    return null;
  }
  if (parts.length === 3) {
    const hh = Number(parts[0]);
    const mm = Number(parts[1]);
    const ss = Number(parts[2]);
    if (Number.isFinite(hh) && Number.isFinite(mm) && Number.isFinite(ss)) {
      return (hh * 3600) + (mm * 60) + ss;
    }
    return null;
  }

  return null;
}

function matchesTimeRange(video: Video, range: TimeRangeId): boolean {
  const secs = parseDurationToSeconds(video.duration);

  // If we can't parse, don't accidentally hide it unless user picked "Shorts"
  if (secs == null) {
    return range === "shorts" ? video.duration.trim().toLowerCase() === "short" : true;
  }

  const isShortLabel = video.duration.trim().toLowerCase() === "short";
  if (range === "shorts") return isShortLabel || secs <= 60;

  if (range === "3-5") return secs >= 180 && secs < 300;
  if (range === "5-10") return secs >= 300 && secs < 600;
  if (range === "10-15") return secs >= 600 && secs < 900;
  if (range === "15+") return secs >= 900;

  return true;
}

function isShortVideo(video: Video): boolean {
  const d = (video.duration || "").trim().toLowerCase();
  if (d === "short") return true;
  const secs = parseDurationToSeconds(video.duration);
  return secs != null ? secs <= 60 : false;
}

/**
 * Converts common YouTube URL formats to an embed URL.
 * If it's not YouTube, we fall back to the original URL (still opens in iframe for many hosts).
 */
function toEmbedUrl(url: string, autoplay: boolean, mute: boolean): string {
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");

    const mk = (id: string) => {
      // YouTube looping requires playlist=<id> + loop=1
      const params =
        `autoplay=${autoplay ? 1 : 0}` +
        `&mute=${mute ? 1 : 0}` +
        `&playsinline=1` +
        `&rel=0` +
        `&modestbranding=1` +
        `&loop=1` +
        `&playlist=${encodeURIComponent(id)}`;

      return `https://www.youtube.com/embed/${id}?${params}`;
    };

    // youtu.be/<id>
    if (host === "youtu.be") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (id) return mk(id);
    }

    // youtube.com/watch?v=<id>
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname === "/watch") {
        const id = u.searchParams.get("v");
        if (id) return mk(id);
      }

      // youtube.com/shorts/<id>
      if (u.pathname.startsWith("/shorts/")) {
        const id = u.pathname.split("/").filter(Boolean)[1];
        if (id) return mk(id);
      }

      // youtube.com/embed/<id>
      if (u.pathname.startsWith("/embed/")) {
        const id = u.pathname.split("/").filter(Boolean)[1];
        if (id) return mk(id);
      }
    }

    // Not YouTube: fall back
    return url;
  } catch {
    return url;
  }
}

export function VideosTab({ playLaterVideos, onTogglePlayLater }: VideosTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRangeId | null>(null);
  const [showPlayLater, setShowPlayLater] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Scroll-mode state
  const [scrollModeOpen, setScrollModeOpen] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);

  const filteredVideos = useMemo(() => {
    let result = videos;

    if (showPlayLater) {
      result = result.filter(v => playLaterVideos.includes(v.id));
    }

    if (selectedCategory) {
      result = result.filter(v => v.category === selectedCategory);
    }

    if (selectedTimeRange) {
      result = result.filter(v => matchesTimeRange(v, selectedTimeRange));
    }

    if (selectedTags.length > 0) {
      result = result.filter(v => selectedTags.some(tag => v.tags.includes(tag)));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(v =>
        v.title.toLowerCase().includes(query) ||
        v.description.toLowerCase().includes(query) ||
        v.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    return result;
  }, [
    searchQuery,
    selectedCategory,
    selectedTimeRange,
    selectedTags,
    showPlayLater,
    playLaterVideos
  ]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTimeRange(null);
    setSelectedTags([]);
    setShowPlayLater(false);
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedCategory ||
    selectedTimeRange ||
    selectedTags.length > 0 ||
    showPlayLater ||
    searchQuery;

  const openScrollMode = () => {
    if (filteredVideos.length === 0) return;
    setScrollIndex(0);
    setScrollModeOpen(true);
  };

  return (
    <div className="min-h-full pb-24">
      {/* Search and Filter Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 px-4 py-4 border-b border-border space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search videos..."
            className="pl-10 bg-secondary border-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Toggle and Play Later */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={showFilters ? "secondary" : "outline"}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && <span className="w-2 h-2 bg-primary rounded-full" />}
          </Button>

          <Button
            variant={showPlayLater ? "default" : "outline"}
            size="sm"
            onClick={() => setShowPlayLater(!showPlayLater)}
            className="gap-2"
          >
            <Bookmark className="w-4 h-4" />
            Play Later ({playLaterVideos.length})
          </Button>

          {/* NEW: Scroll mode button next to Play Later */}
          <Button
            variant="outline"
            size="sm"
            onClick={openScrollMode}
            disabled={filteredVideos.length === 0}
            className="gap-2"
            title="Scroll through the current filtered list"
          >
            <ArrowDown className="w-4 h-4" />
            Scroll ({filteredVideos.length})
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground"
            >
              Clear
            </Button>
          )}
        </div>

        {/* Category and Tag Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 pt-2"
          >
            {/* Categories */}
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Category
              </p>
              <div className="flex flex-wrap gap-2">
                {videoCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() =>
                      setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
                    }
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedCategory === cat.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time */}
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Time
              </p>
              <div className="flex flex-wrap gap-2">
                {timeRanges.map((r) => (
                  <button
                    key={r.id}
                    onClick={() =>
                      setSelectedTimeRange(selectedTimeRange === r.id ? null : r.id)
                    }
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedTimeRange === r.id
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {allVideoTags.slice(0, 12).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedTags.includes(tag)
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Videos List */}
      <div className="px-4 py-4 space-y-3">
        {filteredVideos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {showPlayLater ? "No videos saved for later." : "No videos match your filters."}
            </p>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="mt-4"
              >
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          filteredVideos.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              index={index}
              isInPlayLater={playLaterVideos.includes(video.id)}
              onTogglePlayLater={() => onTogglePlayLater(video.id)}
            />
          ))
        )}
      </div>

      {/* Scroll-mode overlay */}
      {scrollModeOpen && (
        <ScrollModeViewer
          videos={filteredVideos}
          initialIndex={scrollIndex}
          onClose={() => setScrollModeOpen(false)}
        />
      )}
    </div>
  );
}

function VideoCard({
  video,
  index,
  isInPlayLater,
  onTogglePlayLater
}: {
  video: Video;
  index: number;
  isInPlayLater: boolean;
  onTogglePlayLater: () => void;
}) {
  const categoryLabel =
    videoCategories.find((c) => c.id === video.category)?.label || video.category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                {categoryLabel}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {video.duration}
              </span>
            </div>
            <h3 className="font-semibold text-card-foreground leading-tight">
              {video.title}
            </h3>
          </div>
          <button
            onClick={onTogglePlayLater}
            className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
              isInPlayLater
                ? "bg-primary/10 text-primary"
                : "hover:bg-secondary text-muted-foreground"
            }`}
          >
            {isInPlayLater ? (
              <BookmarkCheck className="w-5 h-5" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {video.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {video.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-secondary rounded text-xs text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors"
          >
            <Play className="w-4 h-4" />
            Watch
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");

    // youtu.be/<id>
    if (host === "youtu.be") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id || null;
    }

    // youtube.com/watch?v=<id>
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname === "/watch") {
        return u.searchParams.get("v");
      }

      // youtube.com/shorts/<id>
      if (u.pathname.startsWith("/shorts/")) {
        const parts = u.pathname.split("/").filter(Boolean);
        return parts[1] || null;
      }

      // youtube.com/embed/<id>
      if (u.pathname.startsWith("/embed/")) {
        const parts = u.pathname.split("/").filter(Boolean);
        return parts[1] || null;
      }
    }

    return null;
  } catch {
    return null;
  }
}

function loadYouTubeIframeAPI(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  // already loaded
  if ((window as any).YT?.Player) return Promise.resolve();

  return new Promise((resolve) => {
    const existing = document.getElementById("yt-iframe-api");
    if (existing) {
      // wait until ready
      const check = setInterval(() => {
        if ((window as any).YT?.Player) {
          clearInterval(check);
          resolve();
        }
      }, 50);
      return;
    }

    const tag = document.createElement("script");
    tag.id = "yt-iframe-api";
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    (window as any).onYouTubeIframeAPIReady = () => resolve();
  });
}

function ScrollModeViewer({
  videos,
  initialIndex,
  onClose
}: {
  videos: Video[];
  initialIndex: number;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(
    Math.max(0, Math.min(initialIndex, videos.length - 1))
  );

  // info popup (hidden by default)
  const [showInfo, setShowInfo] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

  // one single YT player for the whole experience
  const playerRef = useRef<any>(null);
  const readyRef = useRef(false);

  const lastUserPauseAtRef = useRef<number>(0);

  // store watch progress per video id (seconds)
  const progressRef = useRef<Record<string, number>>({});
  const currentVideoIdRef = useRef<string | null>(null);

  const scrollToIndex = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(idx, videos.length - 1));
      const el = itemRefs.current[clamped];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [videos.length]
  );

  // lock background scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Jump to initial index on open
  useEffect(() => {
    const t = window.setTimeout(() => scrollToIndex(activeIndex), 0);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track which item is active
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const obs = new IntersectionObserver(
      (entries) => {
        let bestIdx = activeIndex;
        let bestRatio = 0;

        for (const e of entries) {
          const idx = Number((e.target as HTMLElement).dataset.index || "0");
          if (e.isIntersecting && e.intersectionRatio > bestRatio) {
            bestRatio = e.intersectionRatio;
            bestIdx = idx;
          }
        }

        if (bestIdx !== activeIndex) setActiveIndex(bestIdx);
      },
      { root, threshold: [0.45, 0.6, 0.75] }
    );

    itemRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [activeIndex]);

  // reset info popup when you change videos
  useEffect(() => {
    setShowInfo(false);
  }, [activeIndex]);

  // ESC + arrow keys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") scrollToIndex(activeIndex + 1);
      if (e.key === "ArrowUp") scrollToIndex(activeIndex - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, onClose, scrollToIndex]);

  // Create the ONE YouTube player
  useEffect(() => {
    let cancelled = false;

    (async () => {
      await loadYouTubeIframeAPI();
      if (cancelled) return;

      const first = videos[activeIndex];
      const firstId = first ? getYouTubeId(first.url) : null;

      // If not YT, we still create the player but it won't work for that item
      if (!firstId) return;

      const YT = (window as any).YT;
      if (!YT?.Player) return;

      // ensure container exists
      const el = document.getElementById("yt-shorts-player");
      if (!el) return;

      playerRef.current = new YT.Player("yt-shorts-player", {
        videoId: firstId,
        playerVars: {
          autoplay: 1,
          controls: 1,          // ✅ bring back timeline + pause/play
          disablekb: 0,
          fs: 1,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          origin: window.location.origin // ✅ prevents some playback API errors
        },
        events: {
          onReady: () => {
            readyRef.current = true;
            currentVideoIdRef.current = firstId;

            try {
              playerRef.current.unMute?.();
              playerRef.current.setVolume?.(100);
              playerRef.current.playVideo?.();
            } catch {}
          },

          onStateChange: (e: any) => {
            // 2 = paused
            if (e?.data === 2) {
              lastUserPauseAtRef.current = Date.now();
              setIsPaused(true);
              return;
            }

            // 1 = playing, 3 = buffering
            if (e?.data === 1 || e?.data === 3) {
              setIsPaused(false);
            }

            // 0 = ended (loop)
            if (e?.data === 0) {
              setIsPaused(false);
              try {
                playerRef.current.seekTo?.(0, true);
                playerRef.current.unMute?.();
                playerRef.current.setVolume?.(100);

                // don't instantly re-play if user literally just paused
                if (Date.now() - lastUserPauseAtRef.current > 700) {
                  playerRef.current.playVideo?.();
                }
              } catch {}
            }
          }
        }
      });
    })();

    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy?.();
      } catch {}
      playerRef.current = null;
      readyRef.current = false;
      currentVideoIdRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When activeIndex changes: save old time, switch to new, resume time, play unmuted
  useEffect(() => {
    if (!readyRef.current || !playerRef.current) return;

    const next = videos[activeIndex];
    if (!next) return;

    const nextId = getYouTubeId(next.url);
    if (!nextId) return;

    // save progress of previous
    const prevId = currentVideoIdRef.current;
    if (prevId) {
      try {
        const t = playerRef.current.getCurrentTime?.();
        if (typeof t === "number" && !Number.isNaN(t)) {
          progressRef.current[prevId] = t;
        }
      } catch {}
    }

    // pause old
    try {
      playerRef.current.pauseVideo?.();
    } catch {}

    const resumeTime = progressRef.current[nextId] ?? 0;

        const shouldAutoPlay = Date.now() - lastUserPauseAtRef.current > 700;

    try {
      playerRef.current.loadVideoById({
        videoId: nextId,
        startSeconds: resumeTime
      });

      if (shouldAutoPlay) playerRef.current.playVideo?.();
    } catch {
      try {
        playerRef.current.loadVideoById(nextId, resumeTime);
        if (shouldAutoPlay) playerRef.current.playVideo?.();
      } catch {}
    }

    currentVideoIdRef.current = nextId;
  }, [activeIndex, videos]);

  const activeVideo = videos[activeIndex];
  const activeIsShort = activeVideo ? isShortVideo(activeVideo) : true;
    const [showYoutubeToast, setShowYoutubeToast] = useState(false);

  useEffect(() => {
    if (!activeIsShort && activeVideo) {
      setShowYoutubeToast(true);

      const t = window.setTimeout(() => {
        setShowYoutubeToast(false);
      }, 10000);

      return () => window.clearTimeout(t);
    } else {
      setShowYoutubeToast(false);
    }
  }, [activeVideo?.id, activeIsShort]);

  const categoryLabel =
    activeVideo
      ? (videoCategories.find((c) => c.id === activeVideo.category)?.label ||
          activeVideo.category)
      : "";

      useEffect(() => {
    const pauseIfPlaying = () => {
      try {
        const player = playerRef.current;
        if (!player) return;

        const state = player.getPlayerState?.();
        // 1 = playing, 3 = buffering
        if (state === 1 || state === 3) {
          player.pauseVideo?.();
        }
      } catch {}
    };

    const onVisibilityChange = () => {
      // only auto-pause when leaving / hiding
      if (document.hidden) pauseIfPlaying();
    };

    const onBlur = () => pauseIfPlaying();

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onBlur);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

    const togglePlayPause = useCallback(() => {
    try {
      const p = playerRef.current;
      if (!p) return;

      const st = p.getPlayerState?.();
      // 1 = playing, 3 = buffering
      if (st === 1 || st === 3) {
        p.pauseVideo?.();
        setIsPaused(true);
      } else {
        p.playVideo?.();
        setIsPaused(false);
      }
    } catch {}
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black">
            {/* Fixed single player (only one video can ever play) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div
          className={`relative h-full w-full ${activeIsShort ? "max-w-[520px] mx-auto" : ""}`}
        >
          <div id="yt-shorts-player" className="h-full w-full" />

                    {/* Tap layer ONLY while playing.
              When paused, remove it so YouTube receives taps and shows controls. */}
          {!isPaused && (
            <button
              type="button"
              onClick={togglePlayPause}
              className="absolute left-0 right-0 top-0 z-10 bg-transparent"
              style={{ height: "calc(100% - 96px)" }} // leave bottom controls clickable
              aria-label="Toggle play/pause"
            />
          )}

        </div>
      </div>

      {/* Floating controls */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {/* Up/Down */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 pointer-events-auto">
          <button
            onClick={() => scrollToIndex(activeIndex - 1)}
            className="h-10 w-10 rounded-full bg-black/40 border border-white/15 text-white/90 hover:bg-black/55 active:scale-95 transition flex items-center justify-center"
            title="Previous"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollToIndex(activeIndex + 1)}
            className="h-10 w-10 rounded-full bg-black/40 border border-white/15 text-white/90 hover:bg-black/55 active:scale-95 transition flex items-center justify-center"
            title="Next"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Counter + Info + Close */}
        <div className="absolute left-3 top-3 pointer-events-auto flex items-center gap-2">
          {/* Counter */}
          <div className="text-white/70 text-xs bg-black/35 border border-white/10 rounded-full px-2 py-1">
            {activeIndex + 1} / {videos.length}
          </div>

          {/* Info */}
          <button
            onClick={() => setShowInfo((s) => !s)}
            className="h-10 w-10 rounded-full bg-black/40 border border-white/15 text-white/90 hover:bg-black/55 active:scale-95 transition flex items-center justify-center"
            title="Info"
          >
            <span className="font-semibold">i</span>
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="h-10 w-10 rounded-full bg-black/40 border border-white/15 text-white/90 hover:bg-black/55 active:scale-95 transition flex items-center justify-center"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

            {/* Toast: only for non-shorts */}
      {showYoutubeToast && activeVideo && (
        <motion.a
          key={activeVideo.id}
          href={activeVideo.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto"
          title="Play in YouTube"
        >
          <div className="flex items-center gap-2 rounded-full bg-black/55 backdrop-blur border border-white/15 px-4 py-2 text-white/95 shadow-lg hover:bg-black/65 active:scale-[0.98] transition">
            <Play className="w-4 h-4" />
            <span className="text-sm font-semibold">Play in YouTube</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </div>
        </motion.a>
      )}

      {/* Snap list (NO iframes inside — just scroll targets) */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory relative z-0 hide-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" as any }}
      >
        {videos.map((v, idx) => (
          <div
            key={v.id}
            data-index={idx}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            className="h-screen w-full snap-start"
          />
        ))}
      </div>

      {/* Info popup (only when toggled) */}
      {showInfo && activeVideo && (
        <div className="absolute bottom-3 left-3 right-3 z-30">
          <div className="mx-auto max-w-[520px] bg-black/45 backdrop-blur border border-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-white/70 text-xs uppercase tracking-wider">
                  {categoryLabel} • {activeVideo.duration}
                </p>
                <p className="text-white font-semibold leading-snug line-clamp-2">
                  {activeVideo.title}
                </p>
              </div>
              <a
                href={activeVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Open
              </a>
            </div>

            {activeVideo.description && (
              <p className="mt-2 text-sm text-white/70 line-clamp-2">
                {activeVideo.description}
              </p>
            )}

            {activeVideo.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {activeVideo.tags.slice(0, 6).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 bg-white/10 rounded text-xs text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
