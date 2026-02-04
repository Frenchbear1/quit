"use client";

import { useEffect } from "react"

import React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, 
  Footprints, 
  Droplets, 
  MessageSquare, 
  Wind, 
  Dumbbell,
  HandMetal,
  Check,
  Moon
} from "lucide-react";
import { exitActions, triggerTags, lateNightActions } from "@/lib/data/actions";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  phone: Smartphone,
  walk: Footprints,
  water: Droplets,
  message: MessageSquare,
  breathe: Wind,
  exercise: Dumbbell,
  pray: HandMetal,
  stand: Footprints,
};

interface ExitActionsTabProps {
  onLogTrigger: (triggers: string[], actionCompleted: string) => void;
}

type FilterMode = "all" | "late-night";

export function ExitActionsTab({ onLogTrigger }: ExitActionsTabProps) {
  const [filter, setFilter] = useState<FilterMode>("all");
  const [completedAction, setCompletedAction] = useState<string | null>(null);
  const [showTriggerPrompt, setShowTriggerPrompt] = useState(false);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);

  const filteredActions = filter === "all" ? exitActions : lateNightActions;

  const handleActionComplete = (actionId: string) => {
    setCompletedAction(actionId);
    setTimeout(() => {
      setShowTriggerPrompt(true);
    }, 500);
  };

  const handleTriggerSelect = (trigger: string) => {
    setSelectedTriggers(prev => 
      prev.includes(trigger) 
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    );
  };

  const handleSaveTriggers = () => {
    if (completedAction) {
      const action = exitActions.find(a => a.id === completedAction);
      onLogTrigger(selectedTriggers, action?.title || "Unknown action");
    }
    setShowTriggerPrompt(false);
    setSelectedTriggers([]);
    setCompletedAction(null);
  };

  const handleSkipTriggers = () => {
    setShowTriggerPrompt(false);
    setSelectedTriggers([]);
    setCompletedAction(null);
  };

  return (
    <div className="min-h-full pb-24">
      {/* Filter Toggle */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 px-4 py-4 border-b border-border">
        <div className="flex bg-secondary rounded-xl p-1">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
              filter === "all"
                ? "bg-card text-card-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All Actions
          </button>
          <button
            onClick={() => setFilter("late-night")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
              filter === "late-night"
                ? "bg-card text-card-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Moon className="w-4 h-4" />
            Late Night
          </button>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="px-4 py-4 space-y-3">
        {filteredActions.map((action, index) => {
          const Icon = iconMap[action.icon] || Footprints;
          const isCompleted = completedAction === action.id;

          return (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleActionComplete(action.id)}
              disabled={!!completedAction}
              whileTap={{ scale: 0.98 }}
              className={`w-full bg-card border rounded-xl p-4 text-left transition-all ${
                isCompleted 
                  ? "border-success bg-success/10" 
                  : "border-border hover:border-primary/50 active:bg-card/80"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isCompleted ? "bg-success/20" : "bg-primary/10"
                }`}>
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Check className="w-6 h-6 text-success" />
                    </motion.div>
                  ) : (
                    <Icon className="w-6 h-6 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold mb-1 ${
                    isCompleted ? "text-success" : "text-card-foreground"
                  }`}>
                    {action.title}
                  </h3>
                  {action.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {action.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Trigger Prompt Modal */}
      <AnimatePresence>
        {showTriggerPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-2xl p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-bold text-card-foreground mb-2">
                Good. You took action.
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                What triggered this moment? Select all that apply.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {triggerTags.map((trigger) => (
                  <button
                    key={trigger.id}
                    onClick={() => handleTriggerSelect(trigger.label)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedTriggers.includes(trigger.label)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {trigger.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={handleSkipTriggers}
                  className="flex-1 text-muted-foreground"
                >
                  Skip
                </Button>
                <Button
                  onClick={handleSaveTriggers}
                  className="flex-1"
                  disabled={selectedTriggers.length === 0}
                >
                  Save
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breathing Exercise Modal */}
      <BreathingExercise 
        open={completedAction === "ea5"} 
        onClose={() => {
          setCompletedAction(null);
          setShowTriggerPrompt(true);
        }} 
      />
    </div>
  );
}

function BreathingExercise({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [count, setCount] = useState(4);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!open) return;
    
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          setPhase(p => {
            if (p === "inhale") return "hold";
            if (p === "hold") return "exhale";
            setCycles(c => c + 1);
            return "inhale";
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open]);

  // Reset when opening
  useEffect(() => {
    if (open) {
      setPhase("inhale");
      setCount(4);
      setCycles(0);
    }
  }, [open]);

  if (!open) return null;

  const isComplete = cycles >= 4;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/98 z-50 flex flex-col items-center justify-center p-6"
    >
      {isComplete ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-success" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Good.</h3>
          <p className="text-muted-foreground mb-8">Your mind is clearer now.</p>
          <Button onClick={onClose}>Continue</Button>
        </motion.div>
      ) : (
        <>
          <motion.div
            animate={{
              scale: phase === "inhale" ? 1.3 : phase === "hold" ? 1.3 : 1,
            }}
            transition={{ duration: 0.5 }}
            className="w-40 h-40 rounded-full bg-primary/20 flex items-center justify-center mb-8"
          >
            <div className="w-32 h-32 rounded-full bg-primary/30 flex items-center justify-center">
              <span className="text-5xl font-bold text-primary">{count}</span>
            </div>
          </motion.div>

          <p className="text-xl font-semibold text-foreground uppercase tracking-wider mb-2">
            {phase === "inhale" ? "Breathe In" : phase === "hold" ? "Hold" : "Breathe Out"}
          </p>

          <p className="text-muted-foreground text-sm">
            Cycle {cycles + 1} of 4
          </p>
        </>
      )}
    </motion.div>
  );
}
