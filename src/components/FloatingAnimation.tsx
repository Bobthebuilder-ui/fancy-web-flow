
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}

export function FloatingElement({ children, className, depth = 1 }: FloatingElementProps) {
  return (
    <motion.div
      className={cn("absolute", className)}
      animate={{ 
        y: [0, -10 * depth, 0],
      }}
      transition={{
        duration: 3 + depth,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      {children}
    </motion.div>
  );
}

interface FloatingAnimationProps {
  children: React.ReactNode;
  className?: string;
}

export function FloatingAnimation({ children, className }: FloatingAnimationProps) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      {children}
    </div>
  );
}
