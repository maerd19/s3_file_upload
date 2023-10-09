import React from 'react';
import UploadContainer from './container/UploadContainer';
import { uploadFile } from './services/api';

function App() {
  const handleFileUpload = (file) => {
    console.log("File to upload:", file);
        
    uploadFile(file)
        .then(response => {
            console.log("File uploaded successfully:", response.data);
            // You might want to handle the success status here
        })
        .catch(error => {
            console.error("There was an error uploading the file:", error);
            // Handle the error appropriately
        });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Upload your file</h1>
        <UploadContainer onFileUploaded={handleFileUpload} />
      </header>
    </div>
  );
}

export default App;
