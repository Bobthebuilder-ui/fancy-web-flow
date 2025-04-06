
import React from "react";
import { ImageUploader } from "./ImageUploader";

interface ScreenshotUploadersProps {
  phoneScreenshot: File | null;
  setPhoneScreenshot: React.Dispatch<React.SetStateAction<File | null>>;
  phonePreview: string | null;
  setPhonePreview: React.Dispatch<React.SetStateAction<string | null>>;
  desktopScreenshot: File | null;
  setDesktopScreenshot: React.Dispatch<React.SetStateAction<File | null>>;
  desktopPreview: string | null;
  setDesktopPreview: React.Dispatch<React.SetStateAction<string | null>>;
}

export function ScreenshotUploaders({
  phoneScreenshot,
  setPhoneScreenshot,
  phonePreview,
  setPhonePreview,
  desktopScreenshot,
  setDesktopScreenshot,
  desktopPreview,
  setDesktopPreview
}: ScreenshotUploadersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <ImageUploader 
          label="Phone Screenshot"
          description="Upload screenshot of mobile view"
          placeholder="Upload phone screenshot"
          image={phoneScreenshot}
          setImage={setPhoneScreenshot}
          preview={phonePreview}
          setPreview={setPhonePreview}
        />
      </div>
      
      <div>
        <ImageUploader 
          label="Desktop Screenshot"
          description="Upload screenshot of desktop view"
          placeholder="Upload desktop screenshot"
          image={desktopScreenshot}
          setImage={setDesktopScreenshot}
          preview={desktopPreview}
          setPreview={setDesktopPreview}
        />
      </div>
    </div>
  );
}
