"use client";

import { useCallback, useState, useTransition } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import { FileDown, FileDownIcon, UploadIcon, XCircle } from "lucide-react";
import { Button } from "./ui/button";

import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Files } from "@prisma/client";
import { CustomPagination } from "./custom-pagination";
import { getFileType } from "@/lib/file";
import { downloadFiles } from "@/actions/csv-download";
import { deleteFile } from "@/actions/file";

export const AddFiles = ({ totalCount }: { totalCount: number }) => {
  const params = useParams();
  const router = useRouter();
  const reload = useRouter();
  const projectId = params.id;
  const folderId = params.folder;
  const [isPending, startTransistion] = useTransition();
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

  console.log(params);

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
    console.log({ formData });

    // Append each file to the FormData object
    files.forEach((file, index) => {
      formData.append("projectId", projectId as string);
      formData.append(`file${index}`, file);
      console.log(file);
      console.log(index);
    });

    // Append projectId to the FormData object

    try {
      const response = await fetch(`/api/files/${folderId}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Handle the success response
        toast.success("Successfully added files");
        setFiles([]);
        setImagesFiles([]);
        setAudioFiles([]);
        setImagesFiles([]);
        // location.reload();
        router.push(`/${params.id}/files/${params.folder}`);
        router.refresh();

        //        window.location.assign("https://www.instagram.com/");
      } else {
        // Handle response error
        const responseData = await response.json();
        console.log("Error uploading files above :", responseData.message);
        console.error("Error uploading files above:", responseData.message);
        toast.error("Error uploading files");
      }
    } catch (error: any) {
      // Handle fetch error
      console.log("Error uploading files below:", error.message);
      console.error("Error uploading files below:", error);
      toast.error("Someting went wrong");
    } finally {
      setLoading(false);
    }
  };

  function exportToCSV() {
    startTransistion(async () => {
      const files = await downloadFiles(folderId);

      const blob = new Blob([files], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "imagefiles.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  return (
    <>
      <div>
        <div className="flex w-full items-center justify-between">
          <Button
            className=""
            disabled={files.length == 0 || loading || isPending}
            onClick={uploadImage}
          >
            <UploadIcon className="w-5 h-5 mr-1" />
            Upload Files
          </Button>
          <Button
            className=""
            variant={"outline"}
            onClick={exportToCSV}
            disabled={isPending || loading || totalCount == 0}
          >
            <FileDownIcon className="w-5 h-5 mr-1" />
            Export Files
          </Button>
        </div>
        <div className="mt-5">
          {files.length == 0 ? (
            <div
              {...getRootProps()}
              className="dropzone text-center border-dashed border-2 border-gray-300 p-6  h-[20rem] rounded-md"
            >
              <input {...getInputProps()} />
              <p className="text-gray-600 flex items-center justify-center h-full">
                Drag and drop an image, audio, or video here, or click to select
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
