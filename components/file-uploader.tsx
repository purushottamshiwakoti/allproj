"use client";

import { LoaderIcon, Plus, XCircle } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export const FileUploader = ({
  name,
  type,
  value,
  onChange,
}: {
  name: string;
  type: string;
  value: string;
  onChange: (src: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<{ url: string; type: string } | null>(null);
  const params = useParams();

  const projectId = params.id;

  const imageType = {
    "image/png": [".png"],
    "image/jpg": [".jpg"],
    "image/jpeg": [".jpeg"],
    "image/webp": [".webp"],
  };
  const videoType = {
    "video/mp4": [".mp4"],
  };

  const audioType = {
    "audio/mp3": [".mp3"],
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setLoading(true);
        const file = acceptedFiles[0];
        const blobURL = URL.createObjectURL(file);

        const formData = new FormData();

        formData.append(`file`, file);

        const response = await fetch(`/api/upload-file/${projectId}`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const { relativePath } = await response.json();
          onChange(relativePath);
          setFile({
            url: blobURL,
            type: file.type,
          });
        } else {
          toast.error("Failed to upload file");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoading(false);
      }
    },
    [projectId, setFile, onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept:
      type === "image"
        ? imageType
        : type === "audio"
        ? audioType
        : type === "video"
        ? videoType
        : {},
    onDrop,
  });

  return (
    <>
      {loading && (
        <div className="border-dashed border-2 border-gray-300 p-6  h-[20rem] w-[30rem] rounded-md flex items-center justify-center">
          <LoaderIcon className="animate-spin" />
        </div>
      )}
      {!file ? (
        <div
          {...getRootProps()}
          className="dropzone text-center border-dashed border-2 border-gray-300 p-6  h-[20rem] w-[30rem] rounded-md"
        >
          <input {...getInputProps()} />
          <p className="text-gray-600 flex items-center justify-center h-full capitalize">
            Drag and drop to {name} here, or click to select one
          </p>
        </div>
      ) : (
        <div className="border-dashed border-2 border-gray-300 p-6  h-[20rem] w-[30rem] rounded-md relative">
          {file.type.includes("image") ? (
            <div>
              <Image
                src={file.url}
                alt={`Uploaded Image `}
                fill
                className=" rounded-md"
              />
              <XCircle
                className="text-red-500 absolute right-0 rounded-md  w-10 h-10 cursor-pointer"
                // onClick={() => handleRemoveImage(image)}
              />
            </div>
          ) : file.type.includes("audio") ? (
            <div className=" ">
              <audio controls className="relative ">
                <source src={file.url} />
                Your browser does not support the audio element.
              </audio>
              <XCircle className="absolute text-red-500 cursor-pointer right-0 bg-white rounded-md p-1  top-0" />
            </div>
          ) : file.type.includes("video") ? (
            <div className="h-[20rem] w-[20rem]  relative">
              <video controls className="relative ">
                <source src={file.url} />
                Your browser does not support the video element.
              </video>
              <XCircle
                className="absolute text-red-500 cursor-pointer right-0 bg-white rounded-md p-1  top-0"
                // onClick={() => handleRemoveVideo(video)}
              />
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};