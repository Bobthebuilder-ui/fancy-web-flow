
import { toast } from "sonner";
import { ProjectFormValues } from "./ProjectFormTypes";
import { projects } from "@/lib/data";

export function submitProjectForm(
  data: ProjectFormValues,
  mainImage: File | null,
  mainImagePreview: string | null,
  phonePreview: string | null,
  desktopPreview: string | null,
  resetForm: () => void,
  resetImages: () => void
) {
  // Check if main image is uploaded
  if (!mainImage) {
    toast.error("Please upload a main image for the project");
    return;
  }
  
  // Convert comma-separated tags to an array
  const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
  const toolsArray = data.tools.split(',').map(tool => tool.trim()).filter(tool => tool !== '');
  
  // In a real app, you would upload the files to a server
  // Here we're using the preview URLs as placeholders
  const newProject = {
    id: Date.now(), // Use a timestamp as a temporary ID
    title: data.title,
    description: data.description,
    category: data.category,
    image: mainImagePreview || "", // Use the preview URL
    phoneScreenshot: phonePreview || null,
    desktopScreenshot: desktopPreview || null,
    githubUrl: data.githubUrl,
    tags: [...tagsArray, ...toolsArray],
  };
  
  // Add the new project to the projects array
  projects.unshift(newProject);
  
  console.log("New project:", newProject);
  console.log("Updated projects list:", projects);
  
  toast.success("Project added successfully!");
  resetForm();
  resetImages();
}
