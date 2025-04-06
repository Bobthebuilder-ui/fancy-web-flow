
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { FileImage, Github } from "lucide-react";

interface ProjectFormValues {
  title: string;
  description: string;
  category: string;
  githubUrl: string;
  tools: string;
  tags: string;
}

export function ProjectUploadForm() {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [phoneScreenshot, setPhoneScreenshot] = useState<File | null>(null);
  const [desktopScreenshot, setDesktopScreenshot] = useState<File | null>(null);
  
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [phonePreview, setPhonePreview] = useState<string | null>(null);
  const [desktopPreview, setDesktopPreview] = useState<string | null>(null);
  
  const form = useForm<ProjectFormValues>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      githubUrl: "",
      tools: "",
      tags: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<File | null>>, setPreview: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ProjectFormValues) => {
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
    form.reset();
    
    // Reset file inputs
    setMainImage(null);
    setPhoneScreenshot(null);
    setDesktopScreenshot(null);
    setMainImagePreview(null);
    setPhonePreview(null);
    setDesktopPreview(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="E-Commerce Website" {...field} />
              </FormControl>
              <FormDescription>
                Enter the name of your project
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="A responsive e-commerce website with product listings and checkout functionality" 
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Provide a detailed description of your project
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="WordPress">WordPress</SelectItem>
                    <SelectItem value="JavaScript">JavaScript</SelectItem>
                    <SelectItem value="React">React</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the main technology used
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="tools"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tools Used</FormLabel>
                <FormControl>
                  <Input placeholder="React, Node.js, MongoDB, etc." {...field} />
                </FormControl>
                <FormDescription>
                  Enter tools separated by commas
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="Frontend, Backend, Full Stack, etc." {...field} />
              </FormControl>
              <FormDescription>
                Enter tags separated by commas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="githubUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Repository URL</FormLabel>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <FormControl>
                  <Input placeholder="https://github.com/username/repo" className="pl-10" {...field} />
                </FormControl>
              </div>
              <FormDescription>
                Enter the URL to your project's GitHub repository
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-4">
          <div>
            <FormLabel>Main Project Image</FormLabel>
            <div className="mt-2 flex items-center gap-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileImage className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="text-sm text-gray-500">
                    {mainImage ? mainImage.name : "Upload main project image"}
                  </p>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => handleImageChange(e, setMainImage, setMainImagePreview)}
                />
              </label>
              
              {mainImagePreview && (
                <div className="h-32 w-32 relative border rounded-lg overflow-hidden">
                  <img 
                    src={mainImagePreview} 
                    alt="Main project preview" 
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
            <FormDescription>
              Upload the main image for your project
            </FormDescription>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormLabel>Phone Screenshot</FormLabel>
              <div className="mt-2 flex flex-col">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileImage className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="text-sm text-gray-500">
                      {phoneScreenshot ? phoneScreenshot.name : "Upload phone screenshot"}
                    </p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleImageChange(e, setPhoneScreenshot, setPhonePreview)}
                  />
                </label>
                
                {phonePreview && (
                  <div className="mt-2 h-32 relative border rounded-lg overflow-hidden">
                    <img 
                      src={phonePreview} 
                      alt="Phone screenshot preview" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
              <FormDescription>
                Upload screenshot of mobile view
              </FormDescription>
            </div>
            
            <div>
              <FormLabel>Desktop Screenshot</FormLabel>
              <div className="mt-2 flex flex-col">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileImage className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="text-sm text-gray-500">
                      {desktopScreenshot ? desktopScreenshot.name : "Upload desktop screenshot"}
                    </p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleImageChange(e, setDesktopScreenshot, setDesktopPreview)}
                  />
                </label>
                
                {desktopPreview && (
                  <div className="mt-2 h-32 relative border rounded-lg overflow-hidden">
                    <img 
                      src={desktopPreview} 
                      alt="Desktop screenshot preview" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
              <FormDescription>
                Upload screenshot of desktop view
              </FormDescription>
            </div>
          </div>
        </div>
        
        <Button type="submit" className="bg-[#FFD700] hover:bg-[#e6c300] text-black">
          Add Project
        </Button>
      </form>
    </Form>
  );
}
