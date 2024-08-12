import { CheckoutStatus } from './CheckoutStatus';

export interface ReturnBookDTO {
    id: number;
    checkoutId: number;
    userId: number;
    returnDate: string;
    status: CheckoutStatus;
}
