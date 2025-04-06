
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  className?: string;
  index?: number;
  id?: number;
}

export function ProjectCard({ 
  title, 
  description, 
  image, 
  tags, 
  className,
  index = 0,
  id
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
        "bg-white border border-gray-100 hover:border-[#FFD700]/50",
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
              className="px-3 py-1 bg-gray-100 text-sm rounded-full text-black"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link 
            to={`/project/${id}`}
            className="text-[#FFD700] font-medium hover:underline inline-flex items-center"
          >
            View Project
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
