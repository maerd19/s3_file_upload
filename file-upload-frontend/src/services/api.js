import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${BASE_URL}/files`, formData);
};

export const fetchUploadedFiles = async () => {
    const response = await fetch(`${BASE_URL}/files`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };