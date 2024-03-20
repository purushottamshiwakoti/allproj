"use client";
import { deleteFile } from "@/actions/file";
import { getFileType } from "@/lib/file";
import { Files } from "@prisma/client";
import { Check, Copy, XCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Updated import
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { CustomPagination } from "./custom-pagination";

export const ViewFiles = ({
  filesData,
  totalCount,
}: {
  filesData: Files[];
  totalCount: number;
}) => {
  const [isPending, startTransition] = useTransition(); // Fixed typo in function name
  const [clicked, setClicked] = useState<null | string>(null);
  const router = useRouter();
  const handleRemoveFile = (id: string) => {
    const confirmation = confirm("Are you sure you want to remove this file?");
    if (confirmation) {
      startTransition(() => {
        // Corrected function name
        deleteFile(id).then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success(data.success);
            router.refresh(); // Changed to router.reload()
          }
        });
      });
    }
  };

  const handleClick = (name: string, id: string) => {
    setClicked(id);
    navigator.clipboard
      .writeText(name)
      .then(() => {
        toast.success("Successfully copied file path");
        setTimeout(() => {
          setClicked(null);
        }, 600); // Adjust the duration of the animation (in milliseconds) as needed
      })
      .catch((error) => {
        toast.error("Failed to copy file path: " + error);
      });
  };

  return (
    <>
      <div className="mt-5">
        {filesData.length > 0 && (
          <div className="my-5">
            <h2 className="text-primary font-medium">Uploaded Files</h2>
          </div>
        )}
        <div className="grid grid-cols-4 gap-10">
          {filesData.map(
            (
              item,
              index // Added index parameter for mapping
            ) => (
              <div key={item.id}>
                {getFileType(item.name) === "mp4" ? (
                  <div>
                    <div className="h-[20rem] w-[20rem] relative">
                      <video controls className="relative">
                        <source src={`/${item.name}`} />
                        Your browser does not support the video element.
                      </video>
                      <XCircle
                        className="absolute text-red-500 cursor-pointer right-0 bg-white rounded-md p-1 top-0"
                        onClick={() => handleRemoveFile(item.id)}
                      />
                    </div>
                  </div>
                ) : getFileType(item.name) === "mp3" ? (
                  <div className="h-[20rem] w-[20rem] relative">
                    <audio controls className="relative">
                      <source src={`/${item.name}`} />
                      Your browser does not support the audio element.
                    </audio>
                    <XCircle
                      className="absolute text-red-500 cursor-pointer right-0 bg-white rounded-md p-1 top-0"
                      onClick={() => handleRemoveFile(item.id)}
                    />
                  </div>
                ) : (
                  <>
                    <div className="h-[15rem] w-[15rem] relative">
                      <Image
                        src={`/${item.name}`}
                        alt={`Uploaded Image ${item.name}`}
                        fill
                        className="rounded-md"
                      />
                      <XCircle
                        className="text-red-500 absolute right-0 cursor-pointer"
                        onClick={() => handleRemoveFile(item.id)}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <h2 className="truncate">{item.name}</h2>
                      {clicked === item.id ? (
                        <Check className="h-4 w-4 p-0 text-emerald-500" />
                      ) : (
                        <Copy
                          className="h-4 w-4 p-0 cursor-pointer"
                          onClick={() => handleClick(item.name, item.id)}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>
      <div className="mt-10 mb-5">
        {totalCount > 0 && <CustomPagination length={totalCount} />}
      </div>
    </>
  );
};
