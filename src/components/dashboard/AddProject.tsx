
import React from "react";
import { ProjectUploadForm } from "@/components/ProjectUploadForm";

export const AddProject = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Project</h2>
      <p className="text-gray-600 mb-6">
        Fill out the form below to add a new project to your portfolio.
      </p>
      <ProjectUploadForm />
    </div>
  );
};
