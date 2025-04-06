
import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { navItems, projects } from "@/lib/data";
import { ProjectUploadForm } from "@/components/ProjectUploadForm";
import { ProjectCard } from "@/components/ProjectCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar items={navItems} />
      
      <main className="container mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">Dashboard</h1>
          
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="add-project">Add New Project</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="mt-4">
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
            </TabsContent>
            
            <TabsContent value="add-project" className="mt-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Add New Project</h2>
                <p className="text-gray-600 mb-6">
                  Fill out the form below to add a new project to your portfolio.
                </p>
                <ProjectUploadForm />
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
