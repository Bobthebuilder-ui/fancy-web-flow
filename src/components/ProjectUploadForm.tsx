
import React from "react";
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

interface ProjectFormValues {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  phoneScreenshot: string;
  desktopScreenshot: string;
  tools: string;
  tags: string;
}

export function ProjectUploadForm() {
  const form = useForm<ProjectFormValues>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      imageUrl: "",
      phoneScreenshot: "",
      desktopScreenshot: "",
      tools: "",
      tags: "",
    },
  });

  const onSubmit = (data: ProjectFormValues) => {
    // In a real app, this would send data to a backend
    console.log("Form data:", data);
    
    // Convert comma-separated tags to an array
    const tagsArray = data.tags.split(',').map(tag => tag.trim());
    const toolsArray = data.tools.split(',').map(tool => tool.trim());
    
    const newProject = {
      id: Date.now(), // Use a timestamp as a temporary ID
      title: data.title,
      description: data.description,
      category: data.category,
      image: data.imageUrl,
      phoneScreenshot: data.phoneScreenshot,
      desktopScreenshot: data.desktopScreenshot,
      tags: [...tagsArray, ...toolsArray],
    };
    
    console.log("New project:", newProject);
    toast.success("Project added successfully!");
    form.reset();
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the URL for the main project image
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
          
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">  
          <FormField
            control={form.control}
            name="phoneScreenshot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Screenshot URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/phone-screenshot.jpg" {...field} />
                </FormControl>
                <FormDescription>
                  URL for mobile view screenshot
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="desktopScreenshot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Desktop Screenshot URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/desktop-screenshot.jpg" {...field} />
                </FormControl>
                <FormDescription>
                  URL for desktop view screenshot
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="bg-[#FFD700] hover:bg-[#e6c300] text-black">
          Add Project
        </Button>
      </form>
    </Form>
  );
}
