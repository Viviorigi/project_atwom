import axios from 'axios';
import { BookDTO } from '../model/book/BookDTO';

const API_URL = process.env.REACT_APP_API_URL;

export const getBooks = async (page: number, keySearch: string, cateId: number) => {
  const response = await axios.get(`${API_URL}/book/list`, {
    params: {
      page,
      keySearch,
      cateId,
    },
  });
  return response.data;
};

export const getBookById = async (id: number): Promise<BookDTO> => {
    const response = await axios.get(`${API_URL}/book/${id}`);
    return response.data;
};

export const getCategoryByBookId = async (id: number) => {
  const response = await axios.get(`${API_URL}/category/book/${id}`);
  return response.data;
};

export const addBook = async (book: any, file?: File, images?: File[]) => {
  const formData = new FormData();
  formData.append('book', JSON.stringify(book));
  if (file) {
    formData.append('file', file);
  }
  if (images && images.length > 0) {
    images.forEach((image, index) => {
      formData.append(`images[]`, image);
    });
  }

  const response = await axios.post(`${API_URL}/book/add`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const editBook = async (bookDTO: any) => {
  const response = await axios.post(`${API_URL}/book/edit`, bookDTO);
  return response.data;
};

export const deleteBook = async (id: number) => {
  const response = await axios.delete(`${API_URL}/book/delete`, {
    params: { id },
  });
  return response.data;
};
