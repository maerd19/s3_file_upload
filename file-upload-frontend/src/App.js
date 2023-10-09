import React from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import axios from 'axios';

function App() {
  const handleFileUpload = (file) => {
    console.log("File to upload:", file);

    // Form data to hold the file
    const formData = new FormData();
    formData.append('file', file);

    // Send the file to the BE
    axios.post('http://localhost:3001/upload', formData)
      .then(response => {
        console.log("File uploaded successfully:", response.data);
        // You might want to display the success status or S3 URL to the user
      })
      .catch(error => {
        console.error("There was an error uploading the file:", error);
        // Handle the error appropriately. E.g., display an error message to the user.
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Upload your file</h1>
        <FileUpload onFileUpload={handleFileUpload} />
      </header>
    </div>
  );
}

export default App;
