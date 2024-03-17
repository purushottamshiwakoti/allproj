import { BulkUpload } from "@/components/forms/bulk-upload";
import React from "react";

const UploadFilesPage = () => {
  return (
    <div>
      <div className="text-primary text-2xl">Upload questions in bulk</div>
      <div className="mt-5">
        <BulkUpload />
      </div>
    </div>
  );
};

export default UploadFilesPage;
