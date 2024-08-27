import axios from 'axios';
import { CheckoutDTO } from '../model/checkout/CheckoutDTO';
import { CheckoutDetailDTO } from '../model/checkout/CheckoutDTO';

const BASE_URL = 'http://localhost:8080/api';

export const getAllCheckouts = async (keySearch: string, limit: number, page: number): Promise<CheckoutDTO[]> => {
    const response = await axios.get(`${BASE_URL}/checkout/list`, {
        params: { keySearch, limit, page }
    });
    return response.data;
};

export const getCheckoutById = async (id: number): Promise<CheckoutDTO> => {
    const response = await axios.get(`${BASE_URL}/checkout/${id}`);
    return response.data;
};

export const addCheckout = async (checkoutDTO: CheckoutDTO): Promise<CheckoutDTO> => {
    const response = await axios.post(`${BASE_URL}/checkout/add-client`, checkoutDTO);
    return response.data;
};

export const updateCheckout = async (id: number, checkoutDTO: CheckoutDTO): Promise<CheckoutDTO> => {
    const response = await axios.put(`${BASE_URL}/checkout/update/${id}`, checkoutDTO);
    return response.data;
};

export const deleteCheckout = async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/checkout/delete/${id}`);
};

export const getCheckoutDetailsByCheckoutId = async (checkoutId: number): Promise<CheckoutDetailDTO[]> => {
    const response = await axios.get(`${BASE_URL}/checkoutdt/${checkoutId}`);
    return response.data;
};

export const rejectCheckout = async (id: number): Promise<CheckoutDTO> => {
    const response = await axios.put(`${BASE_URL}/checkout/reject/${id}`);
    return response.data;
};

