
import React from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

interface PortfolioProps {
  projects: Project[];
}

export function Portfolio({ projects }: PortfolioProps) {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-600">
            Explore my latest work and creative solutions across different platforms and technologies.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
