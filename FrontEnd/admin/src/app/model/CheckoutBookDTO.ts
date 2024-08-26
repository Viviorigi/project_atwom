import { CheckoutDetailDTO } from "./CheckoutDetailDTO";
import { CheckoutDetailBookDTO } from "./CheckoutDetailsBookDTO";
import { CheckoutStatus } from "./CheckoutStatus";

export interface CheckoutBookDTO {
  userUid: number;
  startTime: string;
  endTime: string;
  expiredTime: string;
  fine: number;
  status: CheckoutStatus;
  checkoutDetails: CheckoutDetailBookDTO[];
}

export { CheckoutStatus };