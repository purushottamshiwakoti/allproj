"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import { UploadIcon, XCircle } from "lucide-react";
import { Button } from "./ui/button";

import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export const AddFiles = () => {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id;
  const folderId = params.folder;
  const [imageFiles, setImagesFiles] = useState<any[]>([]);
  const [audioFiles, setAudioFiles] = useState<any[]>([]);
  const [videoFiles, setVideoFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
    _.forEach(acceptedFiles, (value, key) => {
      const blobURL = URL.createObjectURL(value);
      const file = {
        blobURL,
        value,
      };
      if (value.type.includes("image")) {
        setImagesFiles((prev) => [...prev, file]);
      }
      if (value.type.includes("audio")) {
        setAudioFiles((prev) => [...prev, file]);
      }
      if (value.type.includes("video")) {
        setVideoFiles((prev) => [...prev, file]);
      }
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/webp": [".webp"],
      "video/mp4": [".mp4"],
      "audio/mp3": [".mp3"],
    },
    onDrop,
  });

  const handleRemoveImage = (image: any) => {
    const filteredImages = _.filter(
      imageFiles,
      (imag) => imag.blobURL !== image.blobURL
    );
    const filteredFiles = _.filter(
      files,
      (file) => file.name !== image.value.name
    );
    setFiles(filteredFiles);
    setImagesFiles(filteredImages);
  };
  const handleRemoveAudio = (audio: any) => {
    const filteredAudio = _.filter(
      audioFiles,
      (aud) => aud.blobURL !== audio.blobURL
    );
    const filteredFiles = _.filter(
      files,
      (file) => file.name !== audio.value.name
    );
    setFiles(filteredFiles);
    setAudioFiles(filteredAudio);
  };
  const handleRemoveVideo = (video: any) => {
    const filteredVideo = _.filter(
      videoFiles,
      (aud) => aud.blobURL !== video.blobURL
    );
    const filteredFiles = _.filter(
      files,
      (file) => file.name !== video.value.name
    );
    setFiles(filteredFiles);
    setVideoFiles(filteredVideo);
  };

  const uploadImage = async () => {
    setLoading(true);
    // Create a new FormData object
    const formData = new FormData();

    // Log the files array to ensure it contains the files

    // Append each file to the FormData object
    files.forEach((file, index) => {
      console.log(`Appending file ${index}:`, file);
      formData.append(`file${index}`, file);
    });

    // Log the formData object

    try {
      formData.append("folderId", folderId as string);
      formData.append("projectId", projectId as string);
      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });
      // Handle the response as needed
      toast.success("Successfully added files");
      setFiles([]);
      setImagesFiles([]);
      setAudioFiles([]);
      setImagesFiles([]);
      router.refresh();
    } catch (error) {
      // Handle errors
      toast.error("Something went wrong");
      console.error("Error uploading files:", error);
    } finally {
      setLoading(true);
    }
  };

  return (
    <>
      <div>
        <Button className="" disabled={files.length == 0} onClick={uploadImage}>
          <UploadIcon className="w-5 h-5 mr-1" />
          Upload Files
        </Button>
        <div className="mt-5">
          {files.length == 0 ? (
            <div
              {...getRootProps()}
              className="dropzone text-center border-dashed border-2 border-gray-300 p-6  h-[20rem] rounded-md"
            >
              <input {...getInputProps()} />
              <p className="text-gray-600 flex items-center justify-center h-full">
                Drag 'n' drop an image, audio, or video here, or click to select
                one
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4  gap-10">
              {imageFiles.map((image, index) => {
                return (
                  <div className="h-[15rem] w-[15rem]  relative" key={index}>
                    <Image
                      src={image.blobURL}
                      alt={`Uploaded Image ${index}`}
                      fill
                      className=" rounded-md"
                    />
                    <XCircle
                      className="text-red-500 absolute right-0 cursor-pointer"
                      onClick={() => handleRemoveImage(image)}
                    />
                  </div>
                );
              })}
              <div className="grid grid-cols-4  gap-10">
                {audioFiles.map((audio, index) => (
                  <div className="h-[20rem] w-[20rem]  relative" key={index}>
                    <audio key={index} controls className="relative ">
                      <source src={audio.blobURL} />
                      Your browser does not support the audio element.
                    </audio>
                    <XCircle
                      className="absolute text-red-500 cursor-pointer right-0 bg-white rounded-md p-1  top-0"
                      onClick={() => handleRemoveAudio(audio)}
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4  gap-10">
                {videoFiles.map((video, index) => (
                  <div className="h-[20rem] w-[20rem]  relative" key={index}>
                    <video key={index} controls className="relative ">
                      <source src={video.blobURL} />
                      Your browser does not support the video element.
                    </video>
                    <XCircle
                      className="absolute text-red-500 cursor-pointer right-0 bg-white rounded-md p-1  top-0"
                      onClick={() => handleRemoveVideo(video)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
