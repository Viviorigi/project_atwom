import { UserDetail } from '../auth/UserDetail';
import { CheckoutStatus } from './CheckoutStatus';
import { CheckoutDetailDTO } from './CheckoutDetailDTO';

export interface CheckoutDTO {
  id: number;
  user: UserDetail;
  userUid: number;
  userFullName: string;
  startTime: string;
  endTime: string;
  expiredTime: string;
  fine: number;
  status: CheckoutStatus;
  checkoutDetails: CheckoutDetailDTO[];
}

export { CheckoutStatus };  export type { CheckoutDetailDTO };

