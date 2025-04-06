
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { navItems } from "@/lib/data";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    if (!id) {
      navigate("/not-found");
      return;
    }
    
    const projectId = parseInt(id);
    const foundProject = projects.find(p => p.id === projectId);
    
    if (foundProject) {
      setProject(foundProject);
      console.log("Project found:", foundProject);
    } else {
      console.error("Project not found with id:", id);
      navigate("/not-found");
    }
  }, [id, navigate]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#FFD700] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar items={navItems} />
      
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="relative h-[60vh]">
          <div className="absolute inset-0">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-10"
          >
            <Button 
              variant="outline" 
              className="mb-6 w-fit bg-white/10 backdrop-blur-sm hover:bg-white/20"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag: string, i: number) => (
                <span 
                  key={i} 
                  className="px-3 py-1 bg-[#FFD700] text-black text-sm rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
              <span 
                className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full font-medium"
              >
                {project.category}
              </span>
            </div>
          </motion.div>
        </section>
        
        {/* Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-2xl font-display font-bold mb-6">Project Overview</h2>
              <p className="text-gray-700 mb-8">
                {project.description}
              </p>

              <div className="flex flex-col md:flex-row gap-8 mb-12">
                <div className="md:w-1/2">
                  <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string, i: number) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <h3 className="text-xl font-bold mb-4">Project Links</h3>
                  <div className="flex gap-4">
                    <Button className="bg-[#FFD700] hover:bg-[#e6c300] text-black">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Button>
                    {project.githubUrl ? (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline">
                          <Github className="mr-2 h-4 w-4" /> Source Code
                        </Button>
                      </a>
                    ) : (
                      <Button variant="outline" disabled>
                        <Github className="mr-2 h-4 w-4" /> Source Code
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-display font-bold mb-6">Project Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {project.phoneScreenshot ? (
                  <img 
                    src={project.phoneScreenshot} 
                    alt={`${project.title} - Mobile View`}
                    className="rounded-lg shadow-lg w-full h-auto object-cover"
                  />
                ) : (
                  <div className="rounded-lg bg-gray-100 h-64 flex items-center justify-center">
                    <p className="text-gray-500">No mobile screenshot available</p>
                  </div>
                )}
                
                {project.desktopScreenshot ? (
                  <img 
                    src={project.desktopScreenshot} 
                    alt={`${project.title} - Desktop View`}
                    className="rounded-lg shadow-lg w-full h-auto object-cover"
                  />
                ) : (
                  <div className="rounded-lg bg-gray-100 h-64 flex items-center justify-center">
                    <p className="text-gray-500">No desktop screenshot available</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProjectDetails;
