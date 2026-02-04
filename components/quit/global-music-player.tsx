"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import type { MusicTrack } from "@/lib/data/music";

interface GlobalMusicPlayerProps {
  track: MusicTrack | null;
  isPlaying: boolean;
  showFullscreen: boolean;
  onClose: () => void;
}

function getYouTubeIdFromUrl(url?: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");
    if (host === "youtu.be") {
      return u.pathname.split("/").filter(Boolean)[0] || null;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      if (u.pathname.startsWith("/shorts/")) {
        return u.pathname.split("/").filter(Boolean)[1] || null;
      }
      if (u.pathname.startsWith("/embed/")) {
        return u.pathname.split("/").filter(Boolean)[1] || null;
      }
    }
    return null;
  } catch {
    return null;
  }
}

function parseTimeToSeconds(raw: string | null): number | null {
  if (!raw) return null;

  // raw might be "90", "1m30s", "2m", "1h2m3s"
  const s = raw.trim().toLowerCase();

  // plain integer seconds
  if (/^\d+$/.test(s)) return Number(s);

  const re = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/;
  const m = s.match(re);
  if (!m) return null;

  const h = m[1] ? Number(m[1]) : 0;
  const min = m[2] ? Number(m[2]) : 0;
  const sec = m[3] ? Number(m[3]) : 0;

  const total = h * 3600 + min * 60 + sec;
  return Number.isFinite(total) && total > 0 ? total : null;
}

function getStartSecondsFromUrl(url?: string): number | null {
  if (!url) return null;
  try {
    const u = new URL(url);

    // 1) query params
    const t = u.searchParams.get("t");
    const start = u.searchParams.get("start");
    const fromQuery = parseTimeToSeconds(start) ?? parseTimeToSeconds(t);
    if (fromQuery) return fromQuery;

    // 2) hash params (sometimes links use #t=90 or #t=1m30s)
    const hash = (u.hash || "").replace(/^#/, "");
    if (hash) {
      const parts = new URLSearchParams(hash);
      const ht = parts.get("t");
      const hs = parts.get("start");
      const fromHash = parseTimeToSeconds(hs) ?? parseTimeToSeconds(ht);
      if (fromHash) return fromHash;
    }

    return null;
  } catch {
    return null;
  }
}

export function GlobalMusicPlayer({
  track,
  isPlaying,
  showFullscreen,
  onClose,
}: GlobalMusicPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const embedId = track ? getYouTubeIdFromUrl(track.url) : null;
  const startSeconds = track ? getStartSecondsFromUrl(track.url) : null;

  const embedSrc = useMemo(() => {
    if (!embedId) return null;
    const startPart = startSeconds ? `&start=${startSeconds}` : "";
    return `https://www.youtube.com/embed/${embedId}?autoplay=1&rel=0&playsinline=1&enablejsapi=1${startPart}`;
  }, [embedId, startSeconds]);

  // Post message to iframe to control playback
  const postMessage = useCallback((command: string) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: command, args: [] }),
        "*"
      );
    }
  }, []);

  useEffect(() => {
    if (!embedSrc) return;

    if (isPlaying) postMessage("playVideo");
    else postMessage("pauseVideo");
  }, [isPlaying, postMessage, embedSrc]);

  if (!track || !embedId || !embedSrc) return null;

  return (
    // Single iframe ONLY (never unmount it) so timing doesn’t reset
    <div
      className={`fixed transition-all duration-300 ${
        showFullscreen
          ? "inset-0 z-50 bg-background/98"
          : "w-1 h-1 -left-[9999px] -top-[9999px] opacity-0 pointer-events-none"
      }`}
    >
      <div className={`flex flex-col h-full ${showFullscreen ? "" : "opacity-0"}`}>
        {/* Header */}
        {showFullscreen && (
          <div className="flex items-center justify-between px-4 py-4 border-b border-border">
            <div className="flex-1 min-w-0 pr-4">
              <h2 className="font-bold text-foreground truncate">{track.title}</h2>
              <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              title="Minimize"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
          </div>
        )}

        {/* Video / Audio iframe */}
        <div className={`${showFullscreen ? "flex-1 flex items-center justify-center p-4" : ""}`}>
          <div className={`${showFullscreen ? "w-full max-w-2xl" : "w-1 h-1"}`}>
            <div className={`${showFullscreen ? "aspect-video rounded-xl overflow-hidden bg-black" : ""}`}>
              <iframe
                ref={iframeRef}
                src={embedSrc}
                title={track.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={`${showFullscreen ? "w-full h-full" : "w-1 h-1"}`}
              />
            </div>
          </div>
        </div>

        {/* Description */}
        {showFullscreen && track.description && (
          <div className="px-4 pb-6">
            <div className="max-w-2xl mx-auto p-4 bg-card border border-border rounded-xl">
              <p className="text-center text-muted-foreground">{track.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
