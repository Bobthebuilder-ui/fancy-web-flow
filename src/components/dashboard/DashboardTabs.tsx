
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectsList } from "./ProjectsList";
import { AddProject } from "./AddProject";

export const DashboardTabs = () => {
  return (
    <Tabs defaultValue="projects" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="add-project">Add New Project</TabsTrigger>
      </TabsList>
      
      <TabsContent value="projects" className="mt-4">
        <ProjectsList />
      </TabsContent>
      
      <TabsContent value="add-project" className="mt-4">
        <AddProject />
      </TabsContent>
    </Tabs>
  );
};
