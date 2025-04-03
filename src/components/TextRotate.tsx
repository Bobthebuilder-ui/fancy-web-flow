
import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRotateProps {
  texts: string[];
  rotationInterval?: number;
  className?: string;
  textClassName?: string;
  loop?: boolean;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number | "random";
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

export function TextRotate({ 
  texts, 
  rotationInterval = 3000,
  className,
  textClassName,
  loop = true,
  staggerDuration = 0.03,
  staggerFrom = "last",
  mainClassName,
  splitLevelClassName,
  elementLevelClassName
}: TextRotateProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Split text into characters with support for unicode and emojis
  const splitIntoCharacters = (text: string): string[] => {
    return Array.from(text);
  };

  const elements = texts[currentIndex].split(" ").map((word) => ({
    characters: splitIntoCharacters(word),
    needsSpace: true,
  }));

  const getStaggerDelay = useCallback(
    (index: number, totalChars: number) => {
      const total = totalChars;
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * total);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      return 0;
    },
    [staggerFrom, staggerDuration]
  );
  
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
      <span className="sr-only">{texts[currentIndex]}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          className={cn("flex flex-wrap", mainClassName)}
        >
          {elements.map((wordObj, wordIndex, array) => {
            const previousCharsCount = array
              .slice(0, wordIndex)
              .reduce((sum, word) => sum + word.characters.length, 0);

            return (
              <span
                key={wordIndex}
                className={cn("inline-flex", splitLevelClassName)}
              >
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-120%", opacity: 0 }}
                    key={charIndex}
                    transition={{
                      type: "spring",
                      damping: 25,
                      stiffness: 300,
                      delay: getStaggerDelay(
                        previousCharsCount + charIndex,
                        array.reduce(
                          (sum, word) => sum + word.characters.length,
                          0
                        )
                      ),
                    }}
                    className={cn("inline-block", elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && wordIndex !== array.length - 1 && (
                  <span className="whitespace-pre"> </span>
                )}
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
