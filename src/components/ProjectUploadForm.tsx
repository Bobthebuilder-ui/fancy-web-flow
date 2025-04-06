
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
import { Github } from "lucide-react";
import { ProjectFormValues } from "./ProjectFormTypes";
import { submitProjectForm } from "./ProjectFormSubmit";
import { ImageUploader } from "./ImageUploader";
import { ScreenshotUploaders } from "./ScreenshotUploaders";

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

  const resetImages = () => {
    setMainImage(null);
    setPhoneScreenshot(null);
    setDesktopScreenshot(null);
    setMainImagePreview(null);
    setPhonePreview(null);
    setDesktopPreview(null);
  };

  const onSubmit = (data: ProjectFormValues) => {
    submitProjectForm(
      data,
      mainImage,
      mainImagePreview,
      phonePreview,
      desktopPreview,
      form.reset,
      resetImages
    );
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
            <ImageUploader
              label="Main Project Image"
              description="Upload the main image for your project"
              placeholder="Upload main project image"
              image={mainImage}
              setImage={setMainImage}
              preview={mainImagePreview}
              setPreview={setMainImagePreview}
            />
          </div>
          
          <ScreenshotUploaders
            phoneScreenshot={phoneScreenshot}
            setPhoneScreenshot={setPhoneScreenshot}
            phonePreview={phonePreview}
            setPhonePreview={setPhonePreview}
            desktopScreenshot={desktopScreenshot}
            setDesktopScreenshot={setDesktopScreenshot}
            desktopPreview={desktopPreview}
            setDesktopPreview={setDesktopPreview}
          />
        </div>
        
        <Button type="submit" className="bg-[#FFD700] hover:bg-[#e6c300] text-black">
          Add Project
        </Button>
      </form>
    </Form>
  );
}
