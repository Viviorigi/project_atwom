import { CheckoutStatus } from './CheckoutStatus';

export interface ReturnDTO {
    id: number;
    checkoutId: number;
    userId: number;
    returnDate: string;
    status: CheckoutStatus;
}
