import axios from 'axios';
import { ReturnDTO } from '../../model/ReturnDTO';

const BASE_URL = 'http://localhost:8080/api/return';

export const ReturnService = {
  // Fetch all return books
  findAllReturn: async (): Promise<ReturnDTO[]> => {
    try {
      const response = await axios.get<ReturnDTO[]>(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching return books", error);
      throw error;
    }
  },

  // Fetch a single return book by ID
  findReturnById: async (id: number): Promise<ReturnDTO> => {
    try {
      const response = await axios.get<ReturnDTO>(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching return book with ID: ${id}`, error);
      throw error;
    }
  },

  // Delete a return book by ID
  deleteReturnById: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting return book with ID: ${id}`, error);
      throw error;
    }
  },

  // Create a new return book from a checkout ID
  createReturn: async (checkoutId: number): Promise<ReturnDTO> => {
    try {
      const response = await axios.post<ReturnDTO>(`${BASE_URL}/from-checkout/${checkoutId}`);
      return response.data;
    } catch (error) {
      console.error(`Error creating return book from checkout ID: ${checkoutId}`, error);
      throw error;
    }
  },

  // Mark a return book as returned
  markAsReturned: async (id: number): Promise<ReturnDTO> => {
    try {
      const response = await axios.put<ReturnDTO>(`${BASE_URL}/returned/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error marking return book as returned with ID: ${id}`, error);
      throw error;
    }
  },

  // Mark a return book as penalty
  markAsPenalty: async (id: number, fineAmount: number): Promise<ReturnDTO> => {
    try {
      const response = await axios.put<ReturnDTO>(`${BASE_URL}/penalty/${id}`, null, {
        params: { fineAmount },
      });
      return response.data;
    } catch (error) {
      console.error(`Error marking return book as penalty with ID: ${id}`, error);
      throw error;
    }
  },
};
