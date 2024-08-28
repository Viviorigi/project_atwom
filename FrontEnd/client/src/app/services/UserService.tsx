import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/admin/';

export const getUserInfo = async (userUid: number) => {
  const response = await axios.get(`${API_URL}/getUserInfo`, {
    params: { userUid },
  });
  return response.data;
};

export const getAllUsers = async (keySearch: string, page: number, limit: number) => {
  const response = await axios.get(`${API_URL}/getAll`, {
    params: { keySearch, page, limit },
  });
  return response.data;
};

