import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import UploadedFilesList from '../components/UploadedFilesList';

const UploadContainer = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  return (
    <div>
      <FileUpload 
        onFileUploaded={(file) => setUploadedFiles(prev => [...prev, file])} 
      />
      <UploadedFilesList files={uploadedFiles} />
    </div>
  );
}

export default UploadContainer;
