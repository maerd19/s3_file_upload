import React, { useCallback, useState } from "react";
import { Button, Typography, Box, List, ListItem } from "@mui/material";

// Component for drag-and-drop file uploading
const FileUpload = ({ onFileUpload }) => {
  // Allowed file extensions for upload
  const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

  // Allowed MIME types for upload
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];

  // State variable to keep track of uploaded files
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Callback triggered when files are dropped or selected
  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();

      // Get the files from the event
      const files = event.dataTransfer
        ? event.dataTransfer.files
        : event.target.files;

      // Check if the file size is valid
      if (files[0].size > 1024000) {
        alert("You cannot upload files larger than 1MB.");
        return;
      }

      // Validate file extension
      const fileExtension = files[0].name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        alert("Invalid file extension.");
        return;
      }

      // Validate MIME type
      if (!allowedMimeTypes.includes(files[0].type)) {
        alert("Invalid file type.");
        return;
      }

      // Add the file to the uploaded files list
      setUploadedFiles([...uploadedFiles, files[0]]);

      // Callback to parent component with the file
      onFileUpload(files[0]);
    },
    [onFileUpload, uploadedFiles]
  );

  // Prevent default behavior of drag events to make the drop event work
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        width: 300,
        height: 150,
        border: "2px dashed #666",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        gap: 2,
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Typography variant="body1">Drag & drop your file here or</Typography>
      <Button
        variant="contained"
        component="label" // allows the button to encapsulate the input
      >
        Click to select
        <input type="file" hidden onChange={handleDrop} />
      </Button>
      {uploadedFiles.length > 0 && (
        <List>
        {uploadedFiles.map((file, index) => (
          <ListItem key={index}>{file.name}</ListItem>
        ))}
      </List>
      )}
    </Box>
  );
};

export default FileUpload;
