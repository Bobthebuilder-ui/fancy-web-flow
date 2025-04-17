
import React from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export const ProjectsList = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4">Manage Projects</h2>
      <p className="text-gray-600 mb-6">
        View and manage all your portfolio projects. Click on any project to view details or edit.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
};
