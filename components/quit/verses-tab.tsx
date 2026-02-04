"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sword, BookOpen } from "lucide-react";
import { shortBlades, longFormPassages, type ShortBlade, type LongFormPassage } from "@/lib/data/verses";

type Mode = "short" | "long";

export function VersesTab() {
  const [mode, setMode] = useState<Mode>("short");

  return (
    <div className="min-h-full pb-24">
      {/* Mode Toggle */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 px-4 py-4 border-b border-border">
        <div className="flex bg-secondary rounded-xl p-1">
          <button
            onClick={() => setMode("short")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              mode === "short"
                ? "bg-card text-card-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sword className="w-4 h-4" />
            Short Blades
          </button>
          <button
            onClick={() => setMode("long")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              mode === "long"
                ? "bg-card text-card-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Long Form
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        <AnimatePresence mode="wait">
          {mode === "short" ? (
            <motion.div
              key="short"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {shortBlades.map((verse, index) => (
                <ShortBladeCard key={verse.id} verse={verse} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="long"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {longFormPassages.map((passage, index) => (
                <LongFormCard key={passage.id} passage={passage} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ShortBladeCard({ verse, index }: { verse: ShortBlade; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left"
      >
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          {verse.reference}
        </p>
        <blockquote className="text-muted-foreground border-l-2 border-muted pl-3 text-sm leading-relaxed italic line-clamp-3">
          {verse.text}
        </blockquote>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
              <div>
                <p className="text-card-foreground text-sm leading-relaxed">
                  {verse.commentary}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Why this matters:</p>
                <p className="text-card-foreground text-sm">{verse.whyMatters}</p>
              </div>

              <div className="bg-primary/10 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Action right now:</p>
                <p className="text-primary font-medium text-sm">{verse.actionNow}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function LongFormCard({ passage, index }: { passage: LongFormPassage; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 text-left"
      >
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
          {passage.reference}
        </p>
        <blockquote className="text-muted-foreground border-l-2 border-muted pl-4 text-sm leading-relaxed italic">
          {expanded ? passage.text : `${passage.text.slice(0, 200)}...`}
        </blockquote>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-5 border-t border-border pt-5">
              <div>
                <p className="text-card-foreground leading-relaxed">
                  {passage.commentary}
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Why this matters:</p>
                <p className="text-card-foreground">{passage.whyMatters}</p>
              </div>

              <div className="bg-primary/10 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-2">Action right now:</p>
                <p className="text-primary font-medium">{passage.actionNow}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
