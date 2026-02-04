"use client";

import { useEffect, useRef, useCallback } from "react";
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

export function GlobalMusicPlayer({ track, isPlaying, showFullscreen, onClose }: GlobalMusicPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const embedId = track ? getYouTubeIdFromUrl(track.url) : null;

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
    if (isPlaying) {
      postMessage("playVideo");
    } else {
      postMessage("pauseVideo");
    }
  }, [isPlaying, postMessage]);

  if (!track || !embedId) return null;

  return (
    <>
      {/* Hidden persistent iframe for audio - positioned off-screen when minimized */}
      <div
        className={`fixed transition-all duration-300 ${
          showFullscreen
            ? "inset-0 z-50 bg-background/98"
            : "w-1 h-1 -left-[9999px] -top-[9999px] opacity-0 pointer-events-none"
        }`}
      >
        {showFullscreen && (
          <div className="flex flex-col h-full">
            {/* Header */}
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

            {/* Video Container */}
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="w-full max-w-2xl">
                <div className="aspect-video rounded-xl overflow-hidden bg-black">
                  <iframe
                    ref={iframeRef}
                    src={`https://www.youtube.com/embed/${embedId}?autoplay=1&rel=0&playsinline=1&enablejsapi=1`}
                    title={track.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            {track.description && (
              <div className="px-4 pb-6">
                <div className="max-w-2xl mx-auto p-4 bg-card border border-border rounded-xl">
                  <p className="text-center text-muted-foreground">{track.description}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hidden iframe when minimized - keep it mounted so audio continues */}
        {!showFullscreen && (
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${embedId}?autoplay=1&rel=0&playsinline=1&enablejsapi=1`}
            title={track.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="w-full h-full"
          />
        )}
      </div>
    </>
  );
}
