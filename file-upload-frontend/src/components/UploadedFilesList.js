import React from 'react';
import { List, ListItem } from "@mui/material";

const UploadedFilesList = ({ files }) => {

  // Helper function to extract file name from path
  const getFileNameFromPath = (path) => {
    const parts = path.split("/");
    return parts[parts.length - 1];
  };

  return (
    files.length > 0 && (
      <List>
        {files.map((filePath, index) => (
          <ListItem key={index}>{getFileNameFromPath(filePath)}</ListItem>
        ))}
      </List>
    )
  );
}

export default UploadedFilesList;
