import { UserDTO } from './UserDTO';
import { CheckoutStatus } from './CheckoutStatus';
import { CheckoutDetailDTO } from './CheckoutDetailDTO';

export interface CheckoutDTO {
  id: number;
  user: UserDTO;
  startTime: string;  // ISO string
  endTime: string;    // ISO string
  status: CheckoutStatus;
  checkoutDetails: CheckoutDetailDTO[];
}
