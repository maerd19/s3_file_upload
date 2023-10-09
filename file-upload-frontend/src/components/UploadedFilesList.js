import React from 'react';
import { List, ListItem } from "@mui/material";

const UploadedFilesList = ({ files }) => {
  return (
    files.length > 0 && (
      <List>
        {files.map((file, index) => (
          <ListItem key={index}>{file.name}</ListItem>
        ))}
      </List>
    )
  );
}

export default UploadedFilesList;
