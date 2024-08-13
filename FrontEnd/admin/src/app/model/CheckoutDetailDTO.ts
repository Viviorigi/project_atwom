import { BookDTO } from './BookDTO';
import { CheckoutDTO } from './CheckoutDTO';

export interface CheckoutDetailDTO {
  id: number;
  book: BookDTO;
  checkout: CheckoutDTO;
  quantity: number;
}
