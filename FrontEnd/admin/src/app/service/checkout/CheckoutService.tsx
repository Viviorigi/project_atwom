import axios from 'axios';
import { CheckoutDTO } from '../../model/CheckoutDTO';
import { CheckoutStatus } from '../../model/CheckoutStatus';

const BASE_URL = '/api/checkout';

export const CheckoutService = {
  findAll: async (): Promise<CheckoutDTO[]> => {
    try {
      const response = await axios.get<CheckoutDTO[]>(`${BASE_URL}/list`);
      return response.data;
    } catch (error) {
      console.error("Error fetching checkouts", error);
      throw error;
    }
  },

  findById: async (id: number): Promise<CheckoutDTO> => {
    try {
      const response = await axios.get<CheckoutDTO>(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching checkout with ID: ${id}`, error);
      throw error;
    }
  },

  save: async (checkoutDTO: CheckoutDTO): Promise<CheckoutDTO> => {
    try {
      const response = await axios.post<CheckoutDTO>(`${BASE_URL}/add`, checkoutDTO);
      return response.data;
    } catch (error) {
      console.error("Error saving checkout", error);
      throw error;
    }
  },

  updateStatus: async (id: number, status: CheckoutStatus): Promise<CheckoutDTO> => {
    try {
      const response = await axios.put<CheckoutDTO>(`${BASE_URL}/${id}/status`, null, {
        params: { status }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating status for checkout with ID: ${id}`, error);
      throw error;
    }
  },

  checkExpiredCheckouts: async (): Promise<void> => {
    //run automatically on the backend.
  }
};
