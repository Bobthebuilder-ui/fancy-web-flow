
import { toast } from "sonner";
import { ProjectFormValues } from "./ProjectFormTypes";

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
  const tagsArray = data.tags.split(',').map(tag => tag.trim());
  const toolsArray = data.tools.split(',').map(tool => tool.trim());
  
  // In a real app, you would upload the files to a server
  // Here we're using the preview URLs as placeholders
  const newProject = {
    id: Date.now(), // Use a timestamp as a temporary ID
    title: data.title,
    description: data.description,
    category: data.category,
    image: mainImagePreview, // Use the preview URL
    phoneScreenshot: phonePreview,
    desktopScreenshot: desktopPreview,
    githubUrl: data.githubUrl,
    tags: [...tagsArray, ...toolsArray],
  };
  
  console.log("New project:", newProject);
  toast.success("Project added successfully!");
  resetForm();
  resetImages();
}
