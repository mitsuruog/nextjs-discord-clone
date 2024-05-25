"use client";

import { X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, endpoint, value }: FileUploadProps) => {
  const fileType = value.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image src={value} alt="Uploaded image" className="rounded-full" fill />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 bg-rose-500 text-white p-1 rounded-full shadow-sm"
          type="button"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(response) => {
        onChange(response[0].url);
      }}
      onUploadError={(error) => {
        console.error(error);
      }}
    />
  );
};
