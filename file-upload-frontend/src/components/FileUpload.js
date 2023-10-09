import React, { useCallback, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import CustomAlert from "./CustomAlert";
import {
  isValidFileSize,
  isValidFileExtension,
  isValidMimeType,
} from "../utils/fileValidations";
import { boxStyles } from "../styles/FileUploadStyles";

// Component for drag-and-drop file uploading
const FileUpload = ({ onFileUploaded }) => {
  // State variable to keep track of uploaded files
  const [selectedFile, setSelectedFile] = useState(null);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    severity: "error",
    message: "",
  });

  // Callback triggered when files are dropped or selected
  const handleFileSelection = useCallback((event) => {
    event.preventDefault();

    // Get the files from the event
    const files = event.dataTransfer
      ? event.dataTransfer.files
      : event.target.files;

    // Check if the file size is valid
    if (!isValidFileSize(files[0].size)) {
      showAlert("You cannot upload files larger than 1MB.");
      return;
    }

    // Validate file extension & MIME type
    if (
      !isValidFileExtension(files[0].name) ||
      !isValidMimeType(files[0].type)
    ) {
      showAlert("Invalid file type or extension.");
      return;
    }

    setSelectedFile(files[0]);
  }, []);

  const handleUpload = useCallback(() => {
    if (!selectedFile) {
      showAlert("Please select a file first.");
      return;
    }

    onFileUploaded(selectedFile);
    setSelectedFile(null);
    // Display a success alert
    showAlert("File uploaded successfully!", "success");
  }, [onFileUploaded, selectedFile]);

  // Prevent default behavior of drag events to make the drop event work
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const showAlert = (message, severity = "error") => {
    setAlertInfo({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlertInfo({ ...alertInfo, open: false });
  };

  return (
    <Box
      sx={boxStyles}
      onDrop={handleFileSelection}
      onDragOver={handleDragOver}
    >
      <Typography variant="body1">Drag & drop your file here or</Typography>
      <Button variant="contained" component="label">
        Click to select
        <input type="file" hidden onChange={handleFileSelection} />
      </Button>
      {selectedFile && (
        <Button
          variant="contained"
          onClick={handleUpload}
          style={{ marginTop: "10px" }}
        >
          Upload
        </Button>
      )}
    
      <CustomAlert
        open={alertInfo.open}
        handleClose={handleCloseAlert}
        severity={alertInfo.severity}
        message={alertInfo.message}
      />
    </Box>
  );
};

export default FileUpload;
