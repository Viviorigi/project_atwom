import { UserDTO } from './UserDTO';
import { CheckoutStatus } from './CheckoutStatus';
import { CheckoutDetailDTO } from './CheckoutDetailDTO';

export interface CheckoutDTO {
  id: number;
  user: UserDTO;
  
  startTime: string;
  endTime: string;
  status: CheckoutStatus;
  checkoutDetails: CheckoutDetailDTO[];
}

export { CheckoutStatus };
