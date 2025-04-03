
import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRotateProps {
  texts: string[];
  rotationInterval?: number;
  className?: string;
  textClassName?: string;
  loop?: boolean;
}

export function TextRotate({ 
  texts, 
  rotationInterval = 3000, 
  className,
  textClassName,
  loop = true 
}: TextRotateProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (!loop && currentIndex === texts.length - 1) {
      return;
    }
    
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, rotationInterval);
    
    return () => clearInterval(intervalId);
  }, [texts, rotationInterval, currentIndex, loop]);
  
  return (
    <div className={cn("relative inline-flex overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={cn("inline-block", textClassName)}
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
