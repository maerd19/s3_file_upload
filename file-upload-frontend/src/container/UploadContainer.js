import React, { useState, useEffect } from "react";
import FileUpload from "../components/FileUpload";
import UploadedFilesList from "../components/UploadedFilesList";
import { fetchUploadedFiles } from "../services/api";

const UploadContainer = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    // This effect fetches the list of files from the backend when the component mounts
    const getFiles = async () => {
      try {
        const files = await fetchUploadedFiles();
        setUploadedFiles(files);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    getFiles();
  }, []);

  return (
    <div>
      <FileUpload
        onFileUploaded={(file) => setUploadedFiles((prev) => [...prev, file])}
      />
      <UploadedFilesList files={uploadedFiles} />
    </div>
  );
};

export default UploadContainer;
