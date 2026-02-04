"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface RelapseModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (lie?: string, change?: string) => void;
}

export function RelapseModal({ open, onClose, onConfirm }: RelapseModalProps) {
  const [step, setStep] = useState<"confirm" | "reflect">("confirm");
  const [lie, setLie] = useState("");
  const [change, setChange] = useState("");

  const handleConfirmRelapse = () => {
    setStep("reflect");
  };

  const handleSubmit = () => {
    onConfirm(lie || undefined, change || undefined);
    setStep("confirm");
    setLie("");
    setChange("");
    onClose();
  };

  const handleSkip = () => {
    onConfirm();
    setStep("confirm");
    setLie("");
    setChange("");
    onClose();
  };

  const handleClose = () => {
    setStep("confirm");
    setLie("");
    setChange("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
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
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-card-foreground">
                {step === "confirm" ? "Log Relapse" : "Reflect"}
              </h2>
              <button 
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {step === "confirm" ? (
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  This will reset your streak. Logging relapses helps you see patterns and stay accountable.
                </p>
                <p className="text-sm text-muted-foreground">
                  This is not punishment. This is honesty.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleConfirmRelapse}
                    className="flex-1"
                  >
                    Log It
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    What lie did you believe?
                  </label>
                  <Textarea
                    value={lie}
                    onChange={(e) => setLie(e.target.value)}
                    placeholder="e.g., 'One more time won't hurt'"
                    className="resize-none h-20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    What will you change tomorrow?
                  </label>
                  <Textarea
                    value={change}
                    onChange={(e) => setChange(e.target.value)}
                    placeholder="e.g., 'Phone stays outside bathroom'"
                    className="resize-none h-20"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="ghost"
                    onClick={handleSkip}
                    className="flex-1 text-muted-foreground"
                  >
                    Skip
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1"
                  >
                    Save & Continue
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
