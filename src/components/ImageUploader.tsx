
import React from "react";
import { FileImage } from "lucide-react";
import { FormDescription, FormLabel } from "@/components/ui/form";

interface ImageUploaderProps {
  label: string;
  description?: string;
  placeholder: string;
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setPreview: React.Dispatch<React.SetStateAction<string | null>>;
  preview: string | null;
}

export function ImageUploader({
  label,
  description,
  placeholder,
  image,
  setImage,
  setPreview,
  preview
}: ImageUploaderProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <div className="mt-2 flex items-center gap-4">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FileImage className="w-8 h-8 mb-2 text-gray-500" />
            <p className="text-sm text-gray-500">
              {image ? image.name : placeholder}
            </p>
          </div>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleImageChange}
          />
        </label>
        
        {preview && (
          <div className="h-32 w-32 relative border rounded-lg overflow-hidden">
            <img 
              src={preview} 
              alt={`${label} preview`} 
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
      {description && <FormDescription>{description}</FormDescription>}
    </div>
  );
}
