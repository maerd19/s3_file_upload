import React, { useCallback } from 'react';
import './FileUpload.css';

// Component for drag-and-drop file uploading
const FileUpload = ({ onFileUpload }) => {
  // Allowed file extensions for upload
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  // Allowed MIME types for upload
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

  // Callback triggered when files are dropped or selected
  const handleDrop = useCallback((event) => {
    event.preventDefault();

    // Get the files from the event
    const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;

    // Check if the file size is valid
    if (files[0].size > 1024000) {
      alert('You cannot upload files larger than 1MB.');
      return;
    }

    // Validate file extension
    const fileExtension = files[0].name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      alert('Invalid file extension.');
      return;
    }

    // Validate MIME type
    if (!allowedMimeTypes.includes(files[0].type)) {
      alert('Invalid file type.');
      return;
    }

    // Callback to parent component with the file
    onFileUpload(files[0]);
  }, [onFileUpload]);

  // Prevent default behavior of drag events to make the drop event work
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="file-upload-container" onDrop={handleDrop} onDragOver={handleDragOver}>
      <input type="file" onChange={handleDrop} />
      <p>Drag & drop your file here or click to select one.</p>
    </div>
  );
};

export default FileUpload;
