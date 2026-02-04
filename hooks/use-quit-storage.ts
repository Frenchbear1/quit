"use client";

import { useState, useEffect, useCallback } from "react";

export interface RelapseEntry {
  timestamp: number;
  lie?: string;
  change?: string;
}

export interface TriggerEntry {
  timestamp: number;
  triggers: string[];
  actionCompleted: string;
}

export interface QuitData {
  streakStartDate: number | null;
  lastRelapseDate: number | null;
  relapseHistory: RelapseEntry[];
  triggerHistory: TriggerEntry[];
  playLaterVideos: string[];
}

const DEFAULT_DATA: QuitData = {
  streakStartDate: Date.now(),
  lastRelapseDate: null,
  relapseHistory: [],
  triggerHistory: [],
  playLaterVideos: [],
};

const STORAGE_KEY = "quit-app-data";

export function useQuitStorage() {
  const [data, setData] = useState<QuitData>(DEFAULT_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setData({ ...DEFAULT_DATA, ...parsed });
        } catch {
          setData(DEFAULT_DATA);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, isLoaded]);

  // Log relapse
  const logRelapse = useCallback((lie?: string, change?: string) => {
    const entry: RelapseEntry = {
      timestamp: Date.now(),
      lie,
      change,
    };
    setData((prev) => ({
      ...prev,
      lastRelapseDate: Date.now(),
      streakStartDate: Date.now(),
      relapseHistory: [...prev.relapseHistory, entry],
    }));
  }, []);

  // Log trigger
  const logTrigger = useCallback((triggers: string[], actionCompleted: string) => {
    const entry: TriggerEntry = {
      timestamp: Date.now(),
      triggers,
      actionCompleted,
    };
    setData((prev) => ({
      ...prev,
      triggerHistory: [...prev.triggerHistory, entry],
    }));
  }, []);

  // Toggle play later video
  const togglePlayLater = useCallback((videoId: string) => {
    setData((prev) => {
      const isInList = prev.playLaterVideos.includes(videoId);
      return {
        ...prev,
        playLaterVideos: isInList
          ? prev.playLaterVideos.filter((id) => id !== videoId)
          : [...prev.playLaterVideos, videoId],
      };
    });
  }, []);

  // Calculate streak days
  const getStreakDays = useCallback(() => {
    if (!data.streakStartDate) return 0;
    const now = Date.now();
    const diffMs = now - data.streakStartDate;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }, [data.streakStartDate]);

  // Calculate time since last relapse
  const getTimeSinceRelapse = useCallback(() => {
    if (!data.lastRelapseDate) return null;
    const now = Date.now();
    const diffMs = now - data.lastRelapseDate;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} day${days === 1 ? '' : 's'}`;
    }
    return `${hours} hour${hours === 1 ? '' : 's'}`;
  }, [data.lastRelapseDate]);

  return {
    data,
    isLoaded,
    logRelapse,
    logTrigger,
    togglePlayLater,
    getStreakDays,
    getTimeSinceRelapse,
  };
}
