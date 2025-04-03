
import React from "react";
import { motion } from "framer-motion";
import { TextRotate } from "./TextRotate";
import { FloatingAnimation, FloatingElement } from "./FloatingAnimation";

interface HeroProps {
  rotatingTitles: string[];
}

export function Hero({ rotatingTitles }: HeroProps) {
  return (
    <section id="home" className="w-full min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
      <FloatingAnimation className="absolute inset-0 pointer-events-none">
        <FloatingElement depth={0.5} className="top-[15%] left-[5%]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 backdrop-blur-md"
          />
        </FloatingElement>
        
        <FloatingElement depth={0.8} className="top-[60%] right-[10%]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-blue-400/10 backdrop-blur-md"
          />
        </FloatingElement>
        
        <FloatingElement depth={0.3} className="top-[30%] right-[5%]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-purple-400/10 backdrop-blur-md"
          />
        </FloatingElement>
        
        <FloatingElement depth={1} className="bottom-[15%] left-[10%]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-indigo-400/10 backdrop-blur-md"
          />
        </FloatingElement>
      </FloatingAnimation>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-2 md:mb-3"
          >
            <span className="text-primary font-medium text-sm md:text-base uppercase tracking-widest">
              Web Designer & Developer
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4 md:mb-6"
          >
            Creating{" "}
            <span className="text-gradient mr-2">
              <TextRotate 
                texts={rotatingTitles}
                className="min-w-32 inline-block"
              />
            </span>
            <br /> web experiences
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10"
          >
            Transforming ideas into exceptional digital solutions with cutting-edge technology and thoughtful design.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a 
              href="#projects"
              className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              View Projects
            </a>
            <a 
              href="#contact"
              className="px-8 py-3 border border-gray-300 rounded-full font-medium hover:border-primary hover:text-primary transition-colors"
            >
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
