import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${BASE_URL}/upload`, formData);
};
