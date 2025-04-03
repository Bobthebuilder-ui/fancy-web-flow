
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  className?: string;
  index?: number;
}

export function ProjectCard({ 
  title, 
  description, 
  image, 
  tags, 
  className,
  index = 0
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "group overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300",
        "bg-white border border-gray-100 hover:border-primary/20",
        className
      )}
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="px-6 py-6">
        <h3 className="text-xl font-display font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span 
              key={i} 
              className="px-3 py-1 bg-secondary text-sm rounded-full text-primary/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
