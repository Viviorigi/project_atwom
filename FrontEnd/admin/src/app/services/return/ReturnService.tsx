import axios from 'axios';
import { ReturnDTO } from '../../model/ReturnDTO';
import { CheckoutStatus } from '../../model/CheckoutStatus';

const BASE_URL = '/api/returnbook';

export const ReturnService = {
  // Fetch all return books
  findAll: async (): Promise<ReturnDTO[]> => {
    try {
      const response = await axios.get<ReturnDTO[]>(`${BASE_URL}/list`);
      return response.data;
    } catch (error) {
      console.error("Error fetching return books", error);
      throw error;
    }
  },

  // Fetch a single return book by ID
  findById: async (id: number): Promise<ReturnDTO> => {
    try {
      const response = await axios.get<ReturnDTO>(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching return book with ID: ${id}`, error);
      throw error;
    }
  },

  // Save a new return book
  save: async (ReturnDTO: ReturnDTO): Promise<ReturnDTO> => {
    try {
      const response = await axios.post<ReturnDTO>(`${BASE_URL}/add`, ReturnDTO);
      return response.data;
    } catch (error) {
      console.error("Error saving return book", error);
      throw error;
    }
  },

  // Update the status of a return book
  updateStatus: async (id: number, status: CheckoutStatus): Promise<ReturnDTO> => {
    try {
      if (status === CheckoutStatus.RETURNED || status === CheckoutStatus.PENALTY) {
        const response = await axios.put<ReturnDTO>(`${BASE_URL}/update/${id}`, null, {
          params: { status }
        });
        return response.data;
      } else {
        throw new Error("Invalid status update request");
      }
    } catch (error) {
      console.error(`Error updating return book status for ID: ${id}`, error);
      throw error;
    }
  },

  // Apply penalty to a return book
  applyPenalty: async (id: number): Promise<void> => {
    try {
      await axios.post(`${BASE_URL}/applyPenalty/${id}`);
    } catch (error) {
      console.error(`Error applying penalty for return book ID: ${id}`, error);
      throw error;
    }
  }
};
