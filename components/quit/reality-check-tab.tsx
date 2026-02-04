"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Volume2 } from "lucide-react";
import { lies, readAloudStatements } from "@/lib/data/lies";
import { Button } from "@/components/ui/button";

export function RealityCheckTab() {
  const [expandedLie, setExpandedLie] = useState<string | null>(null);
  const [showReadAloud, setShowReadAloud] = useState(false);

  return (
    <div className="min-h-full pb-24">
      {/* Header */}
      <div className="px-4 py-4">
        <h2 className="text-xl font-bold text-foreground mb-1">Expose The Lies</h2>
        <p className="text-muted-foreground text-sm">
          You tell yourself these things. Time to hear the truth.
        </p>
      </div>

      {/* Lies List */}
      <div className="px-4 space-y-3">
        {lies.map((lie, index) => (
          <motion.div
            key={lie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-card border border-border rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setExpandedLie(expandedLie === lie.id ? null : lie.id)}
              className="w-full p-4 text-left flex items-center justify-between"
            >
              <span className="font-medium text-card-foreground pr-4">
                {`"${lie.lie}"`}
              </span>
              <ChevronDown 
                className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                  expandedLie === lie.id ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {expandedLie === lie.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-destructive mb-2">
                        What it really means:
                      </p>
                      <p className="text-card-foreground text-sm leading-relaxed">
                        {lie.realMeaning}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-warning mb-2">
                        The cost:
                      </p>
                      <p className="text-card-foreground text-sm leading-relaxed">
                        {lie.cost}
                      </p>
                    </div>

                    <div className="bg-success/10 border border-success/30 rounded-lg p-4">
                      <p className="text-xs uppercase tracking-wider text-success mb-2">
                        Replacement truth:
                      </p>
                      <p className="text-success font-semibold">
                        {lie.replacementTruth}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Read Aloud Section */}
      <div className="px-4 mt-8">
        <Button
          variant="outline"
          onClick={() => setShowReadAloud(!showReadAloud)}
          className="w-full gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Volume2 className="w-4 h-4" />
          Read This Out Loud
        </Button>

        <AnimatePresence>
          {showReadAloud && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden"
            >
              <div className="bg-card border border-destructive/30 rounded-xl p-5 space-y-4">
                <p className="text-xs uppercase tracking-wider text-destructive mb-4">
                  Say these words out loud. Feel them.
                </p>
                {readAloudStatements.slice(0, 4).map((statement, index) => (
                  <motion.p
                    key={statement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-card-foreground leading-relaxed border-l-2 border-destructive/50 pl-4"
                  >
                    {statement.text}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
