"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { emergencyVerses } from "@/lib/data/verses";

interface EmergencyVerseProps {
  open: boolean;
  onClose: () => void;
}

export function EmergencyVerse({ open, onClose }: EmergencyVerseProps) {
  const [verse, setVerse] = useState(emergencyVerses[0]);

  const getRandomVerse = () => {
    const randomIndex = Math.floor(Math.random() * emergencyVerses.length);
    setVerse(emergencyVerses[randomIndex]);
  };

  useEffect(() => {
    if (open) {
      getRandomVerse();
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/98 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-destructive">
                <Zap className="w-5 h-5" />
                <span className="font-bold uppercase tracking-wider text-sm">Emergency</span>
              </div>
              <button 
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Verse Card */}
            <motion.div
              key={verse.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-2xl p-6 mb-6"
            >
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                {verse.reference}
              </p>
              
              <blockquote className="text-muted-foreground border-l-2 border-muted pl-4 mb-6 text-sm leading-relaxed italic">
                {verse.text}
              </blockquote>

              <div className="space-y-4">
                <div>
                  <p className="text-card-foreground leading-relaxed">
                    {verse.commentary}
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-1">Why this matters:</p>
                  <p className="text-card-foreground text-sm">{verse.whyMatters}</p>
                </div>

                <div className="bg-primary/10 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1">Action right now:</p>
                  <p className="text-primary font-medium">{verse.actionNow}</p>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={getRandomVerse}
                className="flex-1 gap-2 bg-transparent"
              >
                <RefreshCw className="w-4 h-4" />
                Another Verse
              </Button>
              <Button
                onClick={onClose}
                className="flex-1"
              >
                I'm Ready
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
