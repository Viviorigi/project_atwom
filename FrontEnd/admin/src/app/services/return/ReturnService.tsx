import { ReturnBookDTO } from '../../model/ReturnDTO';
import axios, { AxiosResponse } from 'axios';

const BASE_URL = '/api/returnbook';

const ReturnService = {
  getAllReturnBooks: async (): Promise<ReturnBookDTO[]> => {
    try {
      const response: AxiosResponse<ReturnBookDTO[]> = await axios.get(`${BASE_URL}/list`);
      return response.data;
    } catch (error) {
      console.error("Error fetching return books", error);
      throw error;
    }
  },

  getReturnBookById: async (id: number): Promise<ReturnBookDTO> => {
    try {
      const response: AxiosResponse<ReturnBookDTO> = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching return book with ID: ${id}`, error);
      throw error;
    }
  },

  addReturnBook: async (returnBookDTO: ReturnBookDTO): Promise<ReturnBookDTO> => {
    try {
      const response: AxiosResponse<ReturnBookDTO> = await axios.post(`${BASE_URL}/add`, returnBookDTO);
      return response.data;
    } catch (error) {
      console.error("Error adding return book", error);
      throw error;
    }
  },

  updateReturnBookStatus: async (id: number, status: string): Promise<ReturnBookDTO> => {
    try {
      const response: AxiosResponse<ReturnBookDTO> = await axios.put(`${BASE_URL}/update/${id}`, null, {
        params: { status },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating status for return book with ID: ${id}`, error);
      throw error;
    }
  }
};

export default ReturnService;
