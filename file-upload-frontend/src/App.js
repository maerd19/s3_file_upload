import React from 'react';
import './App.css';
import FileUpload from './components/FileUpload';

function App() {
  const handleFileUpload = (file) => {
    console.log("File to upload:", file);

    // TODO: Handle the file and upload it to the BE which then uploads it to S3
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
