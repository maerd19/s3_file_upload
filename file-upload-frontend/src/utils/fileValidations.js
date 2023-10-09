import {
  ALLOWED_EXTENSIONS,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE,
} from "../constants";

// Utility function to validate file size
export const isValidFileSize = (fileSize) => fileSize <= MAX_FILE_SIZE;

// Utility function to validate file extension
export const isValidFileExtension = (fileName) => {
  const fileExtension = fileName.split(".").pop().toLowerCase();
  return ALLOWED_EXTENSIONS.includes(fileExtension);
};

// Utility function to validate MIME type
export const isValidMimeType = (mimeType) =>
  ALLOWED_MIME_TYPES.includes(mimeType);
